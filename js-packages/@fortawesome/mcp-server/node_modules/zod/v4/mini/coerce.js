import * as core from "../core/index.js";
import * as schemas from "./schemas.js";
// @__NO_SIDE_EFFECTS__
export function string(params) {
    return core._coercedString(schemas.ZodMiniString, params);
}
// @__NO_SIDE_EFFECTS__
export function number(params) {
    return core._coercedNumber(schemas.ZodMiniNumber, params);
}
// @__NO_SIDE_EFFECTS__
export function boolean(params) {
    return core._coercedBoolean(schemas.ZodMiniBoolean, params);
}
// @__NO_SIDE_EFFECTS__
export function bigint(params) {
    return core._coercedBigint(schemas.ZodMiniBigInt, params);
}
// @__NO_SIDE_EFFECTS__
export function date(params) {
    return core._coercedDate(schemas.ZodMiniDate, params);
}
