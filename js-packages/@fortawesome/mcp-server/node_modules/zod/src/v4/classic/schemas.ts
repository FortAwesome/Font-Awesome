import * as core from "../core/index.js";
import { util } from "../core/index.js";
import * as processors from "../core/json-schema-processors.js";
import type { StandardSchemaWithJSONProps } from "../core/standard-schema.js";
import { createStandardJSONSchemaMethod, createToJSONSchemaMethod } from "../core/to-json-schema.js";

import * as checks from "./checks.js";
import * as iso from "./iso.js";
import * as parse from "./parse.js";

// Lazy-bind builder methods.
//
// Builder methods (`.optional`, `.array`, `.refine`, ...) live as
// non-enumerable getters on each concrete schema constructor's
// prototype. On first access from an instance the getter allocates
// `fn.bind(this)` and caches it as an own property on that instance,
// so detached usage (`const m = schema.optional; m()`) still works
// and the per-instance allocation only happens for methods actually
// touched.
//
// One install per (prototype, group), memoized by `_installedGroups`.
const _installedGroups = /* @__PURE__ */ new WeakMap<object, Set<string>>();

/**
 * Methods of `T` reshaped so each body has `this: T` and matches the
 * declared (args, return) of the corresponding interface method. Allows
 * us to type-check inline method-shorthand bodies against the
 * `ZodType` / `_ZodString` / etc. interface declarations.
 */
type _LazyMethodsOf<T> = Partial<{
  [K in keyof T]: T[K] extends (...args: infer A) => infer R ? (this: T, ...args: A) => R : never;
}>;

function _installLazyMethods<T extends object>(inst: T, group: string, methods: _LazyMethodsOf<T>): void {
  const proto = Object.getPrototypeOf(inst);
  let installed = _installedGroups.get(proto);
  if (!installed) {
    installed = new Set();
    _installedGroups.set(proto, installed);
  }
  if (installed.has(group)) return;
  installed.add(group);
  for (const key in methods) {
    const fn = methods[key]!;
    Object.defineProperty(proto, key, {
      configurable: true,
      enumerable: false,
      get(this: any) {
        const bound = fn.bind(this);
        Object.defineProperty(this, key, {
          configurable: true,
          writable: true,
          enumerable: true,
          value: bound,
        });
        return bound;
      },
      set(this: any, v: unknown) {
        Object.defineProperty(this, key, {
          configurable: true,
          writable: true,
          enumerable: true,
          value: v,
        });
      },
    });
  }
}

///////////////////////////////////////////
///////////////////////////////////////////
////////////                   ////////////
////////////      ZodType      ////////////
////////////                   ////////////
///////////////////////////////////////////
///////////////////////////////////////////

export type ZodStandardSchemaWithJSON<T> = StandardSchemaWithJSONProps<core.input<T>, core.output<T>>;
export interface ZodType<
  out Output = unknown,
  out Input = unknown,
  out Internals extends core.$ZodTypeInternals<Output, Input> = core.$ZodTypeInternals<Output, Input>,
> extends core.$ZodType<Output, Input, Internals> {
  def: Internals["def"];
  type: Internals["def"]["type"];

  /** @deprecated Use `.def` instead. */
  _def: Internals["def"];
  /** @deprecated Use `z.output<typeof schema>` instead. */
  _output: Internals["output"];
  /** @deprecated Use `z.input<typeof schema>` instead. */
  _input: Internals["input"];

  "~standard": ZodStandardSchemaWithJSON<this>;
  /** Converts this schema to a JSON Schema representation. */
  toJSONSchema(params?: core.ToJSONSchemaParams): core.ZodStandardJSONSchemaPayload<this>;

  // base methods
  check(...checks: (core.CheckFn<core.output<this>> | core.$ZodCheck<core.output<this>>)[]): this;
  with(...checks: (core.CheckFn<core.output<this>> | core.$ZodCheck<core.output<this>>)[]): this;
  clone(def?: Internals["def"], params?: { parent: boolean }): this;
  register<R extends core.$ZodRegistry>(
    registry: R,
    ...meta: this extends R["_schema"]
      ? undefined extends R["_meta"]
        ? [core.$replace<R["_meta"], this>?]
        : [core.$replace<R["_meta"], this>]
      : ["Incompatible schema"]
  ): this;

  brand<T extends PropertyKey = PropertyKey, Dir extends "in" | "out" | "inout" = "out">(
    value?: T
  ): PropertyKey extends T ? this : core.$ZodBranded<this, T, Dir>;

  // parsing
  parse(data: unknown, params?: core.ParseContext<core.$ZodIssue>): core.output<this>;
  safeParse(data: unknown, params?: core.ParseContext<core.$ZodIssue>): parse.ZodSafeParseResult<core.output<this>>;
  parseAsync(data: unknown, params?: core.ParseContext<core.$ZodIssue>): Promise<core.output<this>>;
  safeParseAsync(
    data: unknown,
    params?: core.ParseContext<core.$ZodIssue>
  ): Promise<parse.ZodSafeParseResult<core.output<this>>>;
  spa: (
    data: unknown,
    params?: core.ParseContext<core.$ZodIssue>
  ) => Promise<parse.ZodSafeParseResult<core.output<this>>>;

  // encoding/decoding
  encode(data: core.output<this>, params?: core.ParseContext<core.$ZodIssue>): core.input<this>;
  decode(data: core.input<this>, params?: core.ParseContext<core.$ZodIssue>): core.output<this>;
  encodeAsync(data: core.output<this>, params?: core.ParseContext<core.$ZodIssue>): Promise<core.input<this>>;
  decodeAsync(data: core.input<this>, params?: core.ParseContext<core.$ZodIssue>): Promise<core.output<this>>;
  safeEncode(
    data: core.output<this>,
    params?: core.ParseContext<core.$ZodIssue>
  ): parse.ZodSafeParseResult<core.input<this>>;
  safeDecode(
    data: core.input<this>,
    params?: core.ParseContext<core.$ZodIssue>
  ): parse.ZodSafeParseResult<core.output<this>>;
  safeEncodeAsync(
    data: core.output<this>,
    params?: core.ParseContext<core.$ZodIssue>
  ): Promise<parse.ZodSafeParseResult<core.input<this>>>;
  safeDecodeAsync(
    data: core.input<this>,
    params?: core.ParseContext<core.$ZodIssue>
  ): Promise<parse.ZodSafeParseResult<core.output<this>>>;

  // refinements
  refine<Ch extends (arg: core.output<this>) => unknown | Promise<unknown>>(
    check: Ch,
    params?: string | core.$ZodCustomParams
  ): Ch extends (arg: any) => arg is infer R ? this & ZodType<R, core.input<this>> : this;
  superRefine(
    refinement: (arg: core.output<this>, ctx: core.$RefinementCtx<core.output<this>>) => void | Promise<void>,
    params?: core.$ZodSuperRefineParams
  ): this;
  overwrite(fn: (x: core.output<this>) => core.output<this>): this;

  // wrappers
  optional(): ZodOptional<this>;
  exactOptional(): ZodExactOptional<this>;
  nonoptional(params?: string | core.$ZodNonOptionalParams): ZodNonOptional<this>;
  nullable(): ZodNullable<this>;
  nullish(): ZodOptional<ZodNullable<this>>;
  default(def: util.NoUndefined<core.output<this>>): ZodDefault<this>;
  default(def: () => util.NoUndefined<core.output<this>>): ZodDefault<this>;
  prefault(def: () => core.input<this>): ZodPrefault<this>;
  prefault(def: core.input<this>): ZodPrefault<this>;
  array(): ZodArray<this>;
  or<T extends core.SomeType>(option: T): ZodUnion<[this, T]>;
  and<T extends core.SomeType>(incoming: T): ZodIntersection<this, T>;
  transform<NewOut>(
    transform: (arg: core.output<this>, ctx: core.$RefinementCtx<core.output<this>>) => NewOut | Promise<NewOut>
  ): ZodPipe<this, ZodTransform<Awaited<NewOut>, core.output<this>>>;
  catch(def: core.output<this>): ZodCatch<this>;
  catch(def: (ctx: core.$ZodCatchCtx) => core.output<this>): ZodCatch<this>;
  pipe<T extends core.$ZodType<any, core.output<this>>>(
    target: T | core.$ZodType<any, core.output<this>>
  ): ZodPipe<this, T>;
  readonly(): ZodReadonly<this>;

  /** Returns a new instance that has been registered in `z.globalRegistry` with the specified description */
  describe(description: string): this;
  description?: string;
  /** Returns the metadata associated with this instance in `z.globalRegistry` */
  meta(): core.$replace<core.GlobalMeta, this> | undefined;
  /** Returns a new instance that has been registered in `z.globalRegistry` with the specified metadata */
  meta(data: core.$replace<core.GlobalMeta, this>): this;

  // helpers
  /** @deprecated Try safe-parsing `undefined` (this is what `isOptional` does internally):
   *
   * ```ts
   * const schema = z.string().optional();
   * const isOptional = schema.safeParse(undefined).success; // true
   * ```
   */
  isOptional(): boolean;
  /**
   * @deprecated Try safe-parsing `null` (this is what `isNullable` does internally):
   *
   * ```ts
   * const schema = z.string().nullable();
   * const isNullable = schema.safeParse(null).success; // true
   * ```
   */
  isNullable(): boolean;
  apply<T>(fn: (schema: this) => T): T;
}

export interface _ZodType<out Internals extends core.$ZodTypeInternals = core.$ZodTypeInternals>
  extends ZodType<any, any, Internals> {}

export const ZodType: core.$constructor<ZodType> = /*@__PURE__*/ core.$constructor("ZodType", (inst, def) => {
  core.$ZodType.init(inst, def);
  Object.assign(inst["~standard"], {
    jsonSchema: {
      input: createStandardJSONSchemaMethod(inst, "input"),
      output: createStandardJSONSchemaMethod(inst, "output"),
    },
  });
  inst.toJSONSchema = createToJSONSchemaMethod(inst, {});

  inst.def = def;
  inst.type = def.type;
  Object.defineProperty(inst, "_def", { value: def });

  // Parse-family is intentionally kept as per-instance closures: these are
  // the hot path AND the most-detached methods (`arr.map(schema.parse)`,
  // `const { parse } = schema`, etc.). Eager closures here mean callers pay
  // ~12 closure allocations per schema but get monomorphic call sites and
  // detached usage that "just works".
  inst.parse = (data, params) => parse.parse(inst, data, params, { callee: inst.parse });
  inst.safeParse = (data, params) => parse.safeParse(inst, data, params);
  inst.parseAsync = async (data, params) => parse.parseAsync(inst, data, params, { callee: inst.parseAsync });
  inst.safeParseAsync = async (data, params) => parse.safeParseAsync(inst, data, params);
  inst.spa = inst.safeParseAsync;
  inst.encode = (data, params) => parse.encode(inst, data, params);
  inst.decode = (data, params) => parse.decode(inst, data, params);
  inst.encodeAsync = async (data, params) => parse.encodeAsync(inst, data, params);
  inst.decodeAsync = async (data, params) => parse.decodeAsync(inst, data, params);
  inst.safeEncode = (data, params) => parse.safeEncode(inst, data, params);
  inst.safeDecode = (data, params) => parse.safeDecode(inst, data, params);
  inst.safeEncodeAsync = async (data, params) => parse.safeEncodeAsync(inst, data, params);
  inst.safeDecodeAsync = async (data, params) => parse.safeDecodeAsync(inst, data, params);

  // All builder methods are placed on the internal prototype as lazy-bind
  // getters. On first access per-instance, a bound thunk is allocated and
  // cached as an own property; subsequent accesses skip the getter. This
  // means: no per-instance allocation for unused methods, full
  // detachability preserved (`const m = schema.optional; m()` works), and
  // shared underlying function references across all instances.
  _installLazyMethods(inst, "ZodType", {
    check(...chks) {
      const def = this.def;
      return this.clone(
        util.mergeDefs(def, {
          checks: [
            ...(def.checks ?? []),
            ...chks.map((ch) =>
              typeof ch === "function" ? { _zod: { check: ch, def: { check: "custom" }, onattach: [] } } : ch
            ),
          ],
        }),
        { parent: true }
      );
    },
    with(...chks) {
      return this.check(...chks);
    },
    clone(def, params) {
      return core.clone(this, def, params);
    },
    brand() {
      return this;
    },
    register(reg, meta) {
      reg.add(this, meta);
      return this;
    },
    refine(check, params) {
      return this.check(refine(check, params));
    },
    superRefine(refinement, params) {
      return this.check(superRefine(refinement, params));
    },
    overwrite(fn) {
      return this.check(checks.overwrite(fn));
    },
    optional() {
      return optional(this);
    },
    exactOptional() {
      return exactOptional(this);
    },
    nullable() {
      return nullable(this);
    },
    nullish() {
      return optional(nullable(this));
    },
    nonoptional(params) {
      return nonoptional(this, params);
    },
    array() {
      return array(this);
    },
    or(arg) {
      return union([this, arg]);
    },
    and(arg) {
      return intersection(this, arg);
    },
    transform(tx) {
      return pipe(this, transform(tx));
    },
    default(d) {
      return _default(this, d);
    },
    prefault(d) {
      return prefault(this, d);
    },
    catch(params) {
      return _catch(this, params);
    },
    pipe(target) {
      return pipe(this, target);
    },
    readonly() {
      return readonly(this);
    },
    describe(description) {
      const cl = this.clone();
      core.globalRegistry.add(cl, { description });
      return cl;
    },
    meta(...args: any[]): any {
      // overloaded: meta() returns the registered metadata, meta(data)
      // returns a clone with `data` registered. The mapped type picks
      // up the second overload, so we accept variadic any-args and
      // return `any` to satisfy both at runtime.
      if (args.length === 0) return core.globalRegistry.get(this);
      const cl = this.clone();
      core.globalRegistry.add(cl, args[0]);
      return cl;
    },
    isOptional() {
      return this.safeParse(undefined).success;
    },
    isNullable() {
      return this.safeParse(null).success;
    },
    apply(fn) {
      return fn(this);
    },
  });
  Object.defineProperty(inst, "description", {
    get() {
      return core.globalRegistry.get(inst)?.description;
    },
    configurable: true,
  });
  return inst;
});

