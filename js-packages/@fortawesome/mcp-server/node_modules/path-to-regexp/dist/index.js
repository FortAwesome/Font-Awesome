"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathError = exports.TokenData = void 0;
exports.parse = parse;
exports.compile = compile;
exports.match = match;
exports.pathToRegexp = pathToRegexp;
exports.stringify = stringify;
const DEFAULT_DELIMITER = "/";
const NOOP_VALUE = (value) => value;
const ID_START = /^[$_\p{ID_Start}]$/u;
const ID_CONTINUE = /^[$\u200c\u200d\p{ID_Continue}]$/u;
const ID = /^[$_\p{ID_Start}][$\u200c\u200d\p{ID_Continue}]*$/u;
/**
 * Escape text for stringify to path.
 */
function escapeText(str) {
    return str.replace(/[{}()\[\]+?!:*\\]/g, "\\$&");
}
/**
 * Escape a regular expression string.
 */
function escape(str) {
    return str.replace(/[.+*?^${}()[\]|/\\]/g, "\\$&");
}
/**
 * Tokenized path instance.
 */
class TokenData {
    constructor(tokens, originalPath) {
        this.tokens = tokens;
        this.originalPath = originalPath;
    }
}
exports.TokenData = TokenData;
/**
 * ParseError is thrown when there is an error processing the path.
 */
class PathError extends TypeError {
    constructor(message, originalPath) {
        let text = message;
        if (originalPath)
            text += `: ${originalPath}`;
        text += `; visit https://git.new/pathToRegexpError for info`;
        super(text);
        this.originalPath = originalPath;
    }
}
exports.PathError = PathError;
/**
 * Parse a string for the raw tokens.
 */
function parse(str, options = {}) {
    const { encodePath = NOOP_VALUE } = options;
    const chars = [...str];
    let index = 0;
    function consumeUntil(end) {
        const output = [];
        let path = "";
        function writePath() {
            if (!path)
                return;
            output.push({
                type: "text",
                value: encodePath(path),
            });
            path = "";
        }
        while (index < chars.length) {
            const value = chars[index++];
            if (value === end) {
                writePath();
                return output;
            }
            if (value === "\\") {
                if (index === chars.length) {
                    throw new PathError(`Unexpected end after \\ at index ${index}`, str);
                }
                path += chars[index++];
                continue;
            }
            if (value === ":" || value === "*") {
                const type = value === ":" ? "param" : "wildcard";
                let name = "";
                if (ID_START.test(chars[index])) {
                    do {
                        name += chars[index++];
                    } while (ID_CONTINUE.test(chars[index]));
                }
                else if (chars[index] === '"') {
                    let quoteStart = index;
                    while (index < chars.length) {
                        if (chars[++index] === '"') {
                            index++;
                            quoteStart = 0;
                            break;
                        }
                        // Increment over escape characters.
                        if (chars[index] === "\\")
                            index++;
                        name += chars[index];
                    }
                    if (quoteStart) {
                        throw new PathError(`Unterminated quote at index ${quoteStart}`, str);
                    }
                }
                if (!name) {
                    throw new PathError(`Missing parameter name at index ${index}`, str);
                }
                writePath();
                output.push({ type, name });
                continue;
            }
            if (value === "{") {
                writePath();
                output.push({
                    type: "group",
                    tokens: consumeUntil("}"),
                });
                continue;
            }
            if (value === "}" ||
                value === "(" ||
                value === ")" ||
                value === "[" ||
                value === "]" ||
                value === "+" ||
                value === "?" ||
                value === "!") {
                throw new PathError(`Unexpected ${value} at index ${index - 1}`, str);
            }
            path += value;
        }
        if (end) {
            throw new PathError(`Unexpected end at index ${index}, expected ${end}`, str);
        }
        writePath();
        return output;
    }
    return new TokenData(consumeUntil(""), str);
}
/**
 * Compile a string to a template function for the path.
 */
