import * as core from "../core/index.js";
import * as schemas from "./schemas.js";

// iso time
export interface ZodMiniISODateTime extends schemas.ZodMiniStringFormat<"datetime"> {
  _zod: core.$ZodISODateTimeInternals;
}
export const ZodMiniISODateTime: core.$constructor<ZodMiniISODateTime> = /*@__PURE__*/ core.$constructor(
  "ZodMiniISODateTime",
  (inst, def) => {
    core.$ZodISODateTime.init(inst, def);
    schemas.ZodMiniStringFormat.init(inst, def);
  }
);
// @__NO_SIDE_EFFECTS__
export function datetime(params?: string | core.$ZodISODateTimeParams): ZodMiniISODateTime {
  return core._isoDateTime(ZodMiniISODateTime, params);
}

// iso date
export interface ZodMiniISODate extends schemas.ZodMiniStringFormat<"date"> {
  _zod: core.$ZodISODateInternals;
}
export const ZodMiniISODate: core.$constructor<ZodMiniISODate> = /*@__PURE__*/ core.$constructor(
  "ZodMiniISODate",
  (inst, def) => {
    core.$ZodISODate.init(inst, def);
    schemas.ZodMiniStringFormat.init(inst, def);
  }
);
// @__NO_SIDE_EFFECTS__
export function date(params?: string | core.$ZodISODateParams): ZodMiniISODate {
  return core._isoDate(ZodMiniISODate, params);
}

// iso time
export interface ZodMiniISOTime extends schemas.ZodMiniStringFormat<"time"> {
  _zod: core.$ZodISOTimeInternals;
}
export const ZodMiniISOTime: core.$constructor<ZodMiniISOTime> = /*@__PURE__*/ core.$constructor(
  "ZodMiniISOTime",
  (inst, def) => {
    core.$ZodISOTime.init(inst, def);
    schemas.ZodMiniStringFormat.init(inst, def);
  }
);
// @__NO_SIDE_EFFECTS__
export function time(params?: string | core.$ZodISOTimeParams): ZodMiniISOTime {
  return core._isoTime(ZodMiniISOTime, params);
}

// iso duration
export interface ZodMiniISODuration extends schemas.ZodMiniStringFormat<"duration"> {
  _zod: core.$ZodISODurationInternals;
}
export const ZodMiniISODuration: core.$constructor<ZodMiniISODuration> = /*@__PURE__*/ core.$constructor(
  "ZodMiniISODuration",
  (inst, def) => {
    core.$ZodISODuration.init(inst, def);
    schemas.ZodMiniStringFormat.init(inst, def);
  }
);
// @__NO_SIDE_EFFECTS__
export function duration(params?: string | core.$ZodISODurationParams): ZodMiniISODuration {
  return core._isoDuration(ZodMiniISODuration, params);
}