// ZodString
export interface _ZodString<T extends core.$ZodStringInternals<unknown> = core.$ZodStringInternals<unknown>>
  extends _ZodType<T> {
  format: string | null;
  minLength: number | null;
  maxLength: number | null;

  // miscellaneous checks
  regex(regex: RegExp, params?: string | core.$ZodCheckRegexParams): this;
  includes(value: string, params?: string | core.$ZodCheckIncludesParams): this;
  startsWith(value: string, params?: string | core.$ZodCheckStartsWithParams): this;
  endsWith(value: string, params?: string | core.$ZodCheckEndsWithParams): this;
  min(minLength: number, params?: string | core.$ZodCheckMinLengthParams): this;
  max(maxLength: number, params?: string | core.$ZodCheckMaxLengthParams): this;
  length(len: number, params?: string | core.$ZodCheckLengthEqualsParams): this;
  nonempty(params?: string | core.$ZodCheckMinLengthParams): this;
  lowercase(params?: string | core.$ZodCheckLowerCaseParams): this;
  uppercase(params?: string | core.$ZodCheckUpperCaseParams): this;

  // transforms
  trim(): this;
  normalize(form?: "NFC" | "NFD" | "NFKC" | "NFKD" | (string & {})): this;
  toLowerCase(): this;
  toUpperCase(): this;
  slugify(): this;
}

/** @internal */
export const _ZodString: core.$constructor<_ZodString> = /*@__PURE__*/ core.$constructor("_ZodString", (inst, def) => {
  core.$ZodString.init(inst, def);
  ZodType.init(inst, def);

  inst._zod.processJSONSchema = (ctx, json, params) => processors.stringProcessor(inst, ctx, json, params);

  const bag = inst._zod.bag;
  inst.format = bag.format ?? null;
  inst.minLength = bag.minimum ?? null;
  inst.maxLength = bag.maximum ?? null;

  _installLazyMethods(inst, "_ZodString", {
    regex(...args) {
      return this.check((checks.regex as any)(...args));
    },
    includes(...args) {
      return this.check((checks.includes as any)(...args));
    },
    startsWith(...args) {
      return this.check((checks.startsWith as any)(...args));
    },
    endsWith(...args) {
      return this.check((checks.endsWith as any)(...args));
    },
    min(...args) {
      return this.check((checks.minLength as any)(...args));
    },
    max(...args) {
      return this.check((checks.maxLength as any)(...args));
    },
    length(...args) {
      return this.check((checks.length as any)(...args));
    },
    nonempty(...args) {
      return this.check((checks.minLength as any)(1, ...args));
    },
    lowercase(params) {
      return this.check(checks.lowercase(params));
    },
    uppercase(params) {
      return this.check(checks.uppercase(params));
    },
    trim() {
      return this.check(checks.trim());
    },
    normalize(...args) {
      return this.check(checks.normalize(...args));
    },
    toLowerCase() {
      return this.check(checks.toLowerCase());
    },
    toUpperCase() {
      return this.check(checks.toUpperCase());
    },
    slugify() {
      return this.check(checks.slugify());
    },
  });
});

export interface ZodString extends _ZodString<core.$ZodStringInternals<string>> {
  // string format checks

  /** @deprecated Use `z.email()` instead. */
  email(params?: string | core.$ZodCheckEmailParams): this;
  /** @deprecated Use `z.url()` instead. */
  url(params?: string | core.$ZodCheckURLParams): this;
  /** @deprecated Use `z.jwt()` instead. */
  jwt(params?: string | core.$ZodCheckJWTParams): this;
  /** @deprecated Use `z.emoji()` instead. */
  emoji(params?: string | core.$ZodCheckEmojiParams): this;
  /** @deprecated Use `z.guid()` instead. */
  guid(params?: string | core.$ZodCheckGUIDParams): this;
  /** @deprecated Use `z.uuid()` instead. */
  uuid(params?: string | core.$ZodCheckUUIDParams): this;
  /** @deprecated Use `z.uuid()` instead. */
  uuidv4(params?: string | core.$ZodCheckUUIDParams): this;
  /** @deprecated Use `z.uuid()` instead. */
  uuidv6(params?: string | core.$ZodCheckUUIDParams): this;
  /** @deprecated Use `z.uuid()` instead. */
  uuidv7(params?: string | core.$ZodCheckUUIDParams): this;
  /** @deprecated Use `z.nanoid()` instead. */
  nanoid(params?: string | core.$ZodCheckNanoIDParams): this;
  /** @deprecated Use `z.guid()` instead. */
  guid(params?: string | core.$ZodCheckGUIDParams): this;
  /**
   * @deprecated CUID v1 is deprecated by its authors due to information leakage
   * (timestamps embedded in the id). Use `z.cuid2()` instead.
   * See https://github.com/paralleldrive/cuid.
   */
  cuid(params?: string | core.$ZodCheckCUIDParams): this;
  /** @deprecated Use `z.cuid2()` instead. */
  cuid2(params?: string | core.$ZodCheckCUID2Params): this;
  /** @deprecated Use `z.ulid()` instead. */
  ulid(params?: string | core.$ZodCheckULIDParams): this;
  /** @deprecated Use `z.base64()` instead. */
  base64(params?: string | core.$ZodCheckBase64Params): this;
  /** @deprecated Use `z.base64url()` instead. */
  base64url(params?: string | core.$ZodCheckBase64URLParams): this;
  // /** @deprecated Use `z.jsonString()` instead. */
  // jsonString(params?: string | core.$ZodCheckJSONStringParams): this;
  /** @deprecated Use `z.xid()` instead. */
  xid(params?: string | core.$ZodCheckXIDParams): this;
  /** @deprecated Use `z.ksuid()` instead. */
  ksuid(params?: string | core.$ZodCheckKSUIDParams): this;
  // /** @deprecated Use `z.ipv4()` or `z.ipv6()` instead. */
  // ip(params?: string | (core.$ZodCheckIPv4Params & { version?: "v4" | "v6" })): ZodUnion<[this, this]>;
  /** @deprecated Use `z.ipv4()` instead. */
  ipv4(params?: string | core.$ZodCheckIPv4Params): this;
  /** @deprecated Use `z.ipv6()` instead. */
  ipv6(params?: string | core.$ZodCheckIPv6Params): this;
  /** @deprecated Use `z.cidrv4()` instead. */
  cidrv4(params?: string | core.$ZodCheckCIDRv4Params): this;
  /** @deprecated Use `z.cidrv6()` instead. */
  cidrv6(params?: string | core.$ZodCheckCIDRv6Params): this;
  /** @deprecated Use `z.e164()` instead. */
  e164(params?: string | core.$ZodCheckE164Params): this;

  // ISO 8601 checks
  /** @deprecated Use `z.iso.datetime()` instead. */
  datetime(params?: string | core.$ZodCheckISODateTimeParams): this;
  /** @deprecated Use `z.iso.date()` instead. */
  date(params?: string | core.$ZodCheckISODateParams): this;
  /** @deprecated Use `z.iso.time()` instead. */
  time(
    params?:
      | string
      // | {
      //     message?: string | undefined;
      //     precision?: number | null;
      //   }
      | core.$ZodCheckISOTimeParams
  ): this;
  /** @deprecated Use `z.iso.duration()` instead. */
  duration(params?: string | core.$ZodCheckISODurationParams): this;
}

export const ZodString: core.$constructor<ZodString> = /*@__PURE__*/ core.$constructor("ZodString", (inst, def) => {
  core.$ZodString.init(inst, def);
  _ZodString.init(inst, def);

  inst.email = (params) => inst.check(core._email(ZodEmail, params));
  inst.url = (params) => inst.check(core._url(ZodURL, params));
  inst.jwt = (params) => inst.check(core._jwt(ZodJWT, params));
  inst.emoji = (params) => inst.check(core._emoji(ZodEmoji, params));
  inst.guid = (params) => inst.check(core._guid(ZodGUID, params));
  inst.uuid = (params) => inst.check(core._uuid(ZodUUID, params));
  inst.uuidv4 = (params) => inst.check(core._uuidv4(ZodUUID, params));
  inst.uuidv6 = (params) => inst.check(core._uuidv6(ZodUUID, params));
  inst.uuidv7 = (params) => inst.check(core._uuidv7(ZodUUID, params));
  inst.nanoid = (params) => inst.check(core._nanoid(ZodNanoID, params));
  inst.guid = (params) => inst.check(core._guid(ZodGUID, params));
  inst.cuid = (params) => inst.check(core._cuid(ZodCUID, params));
  inst.cuid2 = (params) => inst.check(core._cuid2(ZodCUID2, params));
  inst.ulid = (params) => inst.check(core._ulid(ZodULID, params));
  inst.base64 = (params) => inst.check(core._base64(ZodBase64, params));
  inst.base64url = (params) => inst.check(core._base64url(ZodBase64URL, params));
  inst.xid = (params) => inst.check(core._xid(ZodXID, params));
  inst.ksuid = (params) => inst.check(core._ksuid(ZodKSUID, params));
  inst.ipv4 = (params) => inst.check(core._ipv4(ZodIPv4, params));
  inst.ipv6 = (params) => inst.check(core._ipv6(ZodIPv6, params));
  inst.cidrv4 = (params) => inst.check(core._cidrv4(ZodCIDRv4, params));
  inst.cidrv6 = (params) => inst.check(core._cidrv6(ZodCIDRv6, params));
  inst.e164 = (params) => inst.check(core._e164(ZodE164, params));

  // iso
  inst.datetime = (params) => inst.check(iso.datetime(params as any));
  inst.date = (params) => inst.check(iso.date(params as any));
  inst.time = (params) => inst.check(iso.time(params as any));
  inst.duration = (params) => inst.check(iso.duration(params as any));
});

export function string(params?: string | core.$ZodStringParams): ZodString;
export function string<T extends string>(params?: string | core.$ZodStringParams): core.$ZodType<T, T>;
export function string(params?: string | core.$ZodStringParams): ZodString {
  return core._string(ZodString, params);
}

// ZodStringFormat
export interface ZodStringFormat<Format extends string = string>
  extends _ZodString<core.$ZodStringFormatInternals<Format>> {}
export const ZodStringFormat: core.$constructor<ZodStringFormat> = /*@__PURE__*/ core.$constructor(
  "ZodStringFormat",
  (inst, def) => {
    core.$ZodStringFormat.init(inst, def);
    _ZodString.init(inst, def);
  }
);

// ZodEmail
export interface ZodEmail extends ZodStringFormat<"email"> {
  _zod: core.$ZodEmailInternals;
}
export const ZodEmail: core.$constructor<ZodEmail> = /*@__PURE__*/ core.$constructor("ZodEmail", (inst, def) => {
  // ZodStringFormat.init(inst, def);
  core.$ZodEmail.init(inst, def);
  ZodStringFormat.init(inst, def);
});

export function email(params?: string | core.$ZodEmailParams): ZodEmail {
  return core._email(ZodEmail, params);
}

