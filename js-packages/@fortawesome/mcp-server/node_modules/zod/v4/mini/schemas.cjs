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
exports.ZodMiniFile = exports.ZodMiniLiteral = exports.ZodMiniEnum = exports.ZodMiniSet = exports.ZodMiniMap = exports.ZodMiniRecord = exports.ZodMiniTuple = exports.ZodMiniIntersection = exports.ZodMiniDiscriminatedUnion = exports.ZodMiniXor = exports.ZodMiniUnion = exports.ZodMiniObject = exports.ZodMiniArray = exports.ZodMiniDate = exports.ZodMiniVoid = exports.ZodMiniNever = exports.ZodMiniUnknown = exports.ZodMiniAny = exports.ZodMiniNull = exports.ZodMiniUndefined = exports.ZodMiniSymbol = exports.ZodMiniBigIntFormat = exports.ZodMiniBigInt = exports.ZodMiniBoolean = exports.ZodMiniNumberFormat = exports.ZodMiniNumber = exports.ZodMiniCustomStringFormat = exports.ZodMiniJWT = exports.ZodMiniE164 = exports.ZodMiniBase64URL = exports.ZodMiniBase64 = exports.ZodMiniMAC = exports.ZodMiniCIDRv6 = exports.ZodMiniCIDRv4 = exports.ZodMiniIPv6 = exports.ZodMiniIPv4 = exports.ZodMiniKSUID = exports.ZodMiniXID = exports.ZodMiniULID = exports.ZodMiniCUID2 = exports.ZodMiniCUID = exports.ZodMiniNanoID = exports.ZodMiniEmoji = exports.ZodMiniURL = exports.ZodMiniUUID = exports.ZodMiniGUID = exports.ZodMiniEmail = exports.ZodMiniStringFormat = exports.ZodMiniString = exports.ZodMiniType = void 0;
exports.ZodMiniFunction = exports.stringbool = exports.meta = exports.describe = exports.ZodMiniCustom = exports.ZodMiniPromise = exports.ZodMiniLazy = exports.ZodMiniTemplateLiteral = exports.ZodMiniReadonly = exports.ZodMiniCodec = exports.ZodMiniPipe = exports.ZodMiniNaN = exports.ZodMiniCatch = exports.ZodMiniSuccess = exports.ZodMiniNonOptional = exports.ZodMiniPrefault = exports.ZodMiniDefault = exports.ZodMiniNullable = exports.ZodMiniExactOptional = exports.ZodMiniOptional = exports.ZodMiniTransform = void 0;
exports.string = string;
exports.email = email;
exports.guid = guid;
exports.uuid = uuid;
exports.uuidv4 = uuidv4;
exports.uuidv6 = uuidv6;
exports.uuidv7 = uuidv7;
exports.url = url;
exports.httpUrl = httpUrl;
exports.emoji = emoji;
exports.nanoid = nanoid;
exports.cuid = cuid;
exports.cuid2 = cuid2;
exports.ulid = ulid;
exports.xid = xid;
exports.ksuid = ksuid;
exports.ipv4 = ipv4;
exports.ipv6 = ipv6;
exports.cidrv4 = cidrv4;
exports.cidrv6 = cidrv6;
exports.mac = mac;
exports.base64 = base64;
exports.base64url = base64url;
exports.e164 = e164;
exports.jwt = jwt;
exports.stringFormat = stringFormat;
exports.hostname = hostname;
exports.hex = hex;
exports.hash = hash;
exports.number = number;
exports.int = int;
exports.float32 = float32;
exports.float64 = float64;
exports.int32 = int32;
exports.uint32 = uint32;
exports.boolean = boolean;
exports.bigint = bigint;
exports.int64 = int64;
exports.uint64 = uint64;
exports.symbol = symbol;
exports.undefined = _undefined;
exports.null = _null;
exports.any = any;
exports.unknown = unknown;
exports.never = never;
exports.void = _void;
exports.date = date;
exports.array = array;
exports.keyof = keyof;
exports.object = object;
exports.strictObject = strictObject;
exports.looseObject = looseObject;
exports.extend = extend;
exports.safeExtend = safeExtend;
exports.merge = merge;
exports.pick = pick;
exports.omit = omit;
exports.partial = partial;
exports.required = required;
exports.catchall = catchall;
exports.union = union;
exports.xor = xor;
exports.discriminatedUnion = discriminatedUnion;
exports.intersection = intersection;
exports.tuple = tuple;
exports.record = record;
exports.partialRecord = partialRecord;
exports.looseRecord = looseRecord;
exports.map = map;
exports.set = set;
exports.enum = _enum;
exports.nativeEnum = nativeEnum;
exports.literal = literal;
exports.file = file;
exports.transform = transform;
exports.optional = optional;
exports.exactOptional = exactOptional;
exports.nullable = nullable;
exports.nullish = nullish;
exports._default = _default;
exports.prefault = prefault;
exports.nonoptional = nonoptional;
exports.success = success;
exports.catch = _catch;
exports.nan = nan;
exports.pipe = pipe;
exports.codec = codec;
exports.invertCodec = invertCodec;
exports.readonly = readonly;
exports.templateLiteral = templateLiteral;
exports.lazy = _lazy;
exports.promise = promise;
exports.check = check;
exports.custom = custom;
exports.refine = refine;
exports.superRefine = superRefine;
exports.instanceof = _instanceof;
exports.json = json;
exports._function = _function;
exports.function = _function;
exports._function = _function;
exports.function = _function;
const core = __importStar(require("../core/index.cjs"));
const util = __importStar(require("../core/util.cjs"));
const parse = __importStar(require("./parse.cjs"));
exports.ZodMiniType = core.$constructor("ZodMiniType", (inst, def) => {
    if (!inst._zod)
        throw new Error("Uninitialized schema in ZodMiniType.");
    core.$ZodType.init(inst, def);
    inst.def = def;
    inst.type = def.type;
    inst.parse = (data, params) => parse.parse(inst, data, params, { callee: inst.parse });
    inst.safeParse = (data, params) => parse.safeParse(inst, data, params);
    inst.parseAsync = async (data, params) => parse.parseAsync(inst, data, params, { callee: inst.parseAsync });
    inst.safeParseAsync = async (data, params) => parse.safeParseAsync(inst, data, params);
    inst.check = (...checks) => {
        return inst.clone({
            ...def,
            checks: [
                ...(def.checks ?? []),
                ...checks.map((ch) => typeof ch === "function"
                    ? {
                        _zod: { check: ch, def: { check: "custom" }, onattach: [] },
                    }
                    : ch),
            ],
        }, { parent: true });
    };
    inst.with = inst.check;
    inst.clone = (_def, params) => core.clone(inst, _def, params);
    inst.brand = () => inst;
    inst.register = ((reg, meta) => {
        reg.add(inst, meta);
        return inst;
    });
    inst.apply = (fn) => fn(inst);
});
exports.ZodMiniString = core.$constructor("ZodMiniString", (inst, def) => {
    core.$ZodString.init(inst, def);
    exports.ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function string(params) {
    return core._string(exports.ZodMiniString, params);
}
exports.ZodMiniStringFormat = core.$constructor("ZodMiniStringFormat", (inst, def) => {
    core.$ZodStringFormat.init(inst, def);
    exports.ZodMiniString.init(inst, def);
});
exports.ZodMiniEmail = core.$constructor("ZodMiniEmail", (inst, def) => {
    core.$ZodEmail.init(inst, def);
    exports.ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function email(params) {
    return core._email(exports.ZodMiniEmail, params);
}
exports.ZodMiniGUID = core.$constructor("ZodMiniGUID", (inst, def) => {
    core.$ZodGUID.init(inst, def);
    exports.ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function guid(params) {
    return core._guid(exports.ZodMiniGUID, params);
}
exports.ZodMiniUUID = core.$constructor("ZodMiniUUID", (inst, def) => {
    core.$ZodUUID.init(inst, def);
    exports.ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function uuid(params) {
    return core._uuid(exports.ZodMiniUUID, params);
}
// @__NO_SIDE_EFFECTS__
function uuidv4(params) {
    return core._uuidv4(exports.ZodMiniUUID, params);
}
// ZodMiniUUIDv6
// @__NO_SIDE_EFFECTS__
function uuidv6(params) {
    return core._uuidv6(exports.ZodMiniUUID, params);
}
// ZodMiniUUIDv7
// @__NO_SIDE_EFFECTS__
function uuidv7(params) {
    return core._uuidv7(exports.ZodMiniUUID, params);
}
exports.ZodMiniURL = core.$constructor("ZodMiniURL", (inst, def) => {
    core.$ZodURL.init(inst, def);
    exports.ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function url(params) {
    return core._url(exports.ZodMiniURL, params);
}
// @__NO_SIDE_EFFECTS__
function httpUrl(params) {
    return core._url(exports.ZodMiniURL, {
        protocol: core.regexes.httpProtocol,
        hostname: core.regexes.domain,
        ...util.normalizeParams(params),
    });
}
exports.ZodMiniEmoji = core.$constructor("ZodMiniEmoji", (inst, def) => {
    core.$ZodEmoji.init(inst, def);
    exports.ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function emoji(params) {
    return core._emoji(exports.ZodMiniEmoji, params);
}
exports.ZodMiniNanoID = core.$constructor("ZodMiniNanoID", (inst, def) => {
    core.$ZodNanoID.init(inst, def);
    exports.ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function nanoid(params) {
    return core._nanoid(exports.ZodMiniNanoID, params);
}
/**
 * @deprecated CUID v1 is deprecated by its authors due to information leakage
 * (timestamps embedded in the id). Use {@link ZodMiniCUID2} instead.
 * See https://github.com/paralleldrive/cuid.
 */
exports.ZodMiniCUID = core.$constructor("ZodMiniCUID", (inst, def) => {
    core.$ZodCUID.init(inst, def);
    exports.ZodMiniStringFormat.init(inst, def);
});
/**
 * Validates a CUID v1 string.
 *
 * @deprecated CUID v1 is deprecated by its authors due to information leakage
 * (timestamps embedded in the id). Use {@link cuid2 | `z.cuid2()`} instead.
 * See https://github.com/paralleldrive/cuid.
 */
// @__NO_SIDE_EFFECTS__
function cuid(params) {
    return core._cuid(exports.ZodMiniCUID, params);
}
exports.ZodMiniCUID2 = core.$constructor("ZodMiniCUID2", (inst, def) => {
    core.$ZodCUID2.init(inst, def);
    exports.ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function cuid2(params) {
    return core._cuid2(exports.ZodMiniCUID2, params);
}
exports.ZodMiniULID = core.$constructor("ZodMiniULID", (inst, def) => {
    core.$ZodULID.init(inst, def);
    exports.ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function ulid(params) {
    return core._ulid(exports.ZodMiniULID, params);
}
exports.ZodMiniXID = core.$constructor("ZodMiniXID", (inst, def) => {
    core.$ZodXID.init(inst, def);
    exports.ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function xid(params) {
    return core._xid(exports.ZodMiniXID, params);
}
exports.ZodMiniKSUID = core.$constructor("ZodMiniKSUID", (inst, def) => {
    core.$ZodKSUID.init(inst, def);
    exports.ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function ksuid(params) {
    return core._ksuid(exports.ZodMiniKSUID, params);
}
exports.ZodMiniIPv4 = core.$constructor("ZodMiniIPv4", (inst, def) => {
    core.$ZodIPv4.init(inst, def);
    exports.ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function ipv4(params) {
    return core._ipv4(exports.ZodMiniIPv4, params);
}
exports.ZodMiniIPv6 = core.$constructor("ZodMiniIPv6", (inst, def) => {
    core.$ZodIPv6.init(inst, def);
    exports.ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function ipv6(params) {
    return core._ipv6(exports.ZodMiniIPv6, params);
}
exports.ZodMiniCIDRv4 = core.$constructor("ZodMiniCIDRv4", (inst, def) => {
    core.$ZodCIDRv4.init(inst, def);
    exports.ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function cidrv4(params) {
    return core._cidrv4(exports.ZodMiniCIDRv4, params);
}
exports.ZodMiniCIDRv6 = core.$constructor("ZodMiniCIDRv6", (inst, def) => {
    core.$ZodCIDRv6.init(inst, def);
    exports.ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function cidrv6(params) {
    return core._cidrv6(exports.ZodMiniCIDRv6, params);
}
exports.ZodMiniMAC = core.$constructor("ZodMiniMAC", (inst, def) => {
    core.$ZodMAC.init(inst, def);
    exports.ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function mac(params) {
    return core._mac(exports.ZodMiniMAC, params);
}
exports.ZodMiniBase64 = core.$constructor("ZodMiniBase64", (inst, def) => {
    core.$ZodBase64.init(inst, def);
    exports.ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function base64(params) {
    return core._base64(exports.ZodMiniBase64, params);
}
exports.ZodMiniBase64URL = core.$constructor("ZodMiniBase64URL", (inst, def) => {
    core.$ZodBase64URL.init(inst, def);
    exports.ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function base64url(params) {
    return core._base64url(exports.ZodMiniBase64URL, params);
}
exports.ZodMiniE164 = core.$constructor("ZodMiniE164", (inst, def) => {
    core.$ZodE164.init(inst, def);
    exports.ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function e164(params) {
    return core._e164(exports.ZodMiniE164, params);
}
exports.ZodMiniJWT = core.$constructor("ZodMiniJWT", (inst, def) => {
    core.$ZodJWT.init(inst, def);
    exports.ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function jwt(params) {
    return core._jwt(exports.ZodMiniJWT, params);
}
exports.ZodMiniCustomStringFormat = core.$constructor("ZodMiniCustomStringFormat", (inst, def) => {
    core.$ZodCustomStringFormat.init(inst, def);
    exports.ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function stringFormat(format, fnOrRegex, _params = {}) {
    return core._stringFormat(exports.ZodMiniCustomStringFormat, format, fnOrRegex, _params);
}
// @__NO_SIDE_EFFECTS__
function hostname(_params) {
    return core._stringFormat(exports.ZodMiniCustomStringFormat, "hostname", core.regexes.hostname, _params);
}
// @__NO_SIDE_EFFECTS__
function hex(_params) {
    return core._stringFormat(exports.ZodMiniCustomStringFormat, "hex", core.regexes.hex, _params);
}
// @__NO_SIDE_EFFECTS__
function hash(alg, params) {
    const enc = params?.enc ?? "hex";
    const format = `${alg}_${enc}`;
    const regex = core.regexes[format];
    // check for unrecognized format
    if (!regex)
        throw new Error(`Unrecognized hash format: ${format}`);
    return core._stringFormat(exports.ZodMiniCustomStringFormat, format, regex, params);
}
exports.ZodMiniNumber = core.$constructor("ZodMiniNumber", (inst, def) => {
    core.$ZodNumber.init(inst, def);
    exports.ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function number(params) {
    return core._number(exports.ZodMiniNumber, params);
}
exports.ZodMiniNumberFormat = core.$constructor("ZodMiniNumberFormat", (inst, def) => {
    core.$ZodNumberFormat.init(inst, def);
    exports.ZodMiniNumber.init(inst, def);
});
// int
// @__NO_SIDE_EFFECTS__
function int(params) {
    return core._int(exports.ZodMiniNumberFormat, params);
}
// float32
// @__NO_SIDE_EFFECTS__
function float32(params) {
    return core._float32(exports.ZodMiniNumberFormat, params);
}
// float64
// @__NO_SIDE_EFFECTS__
function float64(params) {
    return core._float64(exports.ZodMiniNumberFormat, params);
}
// int32
// @__NO_SIDE_EFFECTS__
function int32(params) {
    return core._int32(exports.ZodMiniNumberFormat, params);
}
// uint32
// @__NO_SIDE_EFFECTS__
function uint32(params) {
    return core._uint32(exports.ZodMiniNumberFormat, params);
}
exports.ZodMiniBoolean = core.$constructor("ZodMiniBoolean", (inst, def) => {
    core.$ZodBoolean.init(inst, def);
    exports.ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function boolean(params) {
    return core._boolean(exports.ZodMiniBoolean, params);
}
exports.ZodMiniBigInt = core.$constructor("ZodMiniBigInt", (inst, def) => {
    core.$ZodBigInt.init(inst, def);
    exports.ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function bigint(params) {
    return core._bigint(exports.ZodMiniBigInt, params);
}
exports.ZodMiniBigIntFormat = core.$constructor("ZodMiniBigIntFormat", (inst, def) => {
    core.$ZodBigIntFormat.init(inst, def);
    exports.ZodMiniBigInt.init(inst, def);
});
// int64
// @__NO_SIDE_EFFECTS__
function int64(params) {
    return core._int64(exports.ZodMiniBigIntFormat, params);
}
// uint64
// @__NO_SIDE_EFFECTS__
function uint64(params) {
    return core._uint64(exports.ZodMiniBigIntFormat, params);
}
exports.ZodMiniSymbol = core.$constructor("ZodMiniSymbol", (inst, def) => {
    core.$ZodSymbol.init(inst, def);
    exports.ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function symbol(params) {
    return core._symbol(exports.ZodMiniSymbol, params);
}
exports.ZodMiniUndefined = core.$constructor("ZodMiniUndefined", (inst, def) => {
    core.$ZodUndefined.init(inst, def);
    exports.ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function _undefined(params) {
    return core._undefined(exports.ZodMiniUndefined, params);
}
exports.ZodMiniNull = core.$constructor("ZodMiniNull", (inst, def) => {
    core.$ZodNull.init(inst, def);
    exports.ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function _null(params) {
    return core._null(exports.ZodMiniNull, params);
}
exports.ZodMiniAny = core.$constructor("ZodMiniAny", (inst, def) => {
    core.$ZodAny.init(inst, def);
    exports.ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function any() {
    return core._any(exports.ZodMiniAny);
}
exports.ZodMiniUnknown = core.$constructor("ZodMiniUnknown", (inst, def) => {
    core.$ZodUnknown.init(inst, def);
    exports.ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function unknown() {
    return core._unknown(exports.ZodMiniUnknown);
}
exports.ZodMiniNever = core.$constructor("ZodMiniNever", (inst, def) => {
    core.$ZodNever.init(inst, def);
    exports.ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function never(params) {
    return core._never(exports.ZodMiniNever, params);
}
exports.ZodMiniVoid = core.$constructor("ZodMiniVoid", (inst, def) => {
    core.$ZodVoid.init(inst, def);
    exports.ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function _void(params) {
    return core._void(exports.ZodMiniVoid, params);
}
exports.ZodMiniDate = core.$constructor("ZodMiniDate", (inst, def) => {
    core.$ZodDate.init(inst, def);
    exports.ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function date(params) {
    return core._date(exports.ZodMiniDate, params);
}
exports.ZodMiniArray = core.$constructor("ZodMiniArray", (inst, def) => {
    core.$ZodArray.init(inst, def);
    exports.ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function array(element, params) {
    return new exports.ZodMiniArray({
        type: "array",
        element: element,
        ...util.normalizeParams(params),
    });
}
// .keyof
// @__NO_SIDE_EFFECTS__
function keyof(schema) {
    const shape = schema._zod.def.shape;
    return _enum(Object.keys(shape));
}
exports.ZodMiniObject = core.$constructor("ZodMiniObject", (inst, def) => {
    core.$ZodObject.init(inst, def);
    exports.ZodMiniType.init(inst, def);
    util.defineLazy(inst, "shape", () => def.shape);
});
// @__NO_SIDE_EFFECTS__
function object(shape, params) {
    const def = {
        type: "object",
        shape: shape ?? {},
        ...util.normalizeParams(params),
    };
    return new exports.ZodMiniObject(def);
}
// strictObject
// @__NO_SIDE_EFFECTS__
function strictObject(shape, params) {
    return new exports.ZodMiniObject({
        type: "object",
        shape,
        catchall: never(),
        ...util.normalizeParams(params),
    });
}
// looseObject
// @__NO_SIDE_EFFECTS__
function looseObject(shape, params) {
    return new exports.ZodMiniObject({
        type: "object",
        shape,
        catchall: unknown(),
        ...util.normalizeParams(params),
    });
}
// object methods
// @__NO_SIDE_EFFECTS__
function extend(schema, shape) {
    return util.extend(schema, shape);
}
// @__NO_SIDE_EFFECTS__
function safeExtend(schema, shape) {
    return util.safeExtend(schema, shape);
}
// @__NO_SIDE_EFFECTS__
function merge(schema, shape) {
    return util.extend(schema, shape);
}
// @__NO_SIDE_EFFECTS__
function pick(schema, mask) {
    return util.pick(schema, mask);
}
// .omit
// @__NO_SIDE_EFFECTS__
function omit(schema, mask) {
    return util.omit(schema, mask);
}
// @__NO_SIDE_EFFECTS__
function partial(schema, mask) {
    return util.partial(exports.ZodMiniOptional, schema, mask);
}
// @__NO_SIDE_EFFECTS__
function required(schema, mask) {
    return util.required(exports.ZodMiniNonOptional, schema, mask);
}
// @__NO_SIDE_EFFECTS__
function catchall(inst, catchall) {
    return inst.clone({ ...inst._zod.def, catchall: catchall });
}
exports.ZodMiniUnion = core.$constructor("ZodMiniUnion", (inst, def) => {
    core.$ZodUnion.init(inst, def);
    exports.ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function union(options, params) {
    return new exports.ZodMiniUnion({
        type: "union",
        options: options,
        ...util.normalizeParams(params),
    });
}
exports.ZodMiniXor = core.$constructor("ZodMiniXor", (inst, def) => {
    exports.ZodMiniUnion.init(inst, def);
    core.$ZodXor.init(inst, def);
});
/** Creates an exclusive union (XOR) where exactly one option must match.
 * Unlike regular unions that succeed when any option matches, xor fails if
 * zero or more than one option matches the input. */
function xor(options, params) {
    return new exports.ZodMiniXor({
        type: "union",
        options: options,
        inclusive: false,
        ...util.normalizeParams(params),
    });
}
exports.ZodMiniDiscriminatedUnion = core.$constructor("ZodMiniDiscriminatedUnion", (inst, def) => {
    core.$ZodDiscriminatedUnion.init(inst, def);
    exports.ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function discriminatedUnion(discriminator, options, params) {
    return new exports.ZodMiniDiscriminatedUnion({
        type: "union",
        options,
        discriminator,
        ...util.normalizeParams(params),
    });
}
exports.ZodMiniIntersection = core.$constructor("ZodMiniIntersection", (inst, def) => {
    core.$ZodIntersection.init(inst, def);
    exports.ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function intersection(left, right) {
    return new exports.ZodMiniIntersection({
        type: "intersection",
        left: left,
        right: right,
    });
}
exports.ZodMiniTuple = core.$constructor("ZodMiniTuple", (inst, def) => {
    core.$ZodTuple.init(inst, def);
    exports.ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function tuple(items, _paramsOrRest, _params) {
    const hasRest = _paramsOrRest instanceof core.$ZodType;
    const params = hasRest ? _params : _paramsOrRest;
    const rest = hasRest ? _paramsOrRest : null;
    return new exports.ZodMiniTuple({
        type: "tuple",
        items: items,
        rest,
        ...util.normalizeParams(params),
    });
}
exports.ZodMiniRecord = core.$constructor("ZodMiniRecord", (inst, def) => {
    core.$ZodRecord.init(inst, def);
    exports.ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function record(keyType, valueType, params) {
    // v3-compat: z.record(valueType, params?) — defaults keyType to z.string()
    if (!valueType || !valueType._zod) {
        return new exports.ZodMiniRecord({
            type: "record",
            keyType: string(),
            valueType: keyType,
            ...util.normalizeParams(valueType),
        });
    }
    return new exports.ZodMiniRecord({
        type: "record",
        keyType,
        valueType: valueType,
        ...util.normalizeParams(params),
    });
}
// @__NO_SIDE_EFFECTS__
function partialRecord(keyType, valueType, params) {
    const k = core.clone(keyType);
    k._zod.values = undefined;
    return new exports.ZodMiniRecord({
        type: "record",
        keyType: k,
        valueType: valueType,
        ...util.normalizeParams(params),
    });
}
function looseRecord(keyType, valueType, params) {
    return new exports.ZodMiniRecord({
        type: "record",
        keyType,
        valueType: valueType,
        mode: "loose",
        ...util.normalizeParams(params),
    });
}
exports.ZodMiniMap = core.$constructor("ZodMiniMap", (inst, def) => {
    core.$ZodMap.init(inst, def);
    exports.ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function map(keyType, valueType, params) {
    return new exports.ZodMiniMap({
        type: "map",
        keyType: keyType,
        valueType: valueType,
        ...util.normalizeParams(params),
    });
}
exports.ZodMiniSet = core.$constructor("ZodMiniSet", (inst, def) => {
    core.$ZodSet.init(inst, def);
    exports.ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function set(valueType, params) {
    return new exports.ZodMiniSet({
        type: "set",
        valueType: valueType,
        ...util.normalizeParams(params),
    });
}
exports.ZodMiniEnum = core.$constructor("ZodMiniEnum", (inst, def) => {
    core.$ZodEnum.init(inst, def);
    exports.ZodMiniType.init(inst, def);
    inst.options = Object.values(def.entries);
});
// @__NO_SIDE_EFFECTS__
function _enum(values, params) {
    const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
    return new exports.ZodMiniEnum({
        type: "enum",
        entries,
        ...util.normalizeParams(params),
    });
}
// @__NO_SIDE_EFFECTS__
/** @deprecated This API has been merged into `z.enum()`. Use `z.enum()` instead.
 *
 * ```ts
 * enum Colors { red, green, blue }
 * z.enum(Colors);
 * ```
 */
function nativeEnum(entries, params) {
    return new exports.ZodMiniEnum({
        type: "enum",
        entries,
        ...util.normalizeParams(params),
    });
}
exports.ZodMiniLiteral = core.$constructor("ZodMiniLiteral", (inst, def) => {
    core.$ZodLiteral.init(inst, def);
    exports.ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function literal(value, params) {
    return new exports.ZodMiniLiteral({
        type: "literal",
        values: Array.isArray(value) ? value : [value],
        ...util.normalizeParams(params),
    });
}
exports.ZodMiniFile = core.$constructor("ZodMiniFile", (inst, def) => {
    core.$ZodFile.init(inst, def);
    exports.ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function file(params) {
    return core._file(exports.ZodMiniFile, params);
}
exports.ZodMiniTransform = core.$constructor("ZodMiniTransform", (inst, def) => {
    core.$ZodTransform.init(inst, def);
    exports.ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function transform(fn) {
    return new exports.ZodMiniTransform({
        type: "transform",
        transform: fn,
    });
}
exports.ZodMiniOptional = core.$constructor("ZodMiniOptional", (inst, def) => {
    core.$ZodOptional.init(inst, def);
    exports.ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function optional(innerType) {
    return new exports.ZodMiniOptional({
        type: "optional",
        innerType: innerType,
    });
}
exports.ZodMiniExactOptional = core.$constructor("ZodMiniExactOptional", (inst, def) => {
    core.$ZodExactOptional.init(inst, def);
    exports.ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function exactOptional(innerType) {
    return new exports.ZodMiniExactOptional({
        type: "optional",
        innerType: innerType,
    });
}
exports.ZodMiniNullable = core.$constructor("ZodMiniNullable", (inst, def) => {
    core.$ZodNullable.init(inst, def);
    exports.ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function nullable(innerType) {
    return new exports.ZodMiniNullable({
        type: "nullable",
        innerType: innerType,
    });
}
// nullish
// @__NO_SIDE_EFFECTS__
function nullish(innerType) {
    return optional(nullable(innerType));
}
exports.ZodMiniDefault = core.$constructor("ZodMiniDefault", (inst, def) => {
    core.$ZodDefault.init(inst, def);
    exports.ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function _default(innerType, defaultValue) {
    return new exports.ZodMiniDefault({
        type: "default",
        innerType: innerType,
        get defaultValue() {
            return typeof defaultValue === "function" ? defaultValue() : util.shallowClone(defaultValue);
        },
    });
}
exports.ZodMiniPrefault = core.$constructor("ZodMiniPrefault", (inst, def) => {
    core.$ZodPrefault.init(inst, def);
    exports.ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function prefault(innerType, defaultValue) {
    return new exports.ZodMiniPrefault({
        type: "prefault",
        innerType: innerType,
        get defaultValue() {
            return typeof defaultValue === "function" ? defaultValue() : util.shallowClone(defaultValue);
        },
    });
}
exports.ZodMiniNonOptional = core.$constructor("ZodMiniNonOptional", (inst, def) => {
    core.$ZodNonOptional.init(inst, def);
    exports.ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function nonoptional(innerType, params) {
    return new exports.ZodMiniNonOptional({
        type: "nonoptional",
        innerType: innerType,
        ...util.normalizeParams(params),
    });
}
exports.ZodMiniSuccess = core.$constructor("ZodMiniSuccess", (inst, def) => {
    core.$ZodSuccess.init(inst, def);
    exports.ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function success(innerType) {
    return new exports.ZodMiniSuccess({
        type: "success",
        innerType: innerType,
    });
}
exports.ZodMiniCatch = core.$constructor("ZodMiniCatch", (inst, def) => {
    core.$ZodCatch.init(inst, def);
    exports.ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function _catch(innerType, catchValue) {
    return new exports.ZodMiniCatch({
        type: "catch",
        innerType: innerType,
        catchValue: (typeof catchValue === "function" ? catchValue : () => catchValue),
    });
}
exports.ZodMiniNaN = core.$constructor("ZodMiniNaN", (inst, def) => {
    core.$ZodNaN.init(inst, def);
    exports.ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function nan(params) {
    return core._nan(exports.ZodMiniNaN, params);
}
exports.ZodMiniPipe = core.$constructor("ZodMiniPipe", (inst, def) => {
    core.$ZodPipe.init(inst, def);
    exports.ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function pipe(in_, out) {
    return new exports.ZodMiniPipe({
        type: "pipe",
        in: in_,
        out: out,
    });
}
exports.ZodMiniCodec = core.$constructor("ZodMiniCodec", (inst, def) => {
    exports.ZodMiniPipe.init(inst, def);
    core.$ZodCodec.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function codec(in_, out, params) {
    return new exports.ZodMiniCodec({
        type: "pipe",
        in: in_,
        out: out,
        transform: params.decode,
        reverseTransform: params.encode,
    });
}
// @__NO_SIDE_EFFECTS__
function invertCodec(codec) {
    const def = codec._zod.def;
    return new exports.ZodMiniCodec({
        type: "pipe",
        in: def.out,
        out: def.in,
        transform: def.reverseTransform,
        reverseTransform: def.transform,
    });
}
exports.ZodMiniReadonly = core.$constructor("ZodMiniReadonly", (inst, def) => {
    core.$ZodReadonly.init(inst, def);
    exports.ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function readonly(innerType) {
    return new exports.ZodMiniReadonly({
        type: "readonly",
        innerType: innerType,
    });
}
exports.ZodMiniTemplateLiteral = core.$constructor("ZodMiniTemplateLiteral", (inst, def) => {
    core.$ZodTemplateLiteral.init(inst, def);
    exports.ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function templateLiteral(parts, params) {
    return new exports.ZodMiniTemplateLiteral({
        type: "template_literal",
        parts,
        ...util.normalizeParams(params),
    });
}
exports.ZodMiniLazy = core.$constructor("ZodMiniLazy", (inst, def) => {
    core.$ZodLazy.init(inst, def);
    exports.ZodMiniType.init(inst, def);
});
// export function lazy<T extends object>(getter: () => T): T {
//   return util.createTransparentProxy<T>(getter);
// }
// @__NO_SIDE_EFFECTS__
function _lazy(getter) {
    return new exports.ZodMiniLazy({
        type: "lazy",
        getter: getter,
    });
}
exports.ZodMiniPromise = core.$constructor("ZodMiniPromise", (inst, def) => {
    core.$ZodPromise.init(inst, def);
    exports.ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function promise(innerType) {
    return new exports.ZodMiniPromise({
        type: "promise",
        innerType: innerType,
    });
}
exports.ZodMiniCustom = core.$constructor("ZodMiniCustom", (inst, def) => {
    core.$ZodCustom.init(inst, def);
    exports.ZodMiniType.init(inst, def);
});
// custom checks
// @__NO_SIDE_EFFECTS__
function check(fn, params) {
    const ch = new core.$ZodCheck({
        check: "custom",
        ...util.normalizeParams(params),
    });
    ch._zod.check = fn;
    return ch;
}
// ZodCustom
// custom schema
// @__NO_SIDE_EFFECTS__
function custom(fn, _params) {
    return core._custom(exports.ZodMiniCustom, fn ?? (() => true), _params);
}
// refine
// @__NO_SIDE_EFFECTS__
function refine(fn, _params = {}) {
    return core._refine(exports.ZodMiniCustom, fn, _params);
}
// superRefine
// @__NO_SIDE_EFFECTS__
function superRefine(fn, params) {
    return core._superRefine(fn, params);
}
// Re-export describe and meta from core
exports.describe = core.describe;
exports.meta = core.meta;
// instanceof
class Class {
    constructor(..._args) { }
}
// @__NO_SIDE_EFFECTS__
function _instanceof(cls, params = {}) {
    const inst = custom((data) => data instanceof cls, params);
    inst._zod.bag.Class = cls;
    // Override check to emit invalid_type instead of custom
    inst._zod.check = (payload) => {
        if (!(payload.value instanceof cls)) {
            payload.issues.push({
                code: "invalid_type",
                expected: cls.name,
                input: payload.value,
                inst,
                path: [...(inst._zod.def.path ?? [])],
            });
        }
    };
    return inst;
}
// stringbool
const stringbool = (...args) => core._stringbool({
    Codec: exports.ZodMiniCodec,
    Boolean: exports.ZodMiniBoolean,
    String: exports.ZodMiniString,
}, ...args);
exports.stringbool = stringbool;
// @__NO_SIDE_EFFECTS__
function json() {
    const jsonSchema = _lazy(() => {
        return union([string(), number(), boolean(), _null(), array(jsonSchema), record(string(), jsonSchema)]);
    });
    return jsonSchema;
}
exports.ZodMiniFunction = core.$constructor("ZodMiniFunction", (inst, def) => {
    core.$ZodFunction.init(inst, def);
    exports.ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function _function(params) {
    return new exports.ZodMiniFunction({
        type: "function",
        input: Array.isArray(params?.input) ? tuple(params?.input) : (params?.input ?? array(unknown())),
        output: params?.output ?? unknown(),
    });
}