function compile(path, options = {}) {
    const { encode = encodeURIComponent, delimiter = DEFAULT_DELIMITER } = options;
    const data = typeof path === "object" ? path : parse(path, options);
    const fn = tokensToFunction(data.tokens, delimiter, encode);
    return function path(params = {}) {
        const missing = [];
        const path = fn(params, missing);
        if (missing.length) {
            throw new TypeError(`Missing parameters: ${missing.join(", ")}`);
        }
        return path;
    };
}
function tokensToFunction(tokens, delimiter, encode) {
    const encoders = tokens.map((token) => tokenToFunction(token, delimiter, encode));
    return (data, missing) => {
        let result = "";
        for (const encoder of encoders) {
            result += encoder(data, missing);
        }
        return result;
    };
}
/**
 * Convert a single token into a path building function.
 */
function tokenToFunction(token, delimiter, encode) {
    if (token.type === "text")
        return () => token.value;
    if (token.type === "group") {
        const fn = tokensToFunction(token.tokens, delimiter, encode);
        return (data, missing) => {
            const len = missing.length;
            const value = fn(data, missing);
            if (missing.length === len)
                return value;
            missing.length = len; // Reset optional group.
            return "";
        };
    }
    const encodeValue = encode || NOOP_VALUE;
    if (token.type === "wildcard" && encode !== false) {
        return (data, missing) => {
            const value = data[token.name];
            if (value == null) {
                missing.push(token.name);
                return "";
            }
            if (!Array.isArray(value) || value.length === 0) {
                throw new TypeError(`Expected "${token.name}" to be a non-empty array`);
            }
            let result = "";
            for (let i = 0; i < value.length; i++) {
                if (typeof value[i] !== "string") {
                    throw new TypeError(`Expected "${token.name}/${i}" to be a string`);
                }
                if (i > 0)
                    result += delimiter;
                result += encodeValue(value[i]);
            }
            return result;
        };
    }
    return (data, missing) => {
        const value = data[token.name];
        if (value == null) {
            missing.push(token.name);
            return "";
        }
        if (typeof value !== "string") {
            throw new TypeError(`Expected "${token.name}" to be a string`);
        }
        return encodeValue(value);
    };
}
/**
 * Transform a path into a match function.
 */
function match(path, options = {}) {
    const { decode = decodeURIComponent, delimiter = DEFAULT_DELIMITER } = options;
    const { regexp, keys } = pathToRegexp(path, options);
    const decoders = keys.map((key) => {
        if (decode === false)
            return NOOP_VALUE;
        if (key.type === "param")
            return decode;
        return (value) => value.split(delimiter).map(decode);
    });
    return function match(input) {
        const m = regexp.exec(input);
        if (!m)
            return false;
        const path = m[0];
        const params = Object.create(null);
        for (let i = 1; i < m.length; i++) {
            if (m[i] === undefined)
                continue;
            const key = keys[i - 1];
            const decoder = decoders[i - 1];
            params[key.name] = decoder(m[i]);
        }
        return { path, params };
    };
}
/**
 * Transform a path into a regular expression and capture keys.
 */
function pathToRegexp(path, options = {}) {
    const { delimiter = DEFAULT_DELIMITER, end = true, sensitive = false, trailing = true, } = options;
    const keys = [];
    let source = "";
    let combinations = 0;
    function process(path) {
        if (Array.isArray(path)) {
            for (const p of path)
                process(p);
            return;
        }
        const data = typeof path === "object" ? path : parse(path, options);
        flatten(data.tokens, 0, [], (tokens) => {
            if (combinations >= 256) {
                throw new PathError("Too many path combinations", data.originalPath);
            }
            if (combinations > 0)
                source += "|";
            source += toRegExpSource(tokens, delimiter, keys, data.originalPath);
            combinations++;
        });
    }
    process(path);
    let pattern = `^(?:${source})`;
    if (trailing)
        pattern += "(?:" + escape(delimiter) + "$)?";
    pattern += end ? "$" : "(?=" + escape(delimiter) + "|$)";
    return { regexp: new RegExp(pattern, sensitive ? "" : "i"), keys };
}
/**
 * Generate a flat list of sequence tokens from the given tokens.
 */
function flatten(tokens, index, result, callback) {
    while (index < tokens.length) {
        const token = tokens[index++];
        if (token.type === "group") {
            const len = result.length;
            flatten(token.tokens, 0, result, (seq) => flatten(tokens, index, seq, callback));
            result.length = len;
            continue;
        }
        result.push(token);
    }
    callback(result);
}
/**
 * Transform a flat sequence of tokens into a regular expression.
 */