// ZodGUID
export interface ZodGUID extends ZodStringFormat<"guid"> {
  _zod: core.$ZodGUIDInternals;
}
export const ZodGUID: core.$constructor<ZodGUID> = /*@__PURE__*/ core.$constructor("ZodGUID", (inst, def) => {
  // ZodStringFormat.init(inst, def);
  core.$ZodGUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});

export function guid(params?: string | core.$ZodGUIDParams): ZodGUID {
  return core._guid(ZodGUID, params);
}

// ZodUUID
export interface ZodUUID extends ZodStringFormat<"uuid"> {
  _zod: core.$ZodUUIDInternals;
}
export const ZodUUID: core.$constructor<ZodUUID> = /*@__PURE__*/ core.$constructor("ZodUUID", (inst, def) => {
  // ZodStringFormat.init(inst, def);
  core.$ZodUUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});

export function uuid(params?: string | core.$ZodUUIDParams): ZodUUID {
  return core._uuid(ZodUUID, params);
}

export function uuidv4(params?: string | core.$ZodUUIDv4Params): ZodUUID {
  return core._uuidv4(ZodUUID, params);
}

// ZodUUIDv6

export function uuidv6(params?: string | core.$ZodUUIDv6Params): ZodUUID {
  return core._uuidv6(ZodUUID, params);
}

// ZodUUIDv7

export function uuidv7(params?: string | core.$ZodUUIDv7Params): ZodUUID {
  return core._uuidv7(ZodUUID, params);
}

// ZodURL
export interface ZodURL extends ZodStringFormat<"url"> {
  _zod: core.$ZodURLInternals;
}
export const ZodURL: core.$constructor<ZodURL> = /*@__PURE__*/ core.$constructor("ZodURL", (inst, def) => {
  // ZodStringFormat.init(inst, def);
  core.$ZodURL.init(inst, def);
  ZodStringFormat.init(inst, def);
});

export function url(params?: string | core.$ZodURLParams): ZodURL {
  return core._url(ZodURL, params);
}

export function httpUrl(params?: string | Omit<core.$ZodURLParams, "protocol" | "hostname">): ZodURL {
  return core._url(ZodURL, {
    protocol: core.regexes.httpProtocol,
    hostname: core.regexes.domain,
    ...util.normalizeParams(params),
  });
}

// ZodEmoji
export interface ZodEmoji extends ZodStringFormat<"emoji"> {
  _zod: core.$ZodEmojiInternals;
}
export const ZodEmoji: core.$constructor<ZodEmoji> = /*@__PURE__*/ core.$constructor("ZodEmoji", (inst, def) => {
  // ZodStringFormat.init(inst, def);
  core.$ZodEmoji.init(inst, def);
  ZodStringFormat.init(inst, def);
});

export function emoji(params?: string | core.$ZodEmojiParams): ZodEmoji {
  return core._emoji(ZodEmoji, params);
}

// ZodNanoID
export interface ZodNanoID extends ZodStringFormat<"nanoid"> {
  _zod: core.$ZodNanoIDInternals;
}
export const ZodNanoID: core.$constructor<ZodNanoID> = /*@__PURE__*/ core.$constructor("ZodNanoID", (inst, def) => {
  // ZodStringFormat.init(inst, def);
  core.$ZodNanoID.init(inst, def);
  ZodStringFormat.init(inst, def);
});

export function nanoid(params?: string | core.$ZodNanoIDParams): ZodNanoID {
  return core._nanoid(ZodNanoID, params);
}

// ZodCUID
/**
 * @deprecated CUID v1 is deprecated by its authors due to information leakage
 * (timestamps embedded in the id). Use {@link ZodCUID2} instead.
 * See https://github.com/paralleldrive/cuid.
 */
export interface ZodCUID extends ZodStringFormat<"cuid"> {
  _zod: core.$ZodCUIDInternals;
}
/**
 * @deprecated CUID v1 is deprecated by its authors due to information leakage
 * (timestamps embedded in the id). Use {@link ZodCUID2} instead.
 * See https://github.com/paralleldrive/cuid.
 */
export const ZodCUID: core.$constructor<ZodCUID> = /*@__PURE__*/ core.$constructor("ZodCUID", (inst, def) => {
  // ZodStringFormat.init(inst, def);
  core.$ZodCUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});

/**
 * Validates a CUID v1 string.
 *
 * @deprecated CUID v1 is deprecated by its authors due to information leakage
 * (timestamps embedded in the id). Use {@link cuid2 | `z.cuid2()`} instead.
 * See https://github.com/paralleldrive/cuid.
 */
export function cuid(params?: string | core.$ZodCUIDParams): ZodCUID {
  return core._cuid(ZodCUID, params);
}

// ZodCUID2
export interface ZodCUID2 extends ZodStringFormat<"cuid2"> {
  _zod: core.$ZodCUID2Internals;
}
export const ZodCUID2: core.$constructor<ZodCUID2> = /*@__PURE__*/ core.$constructor("ZodCUID2", (inst, def) => {
  // ZodStringFormat.init(inst, def);
  core.$ZodCUID2.init(inst, def);
  ZodStringFormat.init(inst, def);
});

export function cuid2(params?: string | core.$ZodCUID2Params): ZodCUID2 {
  return core._cuid2(ZodCUID2, params);
}

// ZodULID
export interface ZodULID extends ZodStringFormat<"ulid"> {
  _zod: core.$ZodULIDInternals;
}
export const ZodULID: core.$constructor<ZodULID> = /*@__PURE__*/ core.$constructor("ZodULID", (inst, def) => {
  // ZodStringFormat.init(inst, def);
  core.$ZodULID.init(inst, def);
  ZodStringFormat.init(inst, def);
});

export function ulid(params?: string | core.$ZodULIDParams): ZodULID {
  return core._ulid(ZodULID, params);
}

// ZodXID
export interface ZodXID extends ZodStringFormat<"xid"> {
  _zod: core.$ZodXIDInternals;
}
export const ZodXID: core.$constructor<ZodXID> = /*@__PURE__*/ core.$constructor("ZodXID", (inst, def) => {
  // ZodStringFormat.init(inst, def);
  core.$ZodXID.init(inst, def);
  ZodStringFormat.init(inst, def);
});

export function xid(params?: string | core.$ZodXIDParams): ZodXID {
  return core._xid(ZodXID, params);
}

// ZodKSUID
export interface ZodKSUID extends ZodStringFormat<"ksuid"> {
  _zod: core.$ZodKSUIDInternals;
}
export const ZodKSUID: core.$constructor<ZodKSUID> = /*@__PURE__*/ core.$constructor("ZodKSUID", (inst, def) => {
  // ZodStringFormat.init(inst, def);
  core.$ZodKSUID.init(inst, def);
  ZodStringFormat.init(inst, def);
});

export function ksuid(params?: string | core.$ZodKSUIDParams): ZodKSUID {
  return core._ksuid(ZodKSUID, params);
}

// ZodIP
// export interface ZodIP extends ZodStringFormat<"ip"> {
//   _zod: core.$ZodIPInternals;
// }
// export const ZodIP: core.$constructor<ZodIP> = /*@__PURE__*/ core.$constructor("ZodIP", (inst, def) => {
//   // ZodStringFormat.init(inst, def);
//   core.$ZodIP.init(inst, def);
//   ZodStringFormat.init(inst, def);
// });

// export function ip(params?: string | core.$ZodIPParams): ZodIP {
//   return core._ip(ZodIP, params);
// }

// ZodIPv4
export interface ZodIPv4 extends ZodStringFormat<"ipv4"> {
  _zod: core.$ZodIPv4Internals;
}
export const ZodIPv4: core.$constructor<ZodIPv4> = /*@__PURE__*/ core.$constructor("ZodIPv4", (inst, def) => {
  // ZodStringFormat.init(inst, def);
  core.$ZodIPv4.init(inst, def);
  ZodStringFormat.init(inst, def);
});

export function ipv4(params?: string | core.$ZodIPv4Params): ZodIPv4 {
  return core._ipv4(ZodIPv4, params);
}

// ZodMAC
export interface ZodMAC extends ZodStringFormat<"mac"> {
  _zod: core.$ZodMACInternals;
}
export const ZodMAC: core.$constructor<ZodMAC> = /*@__PURE__*/ core.$constructor("ZodMAC", (inst, def) => {
  // ZodStringFormat.init(inst, def);
  core.$ZodMAC.init(inst, def);
  ZodStringFormat.init(inst, def);
});
export function mac(params?: string | core.$ZodMACParams): ZodMAC {
  return core._mac(ZodMAC, params);
}

// ZodIPv6
export interface ZodIPv6 extends ZodStringFormat<"ipv6"> {
  _zod: core.$ZodIPv6Internals;
}
export const ZodIPv6: core.$constructor<ZodIPv6> = /*@__PURE__*/ core.$constructor("ZodIPv6", (inst, def) => {
  // ZodStringFormat.init(inst, def);
  core.$ZodIPv6.init(inst, def);
  ZodStringFormat.init(inst, def);
});
export function ipv6(params?: string | core.$ZodIPv6Params): ZodIPv6 {
  return core._ipv6(ZodIPv6, params);
}

// ZodCIDRv4
export interface ZodCIDRv4 extends ZodStringFormat<"cidrv4"> {
  _zod: core.$ZodCIDRv4Internals;
}
export const ZodCIDRv4: core.$constructor<ZodCIDRv4> = /*@__PURE__*/ core.$constructor("ZodCIDRv4", (inst, def) => {
  core.$ZodCIDRv4.init(inst, def);
  ZodStringFormat.init(inst, def);
});

export function cidrv4(params?: string | core.$ZodCIDRv4Params): ZodCIDRv4 {
  return core._cidrv4(ZodCIDRv4, params);
}

// ZodCIDRv6
export interface ZodCIDRv6 extends ZodStringFormat<"cidrv6"> {
  _zod: core.$ZodCIDRv6Internals;
}
export const ZodCIDRv6: core.$constructor<ZodCIDRv6> = /*@__PURE__*/ core.$constructor("ZodCIDRv6", (inst, def) => {
  core.$ZodCIDRv6.init(inst, def);
  ZodStringFormat.init(inst, def);
});

export function cidrv6(params?: string | core.$ZodCIDRv6Params): ZodCIDRv6 {
  return core._cidrv6(ZodCIDRv6, params);
}

// ZodBase64
export interface ZodBase64 extends ZodStringFormat<"base64"> {
  _zod: core.$ZodBase64Internals;
}
export const ZodBase64: core.$constructor<ZodBase64> = /*@__PURE__*/ core.$constructor("ZodBase64", (inst, def) => {
  // ZodStringFormat.init(inst, def);
  core.$ZodBase64.init(inst, def);
  ZodStringFormat.init(inst, def);
});
export function base64(params?: string | core.$ZodBase64Params): ZodBase64 {
  return core._base64(ZodBase64, params);
}

// ZodBase64URL
export interface ZodBase64URL extends ZodStringFormat<"base64url"> {
  _zod: core.$ZodBase64URLInternals;
}
export const ZodBase64URL: core.$constructor<ZodBase64URL> = /*@__PURE__*/ core.$constructor(
  "ZodBase64URL",
  (inst, def) => {
    // ZodStringFormat.init(inst, def);
    core.$ZodBase64URL.init(inst, def);
    ZodStringFormat.init(inst, def);
  }
);
export function base64url(params?: string | core.$ZodBase64URLParams): ZodBase64URL {
  return core._base64url(ZodBase64URL, params);
}

// ZodE164
export interface ZodE164 extends ZodStringFormat<"e164"> {
  _zod: core.$ZodE164Internals;
}
export const ZodE164: core.$constructor<ZodE164> = /*@__PURE__*/ core.$constructor("ZodE164", (inst, def) => {
  // ZodStringFormat.init(inst, def);
  core.$ZodE164.init(inst, def);
  ZodStringFormat.init(inst, def);
});

export function e164(params?: string | core.$ZodE164Params): ZodE164 {
  return core._e164(ZodE164, params);
}

// ZodJWT
export interface ZodJWT extends ZodStringFormat<"jwt"> {
  _zod: core.$ZodJWTInternals;
}
export const ZodJWT: core.$constructor<ZodJWT> = /*@__PURE__*/ core.$constructor("ZodJWT", (inst, def) => {
  // ZodStringFormat.init(inst, def);
  core.$ZodJWT.init(inst, def);
  ZodStringFormat.init(inst, def);
});

export function jwt(params?: string | core.$ZodJWTParams): ZodJWT {
  return core._jwt(ZodJWT, params);
}

