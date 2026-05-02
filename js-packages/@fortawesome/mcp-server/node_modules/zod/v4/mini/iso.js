import * as core from "../core/index.js";
import * as schemas from "./schemas.js";
export const ZodMiniISODateTime = /*@__PURE__*/ core.$constructor("ZodMiniISODateTime", (inst, def) => {
    core.$ZodISODateTime.init(inst, def);
    schemas.ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
export function datetime(params) {
    return core._isoDateTime(ZodMiniISODateTime, params);
}
export const ZodMiniISODate = /*@__PURE__*/ core.$constructor("ZodMiniISODate", (inst, def) => {
    core.$ZodISODate.init(inst, def);
    schemas.ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
export function date(params) {
    return core._isoDate(ZodMiniISODate, params);
}
export const ZodMiniISOTime = /*@__PURE__*/ core.$constructor("ZodMiniISOTime", (inst, def) => {
    core.$ZodISOTime.init(inst, def);
    schemas.ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
export function time(params) {
    return core._isoTime(ZodMiniISOTime, params);
}
export const ZodMiniISODuration = /*@__PURE__*/ core.$constructor("ZodMiniISODuration", (inst, def) => {
    core.$ZodISODuration.init(inst, def);
    schemas.ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
export function duration(params) {
    return core._isoDuration(ZodMiniISODuration, params);
}