function toRegExpSource(tokens, delimiter, keys, originalPath) {
    let result = "";
    let backtrack = "";
    let wildcardBacktrack = "";
    let prevCaptureType = 0;
    let hasSegmentCapture = 0;
    let index = 0;
    function hasInSegment(index, type) {
        while (index < tokens.length) {
            const token = tokens[index++];
            if (token.type === type)
                return true;
            if (token.type === "text") {
                if (token.value.includes(delimiter))
                    break;
            }
        }
        return false;
    }
    function peekText(index) {
        let result = "";
        while (index < tokens.length) {
            const token = tokens[index++];
            if (token.type !== "text")
                break;
            result += token.value;
        }
        return result;
    }
    while (index < tokens.length) {
        const token = tokens[index++];
        if (token.type === "text") {
            result += escape(token.value);
            backtrack += token.value;
            if (prevCaptureType === 2)
                wildcardBacktrack += token.value;
            if (token.value.includes(delimiter))
                hasSegmentCapture = 0;
            continue;
        }
        if (token.type === "param" || token.type === "wildcard") {
            if (prevCaptureType && !backtrack) {
                throw new PathError(`Missing text before "${token.name}" ${token.type}`, originalPath);
            }
            if (token.type === "param") {
                result +=
                    hasSegmentCapture & 2 // Seen wildcard in segment.
                        ? `(${negate(delimiter, backtrack)}+)`
                        : hasInSegment(index, "wildcard") // See wildcard later in segment.
                            ? `(${negate(delimiter, peekText(index))}+)`
                            : hasSegmentCapture & 1 // Seen parameter in segment.
                                ? `(${negate(delimiter, backtrack)}+|${escape(backtrack)})`
                                : `(${negate(delimiter, "")}+)`;
                hasSegmentCapture |= prevCaptureType = 1;
            }
            else {
                result +=
                    hasSegmentCapture & 2 // Seen wildcard in segment.
                        ? `(${negate(backtrack, "")}+)`
                        : wildcardBacktrack // No capture in segment, seen wildcard in path.
                            ? `(${negate(wildcardBacktrack, "")}+|${negate(delimiter, "")}+)`
                            : `([^]+)`;
                wildcardBacktrack = "";
                hasSegmentCapture |= prevCaptureType = 2;
            }
            keys.push(token);
            backtrack = "";
            continue;
        }
        throw new TypeError(`Unknown token type: ${token.type}`);
    }
    return result;
}
/**
 * Block backtracking on previous text/delimiter.
 */
function negate(a, b) {
    if (b.length > a.length)
        return negate(b, a); // Longest string first.
    if (a === b)
        b = ""; // Cleaner regex strings, no duplication.
    if (b.length > 1)
        return `(?:(?!${escape(a)}|${escape(b)})[^])`;
    if (a.length > 1)
        return `(?:(?!${escape(a)})[^${escape(b)}])`;
    return `[^${escape(a + b)}]`;
}
/**
 * Stringify an array of tokens into a path string.
 */
function stringifyTokens(tokens, index) {
    let value = "";
    while (index < tokens.length) {
        const token = tokens[index++];
        if (token.type === "text") {
            value += escapeText(token.value);
            continue;
        }
        if (token.type === "group") {
            value += "{" + stringifyTokens(token.tokens, 0) + "}";
            continue;
        }
        if (token.type === "param") {
            value += ":" + stringifyName(token.name, tokens[index]);
            continue;
        }
        if (token.type === "wildcard") {
            value += "*" + stringifyName(token.name, tokens[index]);
            continue;
        }
        throw new TypeError(`Unknown token type: ${token.type}`);
    }
    return value;
}
/**
 * Stringify token data into a path string.
 */
function stringify(data) {
    return stringifyTokens(data.tokens, 0);
}
/**
 * Stringify a parameter name, escaping when it cannot be emitted directly.
 */
function stringifyName(name, next) {
    if (!ID.test(name))
        return JSON.stringify(name);
    if ((next === null || next === void 0 ? void 0 : next.type) === "text" && ID_CONTINUE.test(next.value[0])) {
        return JSON.stringify(name);
    }
    return name;
}
//# sourceMappingURL=index.js.map