// ZodCustomStringFormat
export interface ZodCustomStringFormat<Format extends string = string>
  extends ZodStringFormat<Format>,
    core.$ZodCustomStringFormat<Format> {
  _zod: core.$ZodCustomStringFormatInternals<Format>;
  "~standard": ZodStandardSchemaWithJSON<this>;
}
export const ZodCustomStringFormat: core.$constructor<ZodCustomStringFormat> = /*@__PURE__*/ core.$constructor(
  "ZodCustomStringFormat",
  (inst, def) => {
    // ZodStringFormat.init(inst, def);
    core.$ZodCustomStringFormat.init(inst, def);
    ZodStringFormat.init(inst, def);
  }
);
export function stringFormat<Format extends string>(
  format: Format,
  fnOrRegex: ((arg: string) => util.MaybeAsync<unknown>) | RegExp,
  _params: string | core.$ZodStringFormatParams = {}
): ZodCustomStringFormat<Format> {
  return core._stringFormat(ZodCustomStringFormat, format, fnOrRegex, _params) as any;
}

export function hostname(_params?: string | core.$ZodStringFormatParams): ZodCustomStringFormat<"hostname"> {
  return core._stringFormat(ZodCustomStringFormat, "hostname", core.regexes.hostname, _params) as any;
}

export function hex(_params?: string | core.$ZodStringFormatParams): ZodCustomStringFormat<"hex"> {
  return core._stringFormat(ZodCustomStringFormat, "hex", core.regexes.hex, _params) as any;
}

export function hash<Alg extends util.HashAlgorithm, Enc extends util.HashEncoding = "hex">(
  alg: Alg,
  params?: {
    enc?: Enc;
  } & core.$ZodStringFormatParams
): ZodCustomStringFormat<`${Alg}_${Enc}`> {
  const enc = params?.enc ?? "hex";
  const format = `${alg}_${enc}` as const;
  const regex = core.regexes[format as keyof typeof core.regexes] as RegExp;
  if (!regex) throw new Error(`Unrecognized hash format: ${format}`);
  return core._stringFormat(ZodCustomStringFormat, format, regex, params) as any;
}

// ZodNumber
export interface _ZodNumber<Internals extends core.$ZodNumberInternals = core.$ZodNumberInternals>
  extends _ZodType<Internals> {
  gt(value: number, params?: string | core.$ZodCheckGreaterThanParams): this;
  /** Identical to .min() */
  gte(value: number, params?: string | core.$ZodCheckGreaterThanParams): this;
  min(value: number, params?: string | core.$ZodCheckGreaterThanParams): this;
  lt(value: number, params?: string | core.$ZodCheckLessThanParams): this;
  /** Identical to .max() */
  lte(value: number, params?: string | core.$ZodCheckLessThanParams): this;
  max(value: number, params?: string | core.$ZodCheckLessThanParams): this;
  /** Consider `z.int()` instead. This API is considered *legacy*; it will never be removed but a better alternative exists. */
  int(params?: string | core.$ZodCheckNumberFormatParams): this;
  /** @deprecated This is now identical to `.int()`. Only numbers in the safe integer range are accepted. */
  safe(params?: string | core.$ZodCheckNumberFormatParams): this;
  positive(params?: string | core.$ZodCheckGreaterThanParams): this;
  nonnegative(params?: string | core.$ZodCheckGreaterThanParams): this;
  negative(params?: string | core.$ZodCheckLessThanParams): this;
  nonpositive(params?: string | core.$ZodCheckLessThanParams): this;
  multipleOf(value: number, params?: string | core.$ZodCheckMultipleOfParams): this;
  /** @deprecated Use `.multipleOf()` instead. */
  step(value: number, params?: string | core.$ZodCheckMultipleOfParams): this;

  /** @deprecated In v4 and later, z.number() does not allow infinite values by default. This is a no-op. */
  finite(params?: unknown): this;

  minValue: number | null;
  maxValue: number | null;
  /** @deprecated Check the `format` property instead.  */
  isInt: boolean;
  /** @deprecated Number schemas no longer accept infinite values, so this always returns `true`. */
  isFinite: boolean;
  format: string | null;
}

export interface ZodNumber extends _ZodNumber<core.$ZodNumberInternals<number>> {}

