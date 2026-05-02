import type * as errors from "./errors.js";
import type * as schemas from "./schemas.js";
import type { Class } from "./util.js";
//////////////////////////////   CONSTRUCTORS   ///////////////////////////////////////

type ZodTrait = { _zod: { def: any; [k: string]: any } };
export interface $constructor<T extends ZodTrait, D = T["_zod"]["def"]> {
  new (def: D): T;
  init(inst: T, def: D): asserts inst is T;
}

/** A special constant with type `never` */
export const NEVER: never = /*@__PURE__*/ Object.freeze({
  status: "aborted",
}) as never;

export /*@__NO_SIDE_EFFECTS__*/ function $constructor<T extends ZodTrait, D = T["_zod"]["def"]>(
  name: string,
  initializer: (inst: T, def: D) => void,
  params?: { Parent?: typeof Class }
): $constructor<T, D> {
  function init(inst: T, def: D) {
    if (!inst._zod) {
      Object.defineProperty(inst, "_zod", {
        value: {
          def,
          constr: _,
          traits: new Set(),
        },
        enumerable: false,
      });
    }

    if (inst._zod.traits.has(name)) {
      return;
    }

    inst._zod.traits.add(name);

    initializer(inst, def);

    // support prototype modifications
    const proto = _.prototype;
    const keys = Object.keys(proto);
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i]!;
      if (!(k in inst)) {
        (inst as any)[k] = proto[k].bind(inst);
      }
    }
  }

  // doesn't work if Parent has a constructor with arguments
  const Parent = params?.Parent ?? Object;
  class Definition extends Parent {}
  Object.defineProperty(Definition, "name", { value: name });

  function _(this: any, def: D) {
    const inst = params?.Parent ? new Definition() : this;
    init(inst, def);
    inst._zod.deferred ??= [];
    for (const fn of inst._zod.deferred) {
      fn();
    }
    return inst;
  }

  Object.defineProperty(_, "init", { value: init });
  Object.defineProperty(_, Symbol.hasInstance, {
    value: (inst: any) => {
      if (params?.Parent && inst instanceof params.Parent) return true;
      return inst?._zod?.traits?.has(name);
    },
  });
  Object.defineProperty(_, "name", { value: name });
  return _ as any;
}

//////////////////////////////   UTILITIES   ///////////////////////////////////////
export const $brand: unique symbol = Symbol("zod_brand");
export type $brand<T extends string | number | symbol = string | number | symbol> = {
  [$brand]: { [k in T]: true };
};

export type $ZodBranded<
  T extends schemas.SomeType,
  Brand extends string | number | symbol,
  Dir extends "in" | "out" | "inout" = "out",
> = T &
  (Dir extends "inout"
    ? { _zod: { input: input<T> & $brand<Brand>; output: output<T> & $brand<Brand> } }
    : Dir extends "in"
      ? { _zod: { input: input<T> & $brand<Brand> } }
      : { _zod: { output: output<T> & $brand<Brand> } });

export type $ZodNarrow<T extends schemas.SomeType, Out> = T & { _zod: { output: Out } };

export class $ZodAsyncError extends Error {
  constructor() {
    super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
  }
}

export class $ZodEncodeError extends Error {
  constructor(name: string) {
    super(`Encountered unidirectional transform during encode: ${name}`);
    this.name = "ZodEncodeError";
  }
}

////////////////////////////  TYPE HELPERS  ///////////////////////////////////

// export type input<T extends schemas.$ZodType> = T["_zod"]["input"];
// export type output<T extends schemas.$ZodType> = T["_zod"]["output"];
// export type input<T extends schemas.$ZodType> = T["_zod"]["input"];
// export type output<T extends schemas.$ZodType> = T["_zod"]["output"];
export type input<T> = T extends { _zod: { input: any } } ? T["_zod"]["input"] : unknown;
export type output<T> = T extends { _zod: { output: any } } ? T["_zod"]["output"] : unknown;

export type { output as infer };

//////////////////////////////   CONFIG   ///////////////////////////////////////

export interface $ZodConfig {
  /** Custom error map. Overrides `config().localeError`. */
  customError?: errors.$ZodErrorMap | undefined;
  /** Localized error map. Lowest priority. */
  localeError?: errors.$ZodErrorMap | undefined;
  /** Disable JIT schema compilation. Useful in environments that disallow `eval`. */
  jitless?: boolean | undefined;
}

interface GlobalThisWithConfig {
  /**
   * The globalConfig instance shared across both CommonJS and ESM builds.
   * Attached to `globalThis` (mirroring `__zod_globalRegistry`) so that a
   * single config object is used regardless of how Zod is loaded — CJS,
   * ESM, multiple bundles in a monorepo, etc. This means `z.config(...)`
   * applied against any one instance is observed by all of them, and
   * pre-populating it before Zod loads (e.g. `globalThis.__zod_globalConfig
   * = { jitless: true }` in an inline script) takes effect immediately on
   * import.
   */
  __zod_globalConfig?: $ZodConfig;
}

(globalThis as GlobalThisWithConfig).__zod_globalConfig ??= {};
export const globalConfig: $ZodConfig = (globalThis as GlobalThisWithConfig).__zod_globalConfig!;

export function config(newConfig?: Partial<$ZodConfig>): $ZodConfig {
  if (newConfig) Object.assign(globalConfig, newConfig);
  return globalConfig;
}
