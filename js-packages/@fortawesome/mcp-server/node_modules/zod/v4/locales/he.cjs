"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const util = __importStar(require("../core/util.cjs"));
const error = () => {
    // Hebrew labels + grammatical gender
    const TypeNames = {
        string: { label: "מחרוזת", gender: "f" },
        number: { label: "מספר", gender: "m" },
        boolean: { label: "ערך בוליאני", gender: "m" },
        bigint: { label: "BigInt", gender: "m" },
        date: { label: "תאריך", gender: "m" },
        array: { label: "מערך", gender: "m" },
        object: { label: "אובייקט", gender: "m" },
        null: { label: "ערך ריק (null)", gender: "m" },
        undefined: { label: "ערך לא מוגדר (undefined)", gender: "m" },
        symbol: { label: "סימבול (Symbol)", gender: "m" },
        function: { label: "פונקציה", gender: "f" },
        map: { label: "מפה (Map)", gender: "f" },
        set: { label: "קבוצה (Set)", gender: "f" },
        file: { label: "קובץ", gender: "m" },
        promise: { label: "Promise", gender: "m" },
        NaN: { label: "NaN", gender: "m" },
        unknown: { label: "ערך לא ידוע", gender: "m" },
        value: { label: "ערך", gender: "m" },
    };
    // Sizing units for size-related messages + localized origin labels
    const Sizable = {
        string: { unit: "תווים", shortLabel: "קצר", longLabel: "ארוך" },
        file: { unit: "בייטים", shortLabel: "קטן", longLabel: "גדול" },
        array: { unit: "פריטים", shortLabel: "קטן", longLabel: "גדול" },
        set: { unit: "פריטים", shortLabel: "קטן", longLabel: "גדול" },
        number: { unit: "", shortLabel: "קטן", longLabel: "גדול" }, // no unit
    };
    // Helpers — labels, articles, and verbs
    const typeEntry = (t) => (t ? TypeNames[t] : undefined);
    const typeLabel = (t) => {
        const e = typeEntry(t);
        if (e)
            return e.label;
        // fallback: show raw string if unknown
        return t ?? TypeNames.unknown.label;
    };
    const withDefinite = (t) => `ה${typeLabel(t)}`;
    const verbFor = (t) => {
        const e = typeEntry(t);
        const gender = e?.gender ?? "m";
        return gender === "f" ? "צריכה להיות" : "צריך להיות";
    };
    const getSizing = (origin) => {
        if (!origin)
            return null;
        return Sizable[origin] ?? null;
    };
    const FormatDictionary = {
        regex: { label: "קלט", gender: "m" },
        email: { label: "כתובת אימייל", gender: "f" },
        url: { label: "כתובת רשת", gender: "f" },
        emoji: { label: "אימוג'י", gender: "m" },
        uuid: { label: "UUID", gender: "m" },
        nanoid: { label: "nanoid", gender: "m" },
        guid: { label: "GUID", gender: "m" },
        cuid: { label: "cuid", gender: "m" },
        cuid2: { label: "cuid2", gender: "m" },
        ulid: { label: "ULID", gender: "m" },
        xid: { label: "XID", gender: "m" },
        ksuid: { label: "KSUID", gender: "m" },
        datetime: { label: "תאריך וזמן ISO", gender: "m" },
        date: { label: "תאריך ISO", gender: "m" },
        time: { label: "זמן ISO", gender: "m" },
        duration: { label: "משך זמן ISO", gender: "m" },
        ipv4: { label: "כתובת IPv4", gender: "f" },
        ipv6: { label: "כתובת IPv6", gender: "f" },
        cidrv4: { label: "טווח IPv4", gender: "m" },
        cidrv6: { label: "טווח IPv6", gender: "m" },
        base64: { label: "מחרוזת בבסיס 64", gender: "f" },
        base64url: { label: "מחרוזת בבסיס 64 לכתובות רשת", gender: "f" },
        json_string: { label: "מחרוזת JSON", gender: "f" },
        e164: { label: "מספר E.164", gender: "m" },
        jwt: { label: "JWT", gender: "m" },
        ends_with: { label: "קלט", gender: "m" },
        includes: { label: "קלט", gender: "m" },
        lowercase: { label: "קלט", gender: "m" },
        starts_with: { label: "קלט", gender: "m" },
        uppercase: { label: "קלט", gender: "m" },
    };
    const TypeDictionary = {
        nan: "NaN",
    };
    return (issue) => {
        switch (issue.code) {
            case "invalid_type": {
                // Expected type: show without definite article for clearer Hebrew
                const expectedKey = issue.expected;
                const expected = TypeDictionary[expectedKey ?? ""] ?? typeLabel(expectedKey);
                // Received: show localized label if known, otherwise constructor/raw
                const receivedType = util.parsedType(issue.input);
                const received = TypeDictionary[receivedType] ?? TypeNames[receivedType]?.label ?? receivedType;
                if (/^[A-Z]/.test(issue.expected)) {
                    return `קלט לא תקין: צריך להיות instanceof ${issue.expected}, התקבל ${received}`;
                }
                return `קלט לא תקין: צריך להיות ${expected}, התקבל ${received}`;
            }
            case "invalid_value": {
                if (issue.values.length === 1) {
                    return `ערך לא תקין: הערך חייב להיות ${util.stringifyPrimitive(issue.values[0])}`;
                }
                // Join values with proper Hebrew formatting
                const stringified = issue.values.map((v) => util.stringifyPrimitive(v));
                if (issue.values.length === 2) {
                    return `ערך לא תקין: האפשרויות המתאימות הן ${stringified[0]} או ${stringified[1]}`;
                }
                // For 3+ values: "a", "b" או "c"
                const lastValue = stringified[stringified.length - 1];
                const restValues = stringified.slice(0, -1).join(", ");
                return `ערך לא תקין: האפשרויות המתאימות הן ${restValues} או ${lastValue}`;
            }
            case "too_big": {
                const sizing = getSizing(issue.origin);
                const subject = withDefinite(issue.origin ?? "value");
                if (issue.origin === "string") {
                    // Special handling for strings - more natural Hebrew
                    return `${sizing?.longLabel ?? "ארוך"} מדי: ${subject} צריכה להכיל ${issue.maximum.toString()} ${sizing?.unit ?? ""} ${issue.inclusive ? "או פחות" : "לכל היותר"}`.trim();
                }
                if (issue.origin === "number") {
                    // Natural Hebrew for numbers
                    const comparison = issue.inclusive ? `קטן או שווה ל-${issue.maximum}` : `קטן מ-${issue.maximum}`;
                    return `גדול מדי: ${subject} צריך להיות ${comparison}`;
                }
                if (issue.origin === "array" || issue.origin === "set") {
                    // Natural Hebrew for arrays and sets
                    const verb = issue.origin === "set" ? "צריכה" : "צריך";
                    const comparison = issue.inclusive
                        ? `${issue.maximum} ${sizing?.unit ?? ""} או פחות`
                        : `פחות מ-${issue.maximum} ${sizing?.unit ?? ""}`;
                    return `גדול מדי: ${subject} ${verb} להכיל ${comparison}`.trim();
                }
                const adj = issue.inclusive ? "<=" : "<";
                const be = verbFor(issue.origin ?? "value");
                if (sizing?.unit) {
                    return `${sizing.longLabel} מדי: ${subject} ${be} ${adj}${issue.maximum.toString()} ${sizing.unit}`;
                }
                return `${sizing?.longLabel ?? "גדול"} מדי: ${subject} ${be} ${adj}${issue.maximum.toString()}`;
            }
            case "too_small": {
                const sizing = getSizing(issue.origin);
                const subject = withDefinite(issue.origin ?? "value");
                if (issue.origin === "string") {
                    // Special handling for strings - more natural Hebrew
                    return `${sizing?.shortLabel ?? "קצר"} מדי: ${subject} צריכה להכיל ${issue.minimum.toString()} ${sizing?.unit ?? ""} ${issue.inclusive ? "או יותר" : "לפחות"}`.trim();
                }
                if (issue.origin === "number") {
                    // Natural Hebrew for numbers
                    const comparison = issue.inclusive ? `גדול או שווה ל-${issue.minimum}` : `גדול מ-${issue.minimum}`;
                    return `קטן מדי: ${subject} צריך להיות ${comparison}`;
                }
                if (issue.origin === "array" || issue.origin === "set") {
                    // Natural Hebrew for arrays and sets
                    const verb = issue.origin === "set" ? "צריכה" : "צריך";
                    // Special case for singular (minimum === 1)
                    if (issue.minimum === 1 && issue.inclusive) {
                        const singularPhrase = issue.origin === "set" ? "לפחות פריט אחד" : "לפחות פריט אחד";
                        return `קטן מדי: ${subject} ${verb} להכיל ${singularPhrase}`;
                    }
                    const comparison = issue.inclusive
                        ? `${issue.minimum} ${sizing?.unit ?? ""} או יותר`
                        : `יותר מ-${issue.minimum} ${sizing?.unit ?? ""}`;
                    return `קטן מדי: ${subject} ${verb} להכיל ${comparison}`.trim();
                }
                const adj = issue.inclusive ? ">=" : ">";
                const be = verbFor(issue.origin ?? "value");
                if (sizing?.unit) {
                    return `${sizing.shortLabel} מדי: ${subject} ${be} ${adj}${issue.minimum.toString()} ${sizing.unit}`;
                }
                return `${sizing?.shortLabel ?? "קטן"} מדי: ${subject} ${be} ${adj}${issue.minimum.toString()}`;
            }
            case "invalid_format": {
                const _issue = issue;
                // These apply to strings — use feminine grammar + ה׳ הידיעה
                if (_issue.format === "starts_with")
                    return `המחרוזת חייבת להתחיל ב "${_issue.prefix}"`;
                if (_issue.format === "ends_with")
                    return `המחרוזת חייבת להסתיים ב "${_issue.suffix}"`;
                if (_issue.format === "includes")
                    return `המחרוזת חייבת לכלול "${_issue.includes}"`;
                if (_issue.format === "regex")
                    return `המחרוזת חייבת להתאים לתבנית ${_issue.pattern}`;
                // Handle gender agreement for formats
                const nounEntry = FormatDictionary[_issue.format];
                const noun = nounEntry?.label ?? _issue.format;
                const gender = nounEntry?.gender ?? "m";
                const adjective = gender === "f" ? "תקינה" : "תקין";
                return `${noun} לא ${adjective}`;
            }
            case "not_multiple_of":
                return `מספר לא תקין: חייב להיות מכפלה של ${issue.divisor}`;
            case "unrecognized_keys":
                return `מפתח${issue.keys.length > 1 ? "ות" : ""} לא מזוה${issue.keys.length > 1 ? "ים" : "ה"}: ${util.joinValues(issue.keys, ", ")}`;
            case "invalid_key": {
                return `שדה לא תקין באובייקט`;
            }
            case "invalid_union":
                return "קלט לא תקין";
            case "invalid_element": {
                const place = withDefinite(issue.origin ?? "array");
                return `ערך לא תקין ב${place}`;
            }
            default:
                return `קלט לא תקין`;
        }
    };
};
function default_1() {
    return {
        localeError: error(),
    };
}
module.exports = exports.default;