export const ZodNumber: core.$constructor<ZodNumber> = /*@__PURE__*/ core.$constructor("ZodNumber", (inst, def) => {
  core.$ZodNumber.init(inst, def);

  ZodType.init(inst, def);

  inst._zod.processJSONSchema = (ctx, json, params) => processors.numberProcessor(inst, ctx, json, params);

  _installLazyMethods(inst, "ZodNumber", {
    gt(value, params) {
      return this.check(checks.gt(value, params));
    },
    gte(value, params) {
      return this.check(checks.gte(value, params));
    },
    min(value, params) {
      return this.check(checks.gte(value, params));
    },
    lt(value, params) {
      return this.check(checks.lt(value, params));
    },
    lte(value, params) {
      return this.check(checks.lte(value, params));
    },
    max(value, params) {
      return this.check(checks.lte(value, params));
    },
    int(params) {
      return this.check(int(params));
    },
    safe(params) {
      return this.check(int(params));
    },
    positive(params) {
      return this.check(checks.gt(0, params));
    },
    nonnegative(params) {
      return this.check(checks.gte(0, params));
    },
    negative(params) {
      return this.check(checks.lt(0, params));
    },
    nonpositive(params) {
      return this.check(checks.lte(0, params));
    },
    multipleOf(value, params) {
      return this.check(checks.multipleOf(value, params));
    },
    step(value, params) {
      return this.check(checks.multipleOf(value, params));
    },
    finite() {
      return this;
    },
  });

  const bag = inst._zod.bag;
  inst.minValue =
    Math.max(bag.minimum ?? Number.NEGATIVE_INFINITY, bag.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null;
  inst.maxValue =
    Math.min(bag.maximum ?? Number.POSITIVE_INFINITY, bag.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null;
  inst.isInt = (bag.format ?? "").includes("int") || Number.isSafeInteger(bag.multipleOf ?? 0.5);
  inst.isFinite = true;
  inst.format = bag.format ?? null;
});

export function number(params?: string | core.$ZodNumberParams): ZodNumber {
  return core._number(ZodNumber, params);
}

// ZodNumberFormat
export interface ZodNumberFormat extends ZodNumber {
  _zod: core.$ZodNumberFormatInternals;
}
export const ZodNumberFormat: core.$constructor<ZodNumberFormat> = /*@__PURE__*/ core.$constructor(
  "ZodNumberFormat",
  (inst, def) => {
    core.$ZodNumberFormat.init(inst, def);
    ZodNumber.init(inst, def);
  }
);

// int
export interface ZodInt extends ZodNumberFormat {}
export function int(params?: string | core.$ZodCheckNumberFormatParams): ZodInt {
  return core._int(ZodNumberFormat, params);
}

// float32
export interface ZodFloat32 extends ZodNumberFormat {}
export function float32(params?: string | core.$ZodCheckNumberFormatParams): ZodFloat32 {
  return core._float32(ZodNumberFormat, params);
}

// float64
export interface ZodFloat64 extends ZodNumberFormat {}
export function float64(params?: string | core.$ZodCheckNumberFormatParams): ZodFloat64 {
  return core._float64(ZodNumberFormat, params);
}

// int32
export interface ZodInt32 extends ZodNumberFormat {}
export function int32(params?: string | core.$ZodCheckNumberFormatParams): ZodInt32 {
  return core._int32(ZodNumberFormat, params);
}

// uint32
export interface ZodUInt32 extends ZodNumberFormat {}
export function uint32(params?: string | core.$ZodCheckNumberFormatParams): ZodUInt32 {
  return core._uint32(ZodNumberFormat, params);
}

// boolean
export interface _ZodBoolean<T extends core.$ZodBooleanInternals = core.$ZodBooleanInternals> extends _ZodType<T> {}
export interface ZodBoolean extends _ZodBoolean<core.$ZodBooleanInternals<boolean>> {}
export const ZodBoolean: core.$constructor<ZodBoolean> = /*@__PURE__*/ core.$constructor("ZodBoolean", (inst, def) => {
  core.$ZodBoolean.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => processors.booleanProcessor(inst, ctx, json, params);
});

export function boolean(params?: string | core.$ZodBooleanParams): ZodBoolean {
  return core._boolean(ZodBoolean, params);
}

// bigint
export interface _ZodBigInt<T extends core.$ZodBigIntInternals = core.$ZodBigIntInternals> extends _ZodType<T> {
  gte(value: bigint, params?: string | core.$ZodCheckGreaterThanParams): this;
  /** Alias of `.gte()` */
  min(value: bigint, params?: string | core.$ZodCheckGreaterThanParams): this;
  gt(value: bigint, params?: string | core.$ZodCheckGreaterThanParams): this;
  /** Alias of `.lte()` */
  lte(value: bigint, params?: string | core.$ZodCheckLessThanParams): this;
  max(value: bigint, params?: string | core.$ZodCheckLessThanParams): this;
  lt(value: bigint, params?: string | core.$ZodCheckLessThanParams): this;
  positive(params?: string | core.$ZodCheckGreaterThanParams): this;
  negative(params?: string | core.$ZodCheckLessThanParams): this;
  nonpositive(params?: string | core.$ZodCheckLessThanParams): this;
  nonnegative(params?: string | core.$ZodCheckGreaterThanParams): this;
  multipleOf(value: bigint, params?: string | core.$ZodCheckMultipleOfParams): this;

  minValue: bigint | null;
  maxValue: bigint | null;
  format: string | null;
}

export interface ZodBigInt extends _ZodBigInt<core.$ZodBigIntInternals<bigint>> {}
export const ZodBigInt: core.$constructor<ZodBigInt> = /*@__PURE__*/ core.$constructor("ZodBigInt", (inst, def) => {
  core.$ZodBigInt.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => processors.bigintProcessor(inst, ctx, json, params);

  inst.gte = (value, params) => inst.check(checks.gte(value, params));
  inst.min = (value, params) => inst.check(checks.gte(value, params));
  inst.gt = (value, params) => inst.check(checks.gt(value, params));
  inst.gte = (value, params) => inst.check(checks.gte(value, params));
  inst.min = (value, params) => inst.check(checks.gte(value, params));
  inst.lt = (value, params) => inst.check(checks.lt(value, params));
  inst.lte = (value, params) => inst.check(checks.lte(value, params));
  inst.max = (value, params) => inst.check(checks.lte(value, params));
  inst.positive = (params) => inst.check(checks.gt(BigInt(0), params));
  inst.negative = (params) => inst.check(checks.lt(BigInt(0), params));
  inst.nonpositive = (params) => inst.check(checks.lte(BigInt(0), params));
  inst.nonnegative = (params) => inst.check(checks.gte(BigInt(0), params));
  inst.multipleOf = (value, params) => inst.check(checks.multipleOf(value, params));

  const bag = inst._zod.bag;
  inst.minValue = bag.minimum ?? null;
  inst.maxValue = bag.maximum ?? null;
  inst.format = bag.format ?? null;
});

export function bigint(params?: string | core.$ZodBigIntParams): ZodBigInt {
  return core._bigint(ZodBigInt, params);
}
// bigint formats

// ZodBigIntFormat
export interface ZodBigIntFormat extends ZodBigInt {
  _zod: core.$ZodBigIntFormatInternals;
}
export const ZodBigIntFormat: core.$constructor<ZodBigIntFormat> = /*@__PURE__*/ core.$constructor(
  "ZodBigIntFormat",
  (inst, def) => {
    core.$ZodBigIntFormat.init(inst, def);
    ZodBigInt.init(inst, def);
  }
);

// int64
export function int64(params?: string | core.$ZodBigIntFormatParams): ZodBigIntFormat {
  return core._int64(ZodBigIntFormat, params);
}

// uint64
export function uint64(params?: string | core.$ZodBigIntFormatParams): ZodBigIntFormat {
  return core._uint64(ZodBigIntFormat, params);
}

// symbol
export interface ZodSymbol extends _ZodType<core.$ZodSymbolInternals> {}
export const ZodSymbol: core.$constructor<ZodSymbol> = /*@__PURE__*/ core.$constructor("ZodSymbol", (inst, def) => {
  core.$ZodSymbol.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => processors.symbolProcessor(inst, ctx, json, params);
});

export function symbol(params?: string | core.$ZodSymbolParams): ZodSymbol {
  return core._symbol(ZodSymbol, params);
}

// ZodUndefined
export interface ZodUndefined extends _ZodType<core.$ZodUndefinedInternals> {}
export const ZodUndefined: core.$constructor<ZodUndefined> = /*@__PURE__*/ core.$constructor(
  "ZodUndefined",
  (inst, def) => {
    core.$ZodUndefined.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.undefinedProcessor(inst, ctx, json, params);
  }
);

function _undefined(params?: string | core.$ZodUndefinedParams): ZodUndefined {
  return core._undefined(ZodUndefined, params);
}
export { _undefined as undefined };

// ZodNull
export interface ZodNull extends _ZodType<core.$ZodNullInternals> {}
export const ZodNull: core.$constructor<ZodNull> = /*@__PURE__*/ core.$constructor("ZodNull", (inst, def) => {
  core.$ZodNull.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => processors.nullProcessor(inst, ctx, json, params);
});

function _null(params?: string | core.$ZodNullParams): ZodNull {
  return core._null(ZodNull, params);
}
export { _null as null };

// ZodAny
export interface ZodAny extends _ZodType<core.$ZodAnyInternals> {}
export const ZodAny: core.$constructor<ZodAny> = /*@__PURE__*/ core.$constructor("ZodAny", (inst, def) => {
  core.$ZodAny.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => processors.anyProcessor(inst, ctx, json, params);
});

export function any(): ZodAny {
  return core._any(ZodAny);
}

// ZodUnknown
export interface ZodUnknown extends _ZodType<core.$ZodUnknownInternals> {}
export const ZodUnknown: core.$constructor<ZodUnknown> = /*@__PURE__*/ core.$constructor("ZodUnknown", (inst, def) => {
  core.$ZodUnknown.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => processors.unknownProcessor(inst, ctx, json, params);
});

export function unknown(): ZodUnknown {
  return core._unknown(ZodUnknown);
}

// ZodNever
export interface ZodNever extends _ZodType<core.$ZodNeverInternals> {}
export const ZodNever: core.$constructor<ZodNever> = /*@__PURE__*/ core.$constructor("ZodNever", (inst, def) => {
  core.$ZodNever.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => processors.neverProcessor(inst, ctx, json, params);
});

export function never(params?: string | core.$ZodNeverParams): ZodNever {
  return core._never(ZodNever, params);
}

// ZodVoid
export interface ZodVoid extends _ZodType<core.$ZodVoidInternals> {}
export const ZodVoid: core.$constructor<ZodVoid> = /*@__PURE__*/ core.$constructor("ZodVoid", (inst, def) => {
  core.$ZodVoid.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => processors.voidProcessor(inst, ctx, json, params);
});

function _void(params?: string | core.$ZodVoidParams): ZodVoid {
  return core._void(ZodVoid, params);
}
export { _void as void };

// ZodDate
export interface _ZodDate<T extends core.$ZodDateInternals = core.$ZodDateInternals> extends _ZodType<T> {
  min(value: number | Date, params?: string | core.$ZodCheckGreaterThanParams): this;
  max(value: number | Date, params?: string | core.$ZodCheckLessThanParams): this;

  /** @deprecated Not recommended. */
  minDate: Date | null;
  /** @deprecated Not recommended. */
  maxDate: Date | null;
}

export interface ZodDate extends _ZodDate<core.$ZodDateInternals<Date>> {}
export const ZodDate: core.$constructor<ZodDate> = /*@__PURE__*/ core.$constructor("ZodDate", (inst, def) => {
  core.$ZodDate.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => processors.dateProcessor(inst, ctx, json, params);

  inst.min = (value, params) => inst.check(checks.gte(value, params));
  inst.max = (value, params) => inst.check(checks.lte(value, params));

  const c = inst._zod.bag;
  inst.minDate = c.minimum ? new Date(c.minimum) : null;
  inst.maxDate = c.maximum ? new Date(c.maximum) : null;
});

export function date(params?: string | core.$ZodDateParams): ZodDate {
  return core._date(ZodDate, params);
}

// ZodArray
export interface ZodArray<T extends core.SomeType = core.$ZodType>
  extends _ZodType<core.$ZodArrayInternals<T>>,
    core.$ZodArray<T> {
  element: T;
  min(minLength: number, params?: string | core.$ZodCheckMinLengthParams): this;
  nonempty(params?: string | core.$ZodCheckMinLengthParams): this;
  max(maxLength: number, params?: string | core.$ZodCheckMaxLengthParams): this;
  length(len: number, params?: string | core.$ZodCheckLengthEqualsParams): this;

  unwrap(): T;
  "~standard": ZodStandardSchemaWithJSON<this>;
}
export const ZodArray: core.$constructor<ZodArray> = /*@__PURE__*/ core.$constructor("ZodArray", (inst, def) => {
  core.$ZodArray.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => processors.arrayProcessor(inst, ctx, json, params);

  inst.element = def.element;
  _installLazyMethods(inst, "ZodArray", {
    min(n, params) {
      return this.check(checks.minLength(n, params));
    },
    nonempty(params) {
      return this.check(checks.minLength(1, params));
    },
    max(n, params) {
      return this.check(checks.maxLength(n, params));
    },
    length(n, params) {
      return this.check(checks.length(n, params));
    },
    unwrap() {
      return this.element;
    },
  });
});

export function array<T extends core.SomeType>(element: T, params?: string | core.$ZodArrayParams): ZodArray<T> {
  return core._array(ZodArray, element as any, params) as any;
}

// .keyof
export function keyof<T extends ZodObject>(schema: T): ZodEnum<util.KeysEnum<T["_zod"]["output"]>> {
  const shape = schema._zod.def.shape;
  return _enum(Object.keys(shape)) as any;
}

// ZodObject

export type SafeExtendShape<Base extends core.$ZodShape, Ext extends core.$ZodLooseShape> = {
  [K in keyof Ext]: K extends keyof Base
    ? core.output<Ext[K]> extends core.output<Base[K]>
      ? core.input<Ext[K]> extends core.input<Base[K]>
        ? Ext[K]
        : never
      : never
    : Ext[K];
};

export interface ZodObject<
  /** @ts-ignore Cast variance */
  out Shape extends core.$ZodShape = core.$ZodLooseShape,
  out Config extends core.$ZodObjectConfig = core.$strip,
> extends _ZodType<core.$ZodObjectInternals<Shape, Config>>,
    core.$ZodObject<Shape, Config> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  shape: Shape;

  keyof(): ZodEnum<util.ToEnum<keyof Shape & string>>;
  /** Define a schema to validate all unrecognized keys. This overrides the existing strict/loose behavior. */
  catchall<T extends core.SomeType>(schema: T): ZodObject<Shape, core.$catchall<T>>;

  /** @deprecated Use `z.looseObject()` or `.loose()` instead. */
  passthrough(): ZodObject<Shape, core.$loose>;
  /** Consider `z.looseObject(A.shape)` instead */
  loose(): ZodObject<Shape, core.$loose>;

  /** Consider `z.strictObject(A.shape)` instead */
  strict(): ZodObject<Shape, core.$strict>;

  /** This is the default behavior. This method call is likely unnecessary. */
  strip(): ZodObject<Shape, core.$strip>;

  extend<U extends core.$ZodLooseShape>(shape: U): ZodObject<util.Extend<Shape, util.Writeable<U>>, Config>;

  safeExtend<U extends core.$ZodLooseShape>(
    shape: SafeExtendShape<Shape, U> & Partial<Record<keyof Shape, core.SomeType>>
  ): ZodObject<util.Extend<Shape, util.Writeable<U>>, Config>;

  /**
   * @deprecated Use [`A.extend(B.shape)`](https://zod.dev/api?id=extend) instead.
   */
  merge<U extends ZodObject>(other: U): ZodObject<util.Extend<Shape, U["shape"]>, U["_zod"]["config"]>;

  pick<M extends util.Mask<keyof Shape>>(
    mask: M & Record<Exclude<keyof M, keyof Shape>, never>
  ): ZodObject<util.Flatten<Pick<Shape, Extract<keyof Shape, keyof M>>>, Config>;

  omit<M extends util.Mask<keyof Shape>>(
    mask: M & Record<Exclude<keyof M, keyof Shape>, never>
  ): ZodObject<util.Flatten<Omit<Shape, Extract<keyof Shape, keyof M>>>, Config>;

  partial(): ZodObject<
    {
      -readonly [k in keyof Shape]: ZodOptional<Shape[k]>;
    },
    Config
  >;
  partial<M extends util.Mask<keyof Shape>>(
    mask: M & Record<Exclude<keyof M, keyof Shape>, never>
  ): ZodObject<
    {
      -readonly [k in keyof Shape]: k extends keyof M
        ? // Shape[k] extends OptionalInSchema
          //   ? Shape[k]
          //   :
          ZodOptional<Shape[k]>
        : Shape[k];
    },
    Config
  >;

  // required
  required(): ZodObject<
    {
      -readonly [k in keyof Shape]: ZodNonOptional<Shape[k]>;
    },
    Config
  >;
  required<M extends util.Mask<keyof Shape>>(
    mask: M & Record<Exclude<keyof M, keyof Shape>, never>
  ): ZodObject<
    {
      -readonly [k in keyof Shape]: k extends keyof M ? ZodNonOptional<Shape[k]> : Shape[k];
    },
    Config
  >;
}

export const ZodObject: core.$constructor<ZodObject> = /*@__PURE__*/ core.$constructor("ZodObject", (inst, def) => {
  core.$ZodObjectJIT.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => processors.objectProcessor(inst, ctx, json, params);

  util.defineLazy(inst, "shape", () => {
    return def.shape;
  });

  _installLazyMethods(inst, "ZodObject", {
    keyof() {
      return _enum(Object.keys(this._zod.def.shape));
    },
    catchall(catchall) {
      return this.clone({ ...this._zod.def, catchall: catchall as any });
    },
    passthrough() {
      return this.clone({ ...this._zod.def, catchall: unknown() });
    },
    loose() {
      return this.clone({ ...this._zod.def, catchall: unknown() });
    },
    strict() {
      return this.clone({ ...this._zod.def, catchall: never() });
    },
    strip() {
      return this.clone({ ...this._zod.def, catchall: undefined });
    },
    extend(incoming) {
      return util.extend(this, incoming);
    },
    safeExtend(incoming) {
      return util.safeExtend(this, incoming);
    },
    merge(other) {
      return util.merge(this, other);
    },
    pick(mask) {
      return util.pick(this, mask);
    },
    omit(mask) {
      return util.omit(this, mask);
    },
    partial(...args) {
      return util.partial(ZodOptional, this, args[0]);
    },
    required(...args) {
      return util.required(ZodNonOptional, this, args[0]);
    },
  });
});

export function object<T extends core.$ZodLooseShape = Partial<Record<never, core.SomeType>>>(
  shape?: T,
  params?: string | core.$ZodObjectParams
): ZodObject<util.Writeable<T>, core.$strip> {
  const def: core.$ZodObjectDef = {
    type: "object",
    shape: shape ?? {},
    ...util.normalizeParams(params),
  };
  return new ZodObject(def) as any;
}

// strictObject

export function strictObject<T extends core.$ZodLooseShape>(
  shape: T,
  params?: string | core.$ZodObjectParams
): ZodObject<util.Writeable<T>, core.$strict> {
  return new ZodObject({
    type: "object",
    shape,
    catchall: never(),
    ...util.normalizeParams(params),
  }) as any;
}

// looseObject

export function looseObject<T extends core.$ZodLooseShape>(
  shape: T,
  params?: string | core.$ZodObjectParams
): ZodObject<util.Writeable<T>, core.$loose> {
  return new ZodObject({
    type: "object",
    shape,
    catchall: unknown(),
    ...util.normalizeParams(params),
  }) as any;
}

// ZodUnion
export interface ZodUnion<T extends readonly core.SomeType[] = readonly core.$ZodType[]>
  extends _ZodType<core.$ZodUnionInternals<T>>,
    core.$ZodUnion<T> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  options: T;
}
export const ZodUnion: core.$constructor<ZodUnion> = /*@__PURE__*/ core.$constructor("ZodUnion", (inst, def) => {
  core.$ZodUnion.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => processors.unionProcessor(inst, ctx, json, params);
  inst.options = def.options;
});

export function union<const T extends readonly core.SomeType[]>(
  options: T,
  params?: string | core.$ZodUnionParams
): ZodUnion<T> {
  return new ZodUnion({
    type: "union",
    options: options as any as core.$ZodType[],
    ...util.normalizeParams(params),
  }) as any;
}

// ZodXor
export interface ZodXor<T extends readonly core.SomeType[] = readonly core.$ZodType[]>
  extends _ZodType<core.$ZodXorInternals<T>>,
    core.$ZodXor<T> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  options: T;
}
export const ZodXor: core.$constructor<ZodXor> = /*@__PURE__*/ core.$constructor("ZodXor", (inst, def) => {
  ZodUnion.init(inst, def);
  core.$ZodXor.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => processors.unionProcessor(inst, ctx, json, params);
  inst.options = def.options;
});

/** Creates an exclusive union (XOR) where exactly one option must match.
 * Unlike regular unions that succeed when any option matches, xor fails if
 * zero or more than one option matches the input. */
export function xor<const T extends readonly core.SomeType[]>(
  options: T,
  params?: string | core.$ZodXorParams
): ZodXor<T> {
  return new ZodXor({
    type: "union",
    options: options as any as core.$ZodType[],
    inclusive: false,
    ...util.normalizeParams(params),
  }) as any;
}

// ZodDiscriminatedUnion
export interface ZodDiscriminatedUnion<
  Options extends readonly core.SomeType[] = readonly core.$ZodType[],
  Disc extends string = string,
> extends ZodUnion<Options>,
    core.$ZodDiscriminatedUnion<Options, Disc> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  _zod: core.$ZodDiscriminatedUnionInternals<Options, Disc>;
  def: core.$ZodDiscriminatedUnionDef<Options, Disc>;
}
export const ZodDiscriminatedUnion: core.$constructor<ZodDiscriminatedUnion> = /*@__PURE__*/ core.$constructor(
  "ZodDiscriminatedUnion",
  (inst, def) => {
    ZodUnion.init(inst, def);
    core.$ZodDiscriminatedUnion.init(inst, def);
  }
);

export function discriminatedUnion<
  Types extends readonly [core.$ZodTypeDiscriminable<Disc>, ...core.$ZodTypeDiscriminable<Disc>[]],
  Disc extends string,
>(
  discriminator: Disc,
  options: Types,
  params?: string | core.$ZodDiscriminatedUnionParams
): ZodDiscriminatedUnion<Types, Disc> {
  // const [options, params] = args;
  return new ZodDiscriminatedUnion({
    type: "union",
    options,
    discriminator,
    ...util.normalizeParams(params),
  }) as any;
}

// ZodIntersection
export interface ZodIntersection<A extends core.SomeType = core.$ZodType, B extends core.SomeType = core.$ZodType>
  extends _ZodType<core.$ZodIntersectionInternals<A, B>>,
    core.$ZodIntersection<A, B> {
  "~standard": ZodStandardSchemaWithJSON<this>;
}
export const ZodIntersection: core.$constructor<ZodIntersection> = /*@__PURE__*/ core.$constructor(
  "ZodIntersection",
  (inst, def) => {
    core.$ZodIntersection.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.intersectionProcessor(inst, ctx, json, params);
  }
);

export function intersection<T extends core.SomeType, U extends core.SomeType>(
  left: T,
  right: U
): ZodIntersection<T, U> {
  return new ZodIntersection({
    type: "intersection",
    left: left as any as core.$ZodType,
    right: right as any as core.$ZodType,
  }) as any;
}

// ZodTuple
export interface ZodTuple<
  T extends util.TupleItems = readonly core.$ZodType[],
  Rest extends core.SomeType | null = core.$ZodType | null,
> extends _ZodType<core.$ZodTupleInternals<T, Rest>>,
    core.$ZodTuple<T, Rest> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  rest<Rest extends core.SomeType = core.$ZodType>(rest: Rest): ZodTuple<T, Rest>;
}
export const ZodTuple: core.$constructor<ZodTuple> = /*@__PURE__*/ core.$constructor("ZodTuple", (inst, def) => {
  core.$ZodTuple.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => processors.tupleProcessor(inst, ctx, json, params);
  inst.rest = (rest) =>
    inst.clone({
      ...inst._zod.def,
      rest: rest as any as core.$ZodType,
    }) as any;
});

export function tuple<T extends readonly [core.SomeType, ...core.SomeType[]]>(
  items: T,
  params?: string | core.$ZodTupleParams
): ZodTuple<T, null>;
export function tuple<T extends readonly [core.SomeType, ...core.SomeType[]], Rest extends core.SomeType>(
  items: T,
  rest: Rest,
  params?: string | core.$ZodTupleParams
): ZodTuple<T, Rest>;
export function tuple(items: [], params?: string | core.$ZodTupleParams): ZodTuple<[], null>;
export function tuple(
  items: core.SomeType[],
  _paramsOrRest?: string | core.$ZodTupleParams | core.SomeType,
  _params?: string | core.$ZodTupleParams
) {
  const hasRest = _paramsOrRest instanceof core.$ZodType;
  const params = hasRest ? _params : _paramsOrRest;
  const rest = hasRest ? _paramsOrRest : null;
  return new ZodTuple({
    type: "tuple",
    items: items as any as core.$ZodType[],
    rest,
    ...util.normalizeParams(params),
  });
}

// ZodRecord
export interface ZodRecord<
  Key extends core.$ZodRecordKey = core.$ZodRecordKey,
  Value extends core.SomeType = core.$ZodType,
> extends _ZodType<core.$ZodRecordInternals<Key, Value>>,
    core.$ZodRecord<Key, Value> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  keyType: Key;
  valueType: Value;
}
export const ZodRecord: core.$constructor<ZodRecord> = /*@__PURE__*/ core.$constructor("ZodRecord", (inst, def) => {
  core.$ZodRecord.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => processors.recordProcessor(inst, ctx, json, params);

  inst.keyType = def.keyType;
  inst.valueType = def.valueType;
});

export function record<Key extends core.$ZodRecordKey, Value extends core.SomeType>(
  keyType: Key,
  valueType: Value,
  params?: string | core.$ZodRecordParams
): ZodRecord<Key, Value> {
  // v3-compat: z.record(valueType, params?) — defaults keyType to z.string()
  if (!valueType || !(valueType as any)._zod) {
    return new ZodRecord({
      type: "record",
      keyType: string() as any,
      valueType: keyType as any as core.$ZodType,
      ...util.normalizeParams(valueType as string | core.$ZodRecordParams | undefined),
    }) as any;
  }
  return new ZodRecord({
    type: "record",
    keyType,
    valueType: valueType as any as core.$ZodType,
    ...util.normalizeParams(params),
  }) as any;
}
// type alksjf = core.output<core.$ZodRecordKey>;
export function partialRecord<Key extends core.$ZodRecordKey, Value extends core.SomeType>(
  keyType: Key,
  valueType: Value,
  params?: string | core.$ZodRecordParams
): ZodRecord<Key & core.$partial, Value> {
  const k = core.clone(keyType);
  k._zod.values = undefined;
  return new ZodRecord({
    type: "record",
    keyType: k,
    valueType: valueType as any,
    ...util.normalizeParams(params),
  }) as any;
}

export function looseRecord<Key extends core.$ZodRecordKey, Value extends core.SomeType>(
  keyType: Key,
  valueType: Value,
  params?: string | core.$ZodRecordParams
): ZodRecord<Key, Value> {
  return new ZodRecord({
    type: "record",
    keyType,
    valueType: valueType as any as core.$ZodType,
    mode: "loose",
    ...util.normalizeParams(params),
  }) as any;
}

// ZodMap
export interface ZodMap<Key extends core.SomeType = core.$ZodType, Value extends core.SomeType = core.$ZodType>
  extends _ZodType<core.$ZodMapInternals<Key, Value>>,
    core.$ZodMap<Key, Value> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  keyType: Key;
  valueType: Value;
  min(minSize: number, params?: string | core.$ZodCheckMinSizeParams): this;
  nonempty(params?: string | core.$ZodCheckMinSizeParams): this;
  max(maxSize: number, params?: string | core.$ZodCheckMaxSizeParams): this;
  size(size: number, params?: string | core.$ZodCheckSizeEqualsParams): this;
}
export const ZodMap: core.$constructor<ZodMap> = /*@__PURE__*/ core.$constructor("ZodMap", (inst, def) => {
  core.$ZodMap.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => processors.mapProcessor(inst, ctx, json, params);
  inst.keyType = def.keyType;
  inst.valueType = def.valueType;
  inst.min = (...args) => inst.check(core._minSize(...args));
  inst.nonempty = (params) => inst.check(core._minSize(1, params));
  inst.max = (...args) => inst.check(core._maxSize(...args));
  inst.size = (...args) => inst.check(core._size(...args));
});

export function map<Key extends core.SomeType, Value extends core.SomeType>(
  keyType: Key,
  valueType: Value,
  params?: string | core.$ZodMapParams
): ZodMap<Key, Value> {
  return new ZodMap({
    type: "map",
    keyType: keyType as any as core.$ZodType,
    valueType: valueType as any as core.$ZodType,
    ...util.normalizeParams(params),
  }) as any;
}

// ZodSet
export interface ZodSet<T extends core.SomeType = core.$ZodType>
  extends _ZodType<core.$ZodSetInternals<T>>,
    core.$ZodSet<T> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  min(minSize: number, params?: string | core.$ZodCheckMinSizeParams): this;
  nonempty(params?: string | core.$ZodCheckMinSizeParams): this;
  max(maxSize: number, params?: string | core.$ZodCheckMaxSizeParams): this;
  size(size: number, params?: string | core.$ZodCheckSizeEqualsParams): this;
}
export const ZodSet: core.$constructor<ZodSet> = /*@__PURE__*/ core.$constructor("ZodSet", (inst, def) => {
  core.$ZodSet.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => processors.setProcessor(inst, ctx, json, params);

  inst.min = (...args) => inst.check(core._minSize(...args));
  inst.nonempty = (params) => inst.check(core._minSize(1, params));
  inst.max = (...args) => inst.check(core._maxSize(...args));
  inst.size = (...args) => inst.check(core._size(...args));
});

export function set<Value extends core.SomeType>(
  valueType: Value,
  params?: string | core.$ZodSetParams
): ZodSet<Value> {
  return new ZodSet({
    type: "set",
    valueType: valueType as any as core.$ZodType,
    ...util.normalizeParams(params),
  }) as any;
}

// ZodEnum
export interface ZodEnum<
  /** @ts-ignore Cast variance */
  out T extends util.EnumLike = util.EnumLike,
> extends _ZodType<core.$ZodEnumInternals<T>>,
    core.$ZodEnum<T> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  enum: T;
  options: Array<T[keyof T]>;

  extract<const U extends readonly (keyof T)[]>(
    values: U,
    params?: string | core.$ZodEnumParams
  ): ZodEnum<util.Flatten<Pick<T, U[number]>>>;
  exclude<const U extends readonly (keyof T)[]>(
    values: U,
    params?: string | core.$ZodEnumParams
  ): ZodEnum<util.Flatten<Omit<T, U[number]>>>;
}
export const ZodEnum: core.$constructor<ZodEnum> = /*@__PURE__*/ core.$constructor("ZodEnum", (inst, def) => {
  core.$ZodEnum.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => processors.enumProcessor(inst, ctx, json, params);

  inst.enum = def.entries;
  inst.options = Object.values(def.entries);

  const keys = new Set(Object.keys(def.entries));

  inst.extract = (values, params) => {
    const newEntries: Record<string, any> = {};
    for (const value of values) {
      if (keys.has(value)) {
        newEntries[value] = def.entries[value];
      } else throw new Error(`Key ${value} not found in enum`);
    }
    return new ZodEnum({
      ...def,
      checks: [],
      ...util.normalizeParams(params),
      entries: newEntries,
    }) as any;
  };

  inst.exclude = (values, params) => {
    const newEntries: Record<string, any> = { ...def.entries };
    for (const value of values) {
      if (keys.has(value)) {
        delete newEntries[value];
      } else throw new Error(`Key ${value} not found in enum`);
    }
    return new ZodEnum({
      ...def,
      checks: [],
      ...util.normalizeParams(params),
      entries: newEntries,
    }) as any;
  };
});

function _enum<const T extends readonly string[]>(
  values: T,
  params?: string | core.$ZodEnumParams
): ZodEnum<util.ToEnum<T[number]>>;
function _enum<const T extends util.EnumLike>(entries: T, params?: string | core.$ZodEnumParams): ZodEnum<T>;
function _enum(values: any, params?: string | core.$ZodEnumParams) {
  const entries: any = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;

  return new ZodEnum({
    type: "enum",
    entries,
    ...util.normalizeParams(params),
  }) as any;
}
export { _enum as enum };

/** @deprecated This API has been merged into `z.enum()`. Use `z.enum()` instead.
 *
 * ```ts
 * enum Colors { red, green, blue }
 * z.enum(Colors);
 * ```
 */
export function nativeEnum<T extends util.EnumLike>(entries: T, params?: string | core.$ZodEnumParams): ZodEnum<T> {
  return new ZodEnum({
    type: "enum",
    entries,
    ...util.normalizeParams(params),
  }) as ZodEnum<T>;
}

// ZodLiteral
export interface ZodLiteral<T extends util.Literal = util.Literal>
  extends _ZodType<core.$ZodLiteralInternals<T>>,
    core.$ZodLiteral<T> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  values: Set<T>;
  /** @legacy Use `.values` instead. Accessing this property will throw an error if the literal accepts multiple values. */
  value: T;
}
export const ZodLiteral: core.$constructor<ZodLiteral> = /*@__PURE__*/ core.$constructor("ZodLiteral", (inst, def) => {
  core.$ZodLiteral.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => processors.literalProcessor(inst, ctx, json, params);
  inst.values = new Set(def.values);
  Object.defineProperty(inst, "value", {
    get() {
      if (def.values.length > 1) {
        throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
      }
      return def.values[0];
    },
  });
});

export function literal<const T extends ReadonlyArray<util.Literal>>(
  value: T,
  params?: string | core.$ZodLiteralParams
): ZodLiteral<T[number]>;
export function literal<const T extends util.Literal>(
  value: T,
  params?: string | core.$ZodLiteralParams
): ZodLiteral<T>;
export function literal(value: any, params: any) {
  return new ZodLiteral({
    type: "literal",
    values: Array.isArray(value) ? value : [value],
    ...util.normalizeParams(params),
  });
}

// ZodFile
export interface ZodFile extends _ZodType<core.$ZodFileInternals>, core.$ZodFile {
  "~standard": ZodStandardSchemaWithJSON<this>;
  min(size: number, params?: string | core.$ZodCheckMinSizeParams): this;
  max(size: number, params?: string | core.$ZodCheckMaxSizeParams): this;
  mime(types: util.MimeTypes | Array<util.MimeTypes>, params?: string | core.$ZodCheckMimeTypeParams): this;
}
export const ZodFile: core.$constructor<ZodFile> = /*@__PURE__*/ core.$constructor("ZodFile", (inst, def) => {
  core.$ZodFile.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => processors.fileProcessor(inst, ctx, json, params);

  inst.min = (size, params) => inst.check(core._minSize(size, params));
  inst.max = (size, params) => inst.check(core._maxSize(size, params));
  inst.mime = (types, params) => inst.check(core._mime(Array.isArray(types) ? types : [types], params));
});

export function file(params?: string | core.$ZodFileParams): ZodFile {
  return core._file(ZodFile, params) as any;
}

// ZodTransform
export interface ZodTransform<O = unknown, I = unknown>
  extends _ZodType<core.$ZodTransformInternals<O, I>>,
    core.$ZodTransform<O, I> {
  "~standard": ZodStandardSchemaWithJSON<this>;
}
export const ZodTransform: core.$constructor<ZodTransform> = /*@__PURE__*/ core.$constructor(
  "ZodTransform",
  (inst, def) => {
    core.$ZodTransform.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.transformProcessor(inst, ctx, json, params);

    inst._zod.parse = (payload, _ctx) => {
      if (_ctx.direction === "backward") {
        throw new core.$ZodEncodeError(inst.constructor.name);
      }

      (payload as core.$RefinementCtx).addIssue = (issue) => {
        if (typeof issue === "string") {
          payload.issues.push(util.issue(issue, payload.value, def));
        } else {
          // for Zod 3 backwards compatibility
          const _issue = issue as any;

          if (_issue.fatal) _issue.continue = false;
          _issue.code ??= "custom";
          _issue.input ??= payload.value;
          _issue.inst ??= inst;
          // _issue.continue ??= true;
          payload.issues.push(util.issue(_issue));
        }
      };

      const output = def.transform(payload.value, payload);
      if (output instanceof Promise) {
        return output.then((output) => {
          payload.value = output;
          return payload;
        });
      }
      payload.value = output;
      return payload;
    };
  }
);

export function transform<I = unknown, O = I>(
  fn: (input: I, ctx: core.$RefinementCtx) => O
): ZodTransform<Awaited<O>, I> {
  return new ZodTransform({
    type: "transform",
    transform: fn as any,
  }) as any;
}

// ZodOptional
export interface ZodOptional<T extends core.SomeType = core.$ZodType>
  extends _ZodType<core.$ZodOptionalInternals<T>>,
    core.$ZodOptional<T> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  unwrap(): T;
}
export const ZodOptional: core.$constructor<ZodOptional> = /*@__PURE__*/ core.$constructor(
  "ZodOptional",
  (inst, def) => {
    core.$ZodOptional.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.optionalProcessor(inst, ctx, json, params);

    inst.unwrap = () => inst._zod.def.innerType;
  }
);

export function optional<T extends core.SomeType>(innerType: T): ZodOptional<T> {
  return new ZodOptional({
    type: "optional",
    innerType: innerType as any as core.$ZodType,
  }) as any;
}

// ZodExactOptional
export interface ZodExactOptional<T extends core.SomeType = core.$ZodType>
  extends _ZodType<core.$ZodExactOptionalInternals<T>>,
    core.$ZodExactOptional<T> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  unwrap(): T;
}
export const ZodExactOptional: core.$constructor<ZodExactOptional> = /*@__PURE__*/ core.$constructor(
  "ZodExactOptional",
  (inst, def) => {
    core.$ZodExactOptional.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.optionalProcessor(inst, ctx, json, params);

    inst.unwrap = () => inst._zod.def.innerType;
  }
);

export function exactOptional<T extends core.SomeType>(innerType: T): ZodExactOptional<T> {
  return new ZodExactOptional({
    type: "optional",
    innerType: innerType as any as core.$ZodType,
  }) as any;
}

// ZodNullable
export interface ZodNullable<T extends core.SomeType = core.$ZodType>
  extends _ZodType<core.$ZodNullableInternals<T>>,
    core.$ZodNullable<T> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  unwrap(): T;
}
export const ZodNullable: core.$constructor<ZodNullable> = /*@__PURE__*/ core.$constructor(
  "ZodNullable",
  (inst, def) => {
    core.$ZodNullable.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.nullableProcessor(inst, ctx, json, params);

    inst.unwrap = () => inst._zod.def.innerType;
  }
);

export function nullable<T extends core.SomeType>(innerType: T): ZodNullable<T> {
  return new ZodNullable({
    type: "nullable",
    innerType: innerType as any as core.$ZodType,
  }) as any;
}

// nullish
export function nullish<T extends core.SomeType>(innerType: T): ZodOptional<ZodNullable<T>> {
  return optional(nullable(innerType));
}

// ZodDefault
export interface ZodDefault<T extends core.SomeType = core.$ZodType>
  extends _ZodType<core.$ZodDefaultInternals<T>>,
    core.$ZodDefault<T> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  unwrap(): T;
  /** @deprecated Use `.unwrap()` instead. */
  removeDefault(): T;
}
export const ZodDefault: core.$constructor<ZodDefault> = /*@__PURE__*/ core.$constructor("ZodDefault", (inst, def) => {
  core.$ZodDefault.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => processors.defaultProcessor(inst, ctx, json, params);

  inst.unwrap = () => inst._zod.def.innerType;
  inst.removeDefault = inst.unwrap;
});

export function _default<T extends core.SomeType>(
  innerType: T,
  defaultValue: util.NoUndefined<core.output<T>> | (() => util.NoUndefined<core.output<T>>)
): ZodDefault<T> {
  return new ZodDefault({
    type: "default",
    innerType: innerType as any as core.$ZodType,
    get defaultValue() {
      return typeof defaultValue === "function" ? (defaultValue as Function)() : util.shallowClone(defaultValue);
    },
  }) as any;
}

// ZodPrefault
export interface ZodPrefault<T extends core.SomeType = core.$ZodType>
  extends _ZodType<core.$ZodPrefaultInternals<T>>,
    core.$ZodPrefault<T> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  unwrap(): T;
}
export const ZodPrefault: core.$constructor<ZodPrefault> = /*@__PURE__*/ core.$constructor(
  "ZodPrefault",
  (inst, def) => {
    core.$ZodPrefault.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.prefaultProcessor(inst, ctx, json, params);
    inst.unwrap = () => inst._zod.def.innerType;
  }
);

export function prefault<T extends core.SomeType>(
  innerType: T,
  defaultValue: core.input<T> | (() => core.input<T>)
): ZodPrefault<T> {
  return new ZodPrefault({
    type: "prefault",
    innerType: innerType as any as core.$ZodType,
    get defaultValue() {
      return typeof defaultValue === "function" ? (defaultValue as Function)() : util.shallowClone(defaultValue);
    },
  }) as any;
}

// ZodNonOptional
export interface ZodNonOptional<T extends core.SomeType = core.$ZodType>
  extends _ZodType<core.$ZodNonOptionalInternals<T>>,
    core.$ZodNonOptional<T> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  unwrap(): T;
}
export const ZodNonOptional: core.$constructor<ZodNonOptional> = /*@__PURE__*/ core.$constructor(
  "ZodNonOptional",
  (inst, def) => {
    core.$ZodNonOptional.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.nonoptionalProcessor(inst, ctx, json, params);

    inst.unwrap = () => inst._zod.def.innerType;
  }
);

export function nonoptional<T extends core.SomeType>(
  innerType: T,
  params?: string | core.$ZodNonOptionalParams
): ZodNonOptional<T> {
  return new ZodNonOptional({
    type: "nonoptional",
    innerType: innerType as any as core.$ZodType,
    ...util.normalizeParams(params),
  }) as any;
}

// ZodSuccess
export interface ZodSuccess<T extends core.SomeType = core.$ZodType>
  extends _ZodType<core.$ZodSuccessInternals<T>>,
    core.$ZodSuccess<T> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  unwrap(): T;
}
export const ZodSuccess: core.$constructor<ZodSuccess> = /*@__PURE__*/ core.$constructor("ZodSuccess", (inst, def) => {
  core.$ZodSuccess.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => processors.successProcessor(inst, ctx, json, params);

  inst.unwrap = () => inst._zod.def.innerType;
});

export function success<T extends core.SomeType>(innerType: T): ZodSuccess<T> {
  return new ZodSuccess({
    type: "success",
    innerType: innerType as any as core.$ZodType,
  }) as any;
}

// ZodCatch
export interface ZodCatch<T extends core.SomeType = core.$ZodType>
  extends _ZodType<core.$ZodCatchInternals<T>>,
    core.$ZodCatch<T> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  unwrap(): T;
  /** @deprecated Use `.unwrap()` instead. */
  removeCatch(): T;
}
export const ZodCatch: core.$constructor<ZodCatch> = /*@__PURE__*/ core.$constructor("ZodCatch", (inst, def) => {
  core.$ZodCatch.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => processors.catchProcessor(inst, ctx, json, params);

  inst.unwrap = () => inst._zod.def.innerType;
  inst.removeCatch = inst.unwrap;
});

function _catch<T extends core.SomeType>(
  innerType: T,
  catchValue: core.output<T> | ((ctx: core.$ZodCatchCtx) => core.output<T>)
): ZodCatch<T> {
  return new ZodCatch({
    type: "catch",
    innerType: innerType as any as core.$ZodType,
    catchValue: (typeof catchValue === "function" ? catchValue : () => catchValue) as (
      ctx: core.$ZodCatchCtx
    ) => core.output<T>,
  }) as any;
}
export { _catch as catch };

// ZodNaN
export interface ZodNaN extends _ZodType<core.$ZodNaNInternals>, core.$ZodNaN {
  "~standard": ZodStandardSchemaWithJSON<this>;
}
export const ZodNaN: core.$constructor<ZodNaN> = /*@__PURE__*/ core.$constructor("ZodNaN", (inst, def) => {
  core.$ZodNaN.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => processors.nanProcessor(inst, ctx, json, params);
});

export function nan(params?: string | core.$ZodNaNParams): ZodNaN {
  return core._nan(ZodNaN, params);
}

// ZodPipe
export interface ZodPipe<A extends core.SomeType = core.$ZodType, B extends core.SomeType = core.$ZodType>
  extends _ZodType<core.$ZodPipeInternals<A, B>>,
    core.$ZodPipe<A, B> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  in: A;
  out: B;
}
export const ZodPipe: core.$constructor<ZodPipe> = /*@__PURE__*/ core.$constructor("ZodPipe", (inst, def) => {
  core.$ZodPipe.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => processors.pipeProcessor(inst, ctx, json, params);

  inst.in = def.in;
  inst.out = def.out;
});

export function pipe<
  const A extends core.SomeType,
  B extends core.$ZodType<unknown, core.output<A>> = core.$ZodType<unknown, core.output<A>>,
>(in_: A, out: B | core.$ZodType<unknown, core.output<A>>): ZodPipe<A, B>;
export function pipe(in_: core.SomeType, out: core.SomeType) {
  return new ZodPipe({
    type: "pipe",
    in: in_ as unknown as core.$ZodType,
    out: out as unknown as core.$ZodType,
    // ...util.normalizeParams(params),
  });
}

// ZodCodec
export interface ZodCodec<A extends core.SomeType = core.$ZodType, B extends core.SomeType = core.$ZodType>
  extends ZodPipe<A, B>,
    core.$ZodCodec<A, B> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  _zod: core.$ZodCodecInternals<A, B>;
  def: core.$ZodCodecDef<A, B>;
}
export const ZodCodec: core.$constructor<ZodCodec> = /*@__PURE__*/ core.$constructor("ZodCodec", (inst, def) => {
  ZodPipe.init(inst, def);
  core.$ZodCodec.init(inst, def);
});

export function codec<const A extends core.SomeType, B extends core.SomeType = core.$ZodType>(
  in_: A,
  out: B,
  params: {
    decode: (value: core.output<A>, payload: core.ParsePayload<core.output<A>>) => core.util.MaybeAsync<core.input<B>>;
    encode: (value: core.input<B>, payload: core.ParsePayload<core.input<B>>) => core.util.MaybeAsync<core.output<A>>;
  }
): ZodCodec<A, B> {
  return new ZodCodec({
    type: "pipe",
    in: in_ as any as core.$ZodType,
    out: out as any as core.$ZodType,
    transform: params.decode as any,
    reverseTransform: params.encode as any,
  }) as any;
}

export function invertCodec<A extends core.SomeType, B extends core.SomeType>(codec: ZodCodec<A, B>): ZodCodec<B, A> {
  const def = codec._zod.def;
  return new ZodCodec({
    type: "pipe",
    in: def.out as any,
    out: def.in as any,
    transform: def.reverseTransform as any,
    reverseTransform: def.transform as any,
  }) as any;
}

// ZodPreprocess
export interface ZodPreprocess<B extends core.SomeType = core.$ZodType>
  extends ZodPipe<core.$ZodTransform, B>,
    core.$ZodPreprocess<B> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  _zod: core.$ZodPreprocessInternals<B>;
  def: core.$ZodPreprocessDef<B>;
}
export const ZodPreprocess: core.$constructor<ZodPreprocess> = /*@__PURE__*/ core.$constructor(
  "ZodPreprocess",
  (inst, def) => {
    ZodPipe.init(inst, def);
    core.$ZodPreprocess.init(inst, def);
  }
);

// ZodReadonly
export interface ZodReadonly<T extends core.SomeType = core.$ZodType>
  extends _ZodType<core.$ZodReadonlyInternals<T>>,
    core.$ZodReadonly<T> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  unwrap(): T;
}
export const ZodReadonly: core.$constructor<ZodReadonly> = /*@__PURE__*/ core.$constructor(
  "ZodReadonly",
  (inst, def) => {
    core.$ZodReadonly.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.readonlyProcessor(inst, ctx, json, params);

    inst.unwrap = () => inst._zod.def.innerType;
  }
);

export function readonly<T extends core.SomeType>(innerType: T): ZodReadonly<T> {
  return new ZodReadonly({
    type: "readonly",
    innerType: innerType as any as core.$ZodType,
  }) as any;
}

// ZodTemplateLiteral
export interface ZodTemplateLiteral<Template extends string = string>
  extends _ZodType<core.$ZodTemplateLiteralInternals<Template>>,
    core.$ZodTemplateLiteral<Template> {
  "~standard": ZodStandardSchemaWithJSON<this>;
}
export const ZodTemplateLiteral: core.$constructor<ZodTemplateLiteral> = /*@__PURE__*/ core.$constructor(
  "ZodTemplateLiteral",
  (inst, def) => {
    core.$ZodTemplateLiteral.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.templateLiteralProcessor(inst, ctx, json, params);
  }
);

export function templateLiteral<const Parts extends core.$ZodTemplateLiteralPart[]>(
  parts: Parts,
  params?: string | core.$ZodTemplateLiteralParams
): ZodTemplateLiteral<core.$PartsToTemplateLiteral<Parts>> {
  return new ZodTemplateLiteral({
    type: "template_literal",
    parts,
    ...util.normalizeParams(params),
  }) as any;
}

// ZodLazy
export interface ZodLazy<T extends core.SomeType = core.$ZodType>
  extends _ZodType<core.$ZodLazyInternals<T>>,
    core.$ZodLazy<T> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  unwrap(): T;
}
export const ZodLazy: core.$constructor<ZodLazy> = /*@__PURE__*/ core.$constructor("ZodLazy", (inst, def) => {
  core.$ZodLazy.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => processors.lazyProcessor(inst, ctx, json, params);

  inst.unwrap = () => inst._zod.def.getter();
});

export function lazy<T extends core.SomeType>(getter: () => T): ZodLazy<T> {
  return new ZodLazy({
    type: "lazy",
    getter: getter as any,
  }) as any;
}

// ZodPromise
export interface ZodPromise<T extends core.SomeType = core.$ZodType>
  extends _ZodType<core.$ZodPromiseInternals<T>>,
    core.$ZodPromise<T> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  unwrap(): T;
}
export const ZodPromise: core.$constructor<ZodPromise> = /*@__PURE__*/ core.$constructor("ZodPromise", (inst, def) => {
  core.$ZodPromise.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => processors.promiseProcessor(inst, ctx, json, params);

  inst.unwrap = () => inst._zod.def.innerType;
});

export function promise<T extends core.SomeType>(innerType: T): ZodPromise<T> {
  return new ZodPromise({
    type: "promise",
    innerType: innerType as any as core.$ZodType,
  }) as any;
}

// ZodFunction
export interface ZodFunction<
  Args extends core.$ZodFunctionIn = core.$ZodFunctionIn,
  Returns extends core.$ZodFunctionOut = core.$ZodFunctionOut,
> extends _ZodType<core.$ZodFunctionInternals<Args, Returns>>,
    core.$ZodFunction<Args, Returns> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  _def: core.$ZodFunctionDef<Args, Returns>;
  _input: core.$InferInnerFunctionType<Args, Returns>;
  _output: core.$InferOuterFunctionType<Args, Returns>;

  input<const Items extends util.TupleItems, const Rest extends core.$ZodFunctionOut = core.$ZodFunctionOut>(
    args: Items,
    rest?: Rest
  ): ZodFunction<core.$ZodTuple<Items, Rest>, Returns>;
  input<NewArgs extends core.$ZodFunctionIn>(args: NewArgs): ZodFunction<NewArgs, Returns>;
  input(...args: any[]): ZodFunction<any, Returns>;

  output<NewReturns extends core.$ZodType>(output: NewReturns): ZodFunction<Args, NewReturns>;
}

export const ZodFunction: core.$constructor<ZodFunction> = /*@__PURE__*/ core.$constructor(
  "ZodFunction",
  (inst, def) => {
    core.$ZodFunction.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.processJSONSchema = (ctx, json, params) => processors.functionProcessor(inst, ctx, json, params);
  }
);

export function _function(): ZodFunction;
export function _function<const In extends ReadonlyArray<core.$ZodType>>(params: {
  input: In;
}): ZodFunction<ZodTuple<In, null>, core.$ZodFunctionOut>;
export function _function<
  const In extends ReadonlyArray<core.$ZodType>,
  const Out extends core.$ZodFunctionOut = core.$ZodFunctionOut,
>(params: {
  input: In;
  output: Out;
}): ZodFunction<ZodTuple<In, null>, Out>;
export function _function<const In extends core.$ZodFunctionIn = core.$ZodFunctionIn>(params: {
  input: In;
}): ZodFunction<In, core.$ZodFunctionOut>;
export function _function<const Out extends core.$ZodFunctionOut = core.$ZodFunctionOut>(params: {
  output: Out;
}): ZodFunction<core.$ZodFunctionIn, Out>;
export function _function<
  In extends core.$ZodFunctionIn = core.$ZodFunctionIn,
  Out extends core.$ZodType = core.$ZodType,
>(params?: {
  input: In;
  output: Out;
}): ZodFunction<In, Out>;
export function _function(params?: {
  output?: core.$ZodType;
  input?: core.$ZodFunctionArgs | Array<core.$ZodType>;
}): ZodFunction {
  return new ZodFunction({
    type: "function",
    input: Array.isArray(params?.input) ? tuple(params?.input as any) : (params?.input ?? array(unknown())),
    output: params?.output ?? unknown(),
  });
}

export { _function as function };

// ZodCustom
export interface ZodCustom<O = unknown, I = unknown>
  extends _ZodType<core.$ZodCustomInternals<O, I>>,
    core.$ZodCustom<O, I> {
  "~standard": ZodStandardSchemaWithJSON<this>;
}
export const ZodCustom: core.$constructor<ZodCustom> = /*@__PURE__*/ core.$constructor("ZodCustom", (inst, def) => {
  core.$ZodCustom.init(inst, def);
  ZodType.init(inst, def);
  inst._zod.processJSONSchema = (ctx, json, params) => processors.customProcessor(inst, ctx, json, params);
});

// custom checks
export function check<O = unknown>(fn: core.CheckFn<O>): core.$ZodCheck<O> {
  const ch = new core.$ZodCheck({
    check: "custom",
    // ...util.normalizeParams(params),
  });

  ch._zod.check = fn;
  return ch;
}

export function custom<O>(
  fn?: (data: unknown) => unknown,
  _params?: string | core.$ZodCustomParams | undefined
): ZodCustom<O, O> {
  return core._custom(ZodCustom, fn ?? (() => true), _params) as any;
}

export function refine<T>(
  fn: (arg: NoInfer<T>) => util.MaybeAsync<unknown>,
  _params: string | core.$ZodCustomParams = {}
): core.$ZodCheck<T> {
  return core._refine(ZodCustom, fn, _params);
}

// superRefine
export function superRefine<T>(
  fn: (arg: T, payload: core.$RefinementCtx<T>) => void | Promise<void>,
  params?: core.$ZodSuperRefineParams
): core.$ZodCheck<T> {
  return core._superRefine(fn, params);
}

// Re-export describe and meta from core
export const describe = core.describe;
export const meta = core.meta;

type ZodInstanceOfParams = core.Params<
  ZodCustom,
  core.$ZodIssueCustom,
  "type" | "check" | "checks" | "fn" | "abort" | "error" | "params" | "path"
>;
function _instanceof<T extends typeof util.Class>(
  cls: T,
  params: ZodInstanceOfParams = {}
): ZodCustom<InstanceType<T>, InstanceType<T>> {
  const inst = new ZodCustom({
    type: "custom",
    check: "custom",
    fn: (data) => data instanceof cls,
    abort: true,
    ...(util.normalizeParams(params) as any),
  });
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
  return inst as any;
}
export { _instanceof as instanceof };

// stringbool
export const stringbool: (_params?: string | core.$ZodStringBoolParams) => ZodCodec<ZodString, ZodBoolean> = (
  ...args
) =>
  core._stringbool(
    {
      Codec: ZodCodec,
      Boolean: ZodBoolean,
      String: ZodString,
    },
    ...args
  ) as any;

// json
type _ZodJSONSchema = ZodUnion<
  [ZodString, ZodNumber, ZodBoolean, ZodNull, ZodArray<ZodJSONSchema>, ZodRecord<ZodString, ZodJSONSchema>]
>;
type _ZodJSONSchemaInternals = _ZodJSONSchema["_zod"];

export interface ZodJSONSchemaInternals extends _ZodJSONSchemaInternals {
  output: util.JSONType;
  input: util.JSONType;
}
export interface ZodJSONSchema extends _ZodJSONSchema {
  _zod: ZodJSONSchemaInternals;
}

export function json(params?: string | core.$ZodCustomParams): ZodJSONSchema {
  const jsonSchema: any = lazy(() => {
    return union([string(params), number(), boolean(), _null(), array(jsonSchema), record(string(), jsonSchema)]);
  });

  return jsonSchema;
}

// preprocess

export function preprocess<A, U extends core.SomeType, B = unknown>(
  fn: (arg: B, ctx: core.$RefinementCtx) => A,
  schema: U
): ZodPreprocess<U> {
  return new ZodPreprocess({
    type: "pipe",
    in: transform(fn as any) as any as core.$ZodTransform,
    out: schema as any as core.$ZodType,
  }) as any;
}
