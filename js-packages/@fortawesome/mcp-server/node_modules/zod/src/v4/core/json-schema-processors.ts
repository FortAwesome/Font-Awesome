import type * as checks from "./checks.js";
import type * as JSONSchema from "./json-schema.js";
import type { $ZodRegistry } from "./registries.js";
import type * as schemas from "./schemas.js";
import {
  type Processor,
  type RegistryToJSONSchemaParams,
  type ToJSONSchemaParams,
  type ZodStandardJSONSchemaPayload,
  extractDefs,
  finalize,
  initializeContext,
  process,
} from "./to-json-schema.js";
import { getEnumValues } from "./util.js";

const formatMap: Partial<Record<checks.$ZodStringFormats, string | undefined>> = {
  guid: "uuid",
  url: "uri",
  datetime: "date-time",
  json_string: "json-string",
  regex: "", // do not set
};

// ==================== SIMPLE TYPE PROCESSORS ====================

export const stringProcessor: Processor<schemas.$ZodString> = (schema, ctx, _json, _params) => {
  const json = _json as JSONSchema.StringSchema;
  json.type = "string";
  const { minimum, maximum, format, patterns, contentEncoding } = schema._zod
    .bag as schemas.$ZodStringInternals<unknown>["bag"];
  if (typeof minimum === "number") json.minLength = minimum;
  if (typeof maximum === "number") json.maxLength = maximum;
  // custom pattern overrides format
  if (format) {
    json.format = formatMap[format as checks.$ZodStringFormats] ?? format;
    if (json.format === "") delete json.format; // empty format is not valid

    // JSON Schema format: "time" requires a full time with offset or Z
    // z.iso.time() does not include timezone information, so format: "time" should never be used
    if (format === "time") {
      delete json.format;
    }
  }
  if (contentEncoding) json.contentEncoding = contentEncoding;
  if (patterns && patterns.size > 0) {
    const regexes = [...patterns];
    if (regexes.length === 1) json.pattern = regexes[0]!.source;
    else if (regexes.length > 1) {
      json.allOf = [
        ...regexes.map((regex) => ({
          ...(ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0"
            ? ({ type: "string" } as const)
            : {}),
          pattern: regex.source,
        })),
      ];
    }
  }
};

export const numberProcessor: Processor<schemas.$ZodNumber> = (schema, ctx, _json, _params) => {
  const json = _json as JSONSchema.NumberSchema | JSONSchema.IntegerSchema;
  const { minimum, maximum, format, multipleOf, exclusiveMaximum, exclusiveMinimum } = schema._zod.bag;
  if (typeof format === "string" && format.includes("int")) json.type = "integer";
  else json.type = "number";

  // when both minimum and exclusiveMinimum exist, pick the more restrictive one
  const exMin = typeof exclusiveMinimum === "number" && exclusiveMinimum >= (minimum ?? Number.NEGATIVE_INFINITY);
  const exMax = typeof exclusiveMaximum === "number" && exclusiveMaximum <= (maximum ?? Number.POSITIVE_INFINITY);
  const legacy = ctx.target === "draft-04" || ctx.target === "openapi-3.0";

  if (exMin) {
    if (legacy) {
      json.minimum = exclusiveMinimum;
      json.exclusiveMinimum = true;
    } else {
      json.exclusiveMinimum = exclusiveMinimum;
    }
  } else if (typeof minimum === "number") {
    json.minimum = minimum;
  }

  if (exMax) {
    if (legacy) {
      json.maximum = exclusiveMaximum;
      json.exclusiveMaximum = true;
    } else {
      json.exclusiveMaximum = exclusiveMaximum;
    }
  } else if (typeof maximum === "number") {
    json.maximum = maximum;
  }

  if (typeof multipleOf === "number") json.multipleOf = multipleOf;
};

export const booleanProcessor: Processor<schemas.$ZodBoolean> = (_schema, _ctx, json, _params) => {
  (json as JSONSchema.BooleanSchema).type = "boolean";
};

export const bigintProcessor: Processor<schemas.$ZodBigInt> = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("BigInt cannot be represented in JSON Schema");
  }
};

export const symbolProcessor: Processor<schemas.$ZodSymbol> = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Symbols cannot be represented in JSON Schema");
  }
};

export const nullProcessor: Processor<schemas.$ZodNull> = (_schema, ctx, json, _params) => {
  if (ctx.target === "openapi-3.0") {
    json.type = "string";
    json.nullable = true;
    json.enum = [null];
  } else {
    json.type = "null";
  }
};

export const undefinedProcessor: Processor<schemas.$ZodUndefined> = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Undefined cannot be represented in JSON Schema");
  }
};

export const voidProcessor: Processor<schemas.$ZodVoid> = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Void cannot be represented in JSON Schema");
  }
};

export const neverProcessor: Processor<schemas.$ZodNever> = (_schema, _ctx, json, _params) => {
  json.not = {};
};

export const anyProcessor: Processor<schemas.$ZodAny> = (_schema, _ctx, _json, _params) => {
  // empty schema accepts anything
};

export const unknownProcessor: Processor<schemas.$ZodUnknown> = (_schema, _ctx, _json, _params) => {
  // empty schema accepts anything
};

export const dateProcessor: Processor<schemas.$ZodDate> = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Date cannot be represented in JSON Schema");
  }
};

export const enumProcessor: Processor<schemas.$ZodEnum> = (schema, _ctx, json, _params) => {
  const def = schema._zod.def as schemas.$ZodEnumDef;
  const values = getEnumValues(def.entries);
  // Number enums can have both string and number values
  if (values.every((v) => typeof v === "number")) json.type = "number";
  if (values.every((v) => typeof v === "string")) json.type = "string";
  json.enum = values;
};

export const literalProcessor: Processor<schemas.$ZodLiteral> = (schema, ctx, json, _params) => {
  const def = schema._zod.def as schemas.$ZodLiteralDef<any>;
  const vals: (string | number | boolean | null)[] = [];
  for (const val of def.values) {
    if (val === undefined) {
      if (ctx.unrepresentable === "throw") {
        throw new Error("Literal `undefined` cannot be represented in JSON Schema");
      } else {
        // do not add to vals
      }
    } else if (typeof val === "bigint") {
      if (ctx.unrepresentable === "throw") {
        throw new Error("BigInt literals cannot be represented in JSON Schema");
      } else {
        vals.push(Number(val));
      }
    } else {
      vals.push(val);
    }
  }
  if (vals.length === 0) {
    // do nothing (an undefined literal was stripped)
  } else if (vals.length === 1) {
    const val = vals[0]!;
    json.type = val === null ? ("null" as const) : (typeof val as any);
    if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") {
      json.enum = [val];
    } else {
      json.const = val;
    }
  } else {
    if (vals.every((v) => typeof v === "number")) json.type = "number";
    if (vals.every((v) => typeof v === "string")) json.type = "string";
    if (vals.every((v) => typeof v === "boolean")) json.type = "boolean";
    if (vals.every((v) => v === null)) json.type = "null";
    json.enum = vals;
  }
};

export const nanProcessor: Processor<schemas.$ZodNaN> = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("NaN cannot be represented in JSON Schema");
  }
};

export const templateLiteralProcessor: Processor<schemas.$ZodTemplateLiteral> = (schema, _ctx, json, _params) => {
  const _json = json as JSONSchema.StringSchema;
  const pattern = schema._zod.pattern;
  if (!pattern) throw new Error("Pattern not found in template literal");
  _json.type = "string";
  _json.pattern = pattern.source;
};

export const fileProcessor: Processor<schemas.$ZodFile> = (schema, _ctx, json, _params) => {
  const _json = json as JSONSchema.StringSchema;
  const file: JSONSchema.StringSchema = {
    type: "string",
    format: "binary",
    contentEncoding: "binary",
  };

  const { minimum, maximum, mime } = schema._zod.bag as schemas.$ZodFileInternals["bag"];
  if (minimum !== undefined) file.minLength = minimum;
  if (maximum !== undefined) file.maxLength = maximum;
  if (mime) {
    if (mime.length === 1) {
      file.contentMediaType = mime[0]!;
      Object.assign(_json, file);
    } else {
      Object.assign(_json, file); // shared props at root
      _json.anyOf = mime.map((m) => ({ contentMediaType: m })); // only contentMediaType differs
    }
  } else {
    Object.assign(_json, file);
  }
};

export const successProcessor: Processor<schemas.$ZodSuccess> = (_schema, _ctx, json, _params) => {
  (json as JSONSchema.BooleanSchema).type = "boolean";
};

export const customProcessor: Processor<schemas.$ZodCustom> = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Custom types cannot be represented in JSON Schema");
  }
};

export const functionProcessor: Processor<schemas.$ZodFunction> = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Function types cannot be represented in JSON Schema");
  }
};

export const transformProcessor: Processor<schemas.$ZodTransform> = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Transforms cannot be represented in JSON Schema");
  }
};

export const mapProcessor: Processor<schemas.$ZodMap> = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Map cannot be represented in JSON Schema");
  }
};

export const setProcessor: Processor<schemas.$ZodSet> = (_schema, ctx, _json, _params) => {
  if (ctx.unrepresentable === "throw") {
    throw new Error("Set cannot be represented in JSON Schema");
  }
};

// ==================== COMPOSITE TYPE PROCESSORS ====================

export const arrayProcessor: Processor<schemas.$ZodArray> = (schema, ctx, _json, params) => {
  const json = _json as JSONSchema.ArraySchema;
  const def = schema._zod.def as schemas.$ZodArrayDef;
  const { minimum, maximum } = schema._zod.bag;
  if (typeof minimum === "number") json.minItems = minimum;
  if (typeof maximum === "number") json.maxItems = maximum;

  json.type = "array";
  json.items = process(def.element, ctx as any, {
    ...params,
    path: [...params.path, "items"],
  });
};

export const objectProcessor: Processor<schemas.$ZodObject> = (schema, ctx, _json, params) => {
  const json = _json as JSONSchema.ObjectSchema;
  const def = schema._zod.def as schemas.$ZodObjectDef;
  json.type = "object";
  json.properties = {};
  const shape = def.shape;

  for (const key in shape) {
    json.properties[key] = process(shape[key]!, ctx as any, {
      ...params,
      path: [...params.path, "properties", key],
    });
  }

  // required keys
  const allKeys = new Set(Object.keys(shape));
  const requiredKeys = new Set(
    [...allKeys].filter((key) => {
      const v = def.shape[key]!._zod;
      if (ctx.io === "input") {
        return v.optin === undefined;
      } else {
        return v.optout === undefined;
      }
    })
  );

  if (requiredKeys.size > 0) {
    json.required = Array.from(requiredKeys);
  }

  // catchall
  if (def.catchall?._zod.def.type === "never") {
    // strict
    json.additionalProperties = false;
  } else if (!def.catchall) {
    // regular
    if (ctx.io === "output") json.additionalProperties = false;
  } else if (def.catchall) {
    json.additionalProperties = process(def.catchall, ctx as any, {
      ...params,
      path: [...params.path, "additionalProperties"],
    });
  }
};

export const unionProcessor: Processor<schemas.$ZodUnion> = (schema, ctx, json, params) => {
  const def = schema._zod.def as schemas.$ZodUnionDef;
  // Exclusive unions (inclusive === false) use oneOf (exactly one match) instead of anyOf (one or more matches)
  // This includes both z.xor() and discriminated unions
  const isExclusive = def.inclusive === false;
  const options = def.options.map((x, i) =>
    process(x, ctx as any, {
      ...params,
      path: [...params.path, isExclusive ? "oneOf" : "anyOf", i],
    })
  );
  if (isExclusive) {
    json.oneOf = options;
  } else {
    json.anyOf = options;
  }
};

export const intersectionProcessor: Processor<schemas.$ZodIntersection> = (schema, ctx, json, params) => {
  const def = schema._zod.def as schemas.$ZodIntersectionDef;
  const a = process(def.left, ctx as any, {
    ...params,
    path: [...params.path, "allOf", 0],
  });
  const b = process(def.right, ctx as any, {
    ...params,
    path: [...params.path, "allOf", 1],
  });

  const isSimpleIntersection = (val: any) => "allOf" in val && Object.keys(val).length === 1;
  const allOf = [
    ...(isSimpleIntersection(a) ? (a.allOf as any[]) : [a]),
    ...(isSimpleIntersection(b) ? (b.allOf as any[]) : [b]),
  ];
  json.allOf = allOf;
};

export const tupleProcessor: Processor<schemas.$ZodTuple> = (schema, ctx, _json, params) => {
  const json = _json as JSONSchema.ArraySchema;
  const def = schema._zod.def as schemas.$ZodTupleDef;
  json.type = "array";

  const prefixPath = ctx.target === "draft-2020-12" ? "prefixItems" : "items";
  const restPath =
    ctx.target === "draft-2020-12" ? "items" : ctx.target === "openapi-3.0" ? "items" : "additionalItems";

  const prefixItems = def.items.map((x, i) =>
    process(x, ctx as any, {
      ...params,
      path: [...params.path, prefixPath, i],
    })
  );
  const rest = def.rest
    ? process(def.rest, ctx as any, {
        ...params,
        path: [...params.path, restPath, ...(ctx.target === "openapi-3.0" ? [def.items.length] : [])],
      })
    : null;

  if (ctx.target === "draft-2020-12") {
    json.prefixItems = prefixItems;
    if (rest) {
      json.items = rest;
    }
  } else if (ctx.target === "openapi-3.0") {
    json.items = {
      anyOf: prefixItems,
    };

    if (rest) {
      json.items.anyOf!.push(rest);
    }
    json.minItems = prefixItems.length;
    if (!rest) {
      json.maxItems = prefixItems.length;
    }
  } else {
    json.items = prefixItems;
    if (rest) {
      json.additionalItems = rest;
    }
  }

  // length
  const { minimum, maximum } = schema._zod.bag as {
    minimum?: number;
    maximum?: number;
  };
  if (typeof minimum === "number") json.minItems = minimum;
  if (typeof maximum === "number") json.maxItems = maximum;
};

export const recordProcessor: Processor<schemas.$ZodRecord> = (schema, ctx, _json, params) => {
  const json = _json as JSONSchema.ObjectSchema;
  const def = schema._zod.def as schemas.$ZodRecordDef;
  json.type = "object";

  // For looseRecord with regex patterns, use patternProperties
  // This correctly represents "only validate keys matching the pattern" semantics
  // and composes well with allOf (intersections)
  const keyType = def.keyType as schemas.$ZodTypes;
  const keyBag = keyType._zod.bag as schemas.$ZodStringInternals<unknown>["bag"] | undefined;
  const patterns = keyBag?.patterns;

  if (def.mode === "loose" && patterns && patterns.size > 0) {
    // Use patternProperties for looseRecord with regex patterns
    const valueSchema = process(def.valueType, ctx as any, {
      ...params,
      path: [...params.path, "patternProperties", "*"],
    });
    json.patternProperties = {};
    for (const pattern of patterns) {
      json.patternProperties[pattern.source] = valueSchema;
    }
  } else {
    // Default behavior: use propertyNames + additionalProperties
    if (ctx.target === "draft-07" || ctx.target === "draft-2020-12") {
      json.propertyNames = process(def.keyType, ctx as any, {
        ...params,
        path: [...params.path, "propertyNames"],
      });
    }
    json.additionalProperties = process(def.valueType, ctx as any, {
      ...params,
      path: [...params.path, "additionalProperties"],
    });
  }

  // Add required for keys with discrete values (enum, literal, etc.)
  const keyValues = keyType._zod.values;
  if (keyValues) {
    const validKeyValues = [...keyValues].filter(
      (v): v is string | number => typeof v === "string" || typeof v === "number"
    );

    if (validKeyValues.length > 0) {
      json.required = validKeyValues as string[];
    }
  }
};

export const nullableProcessor: Processor<schemas.$ZodNullable> = (schema, ctx, json, params) => {
  const def = schema._zod.def as schemas.$ZodNullableDef;
  const inner = process(def.innerType, ctx as any, params);
  const seen = ctx.seen.get(schema)!;
  if (ctx.target === "openapi-3.0") {
    seen.ref = def.innerType;
    json.nullable = true;
  } else {
    json.anyOf = [inner, { type: "null" }];
  }
};

export const nonoptionalProcessor: Processor<schemas.$ZodNonOptional> = (schema, ctx, _json, params) => {
  const def = schema._zod.def as schemas.$ZodNonOptionalDef;
  process(def.innerType, ctx as any, params);
  const seen = ctx.seen.get(schema)!;
  seen.ref = def.innerType;
};

export const defaultProcessor: Processor<schemas.$ZodDefault> = (schema, ctx, json, params) => {
  const def = schema._zod.def as schemas.$ZodDefaultDef;
  process(def.innerType, ctx as any, params);
  const seen = ctx.seen.get(schema)!;
  seen.ref = def.innerType;
  json.default = JSON.parse(JSON.stringify(def.defaultValue));
};

export const prefaultProcessor: Processor<schemas.$ZodPrefault> = (schema, ctx, json, params) => {
  const def = schema._zod.def as schemas.$ZodPrefaultDef;
  process(def.innerType, ctx as any, params);
  const seen = ctx.seen.get(schema)!;
  seen.ref = def.innerType;
  if (ctx.io === "input") json._prefault = JSON.parse(JSON.stringify(def.defaultValue));
};

export const catchProcessor: Processor<schemas.$ZodCatch> = (schema, ctx, json, params) => {
  const def = schema._zod.def as schemas.$ZodCatchDef;
  process(def.innerType, ctx as any, params);
  const seen = ctx.seen.get(schema)!;
  seen.ref = def.innerType;
  let catchValue: any;
  try {
    catchValue = def.catchValue(undefined as any);
  } catch {
    throw new Error("Dynamic catch values are not supported in JSON Schema");
  }
  json.default = catchValue;
};

export const pipeProcessor: Processor<schemas.$ZodPipe> = (schema, ctx, _json, params) => {
  const def = schema._zod.def as schemas.$ZodPipeDef;
  const inIsTransform = def.in._zod.traits.has("$ZodTransform");
  const innerType = ctx.io === "input" ? (inIsTransform ? def.out : def.in) : def.out;
  process(innerType, ctx as any, params);
  const seen = ctx.seen.get(schema)!;
  seen.ref = innerType;
};

export const readonlyProcessor: Processor<schemas.$ZodReadonly> = (schema, ctx, json, params) => {
  const def = schema._zod.def as schemas.$ZodReadonlyDef;
  process(def.innerType, ctx as any, params);
  const seen = ctx.seen.get(schema)!;
  seen.ref = def.innerType;
  json.readOnly = true;
};

export const promiseProcessor: Processor<schemas.$ZodPromise> = (schema, ctx, _json, params) => {
  const def = schema._zod.def as schemas.$ZodPromiseDef;
  process(def.innerType, ctx as any, params);
  const seen = ctx.seen.get(schema)!;
  seen.ref = def.innerType;
};

export const optionalProcessor: Processor<schemas.$ZodOptional> = (schema, ctx, _json, params) => {
  const def = schema._zod.def as schemas.$ZodOptionalDef;
  process(def.innerType, ctx as any, params);
  const seen = ctx.seen.get(schema)!;
  seen.ref = def.innerType;
};

export const lazyProcessor: Processor<schemas.$ZodLazy> = (schema, ctx, _json, params) => {
  const innerType = (schema as schemas.$ZodLazy)._zod.innerType;
  process(innerType, ctx as any, params);
  const seen = ctx.seen.get(schema)!;
  seen.ref = innerType;
};

// ==================== ALL PROCESSORS ====================

export const allProcessors: Record<string, Processor<any>> = {
  string: stringProcessor,
  number: numberProcessor,
  boolean: booleanProcessor,
  bigint: bigintProcessor,
  symbol: symbolProcessor,
  null: nullProcessor,
  undefined: undefinedProcessor,
  void: voidProcessor,
  never: neverProcessor,
  any: anyProcessor,
  unknown: unknownProcessor,
  date: dateProcessor,
  enum: enumProcessor,
  literal: literalProcessor,
  nan: nanProcessor,
  template_literal: templateLiteralProcessor,
  file: fileProcessor,
  success: successProcessor,
  custom: customProcessor,
  function: functionProcessor,
  transform: transformProcessor,
  map: mapProcessor,
  set: setProcessor,
  array: arrayProcessor,
  object: objectProcessor,
  union: unionProcessor,
  intersection: intersectionProcessor,
  tuple: tupleProcessor,
  record: recordProcessor,
  nullable: nullableProcessor,
  nonoptional: nonoptionalProcessor,
  default: defaultProcessor,
  prefault: prefaultProcessor,
  catch: catchProcessor,
  pipe: pipeProcessor,
  readonly: readonlyProcessor,
  promise: promiseProcessor,
  optional: optionalProcessor,
  lazy: lazyProcessor,
};

// ==================== TOP-LEVEL toJSONSchema ====================

export function toJSONSchema<T extends schemas.$ZodType>(
  schema: T,
  params?: ToJSONSchemaParams
): ZodStandardJSONSchemaPayload<T>;
export function toJSONSchema(
  registry: $ZodRegistry<{ id?: string | undefined }>,
  params?: RegistryToJSONSchemaParams
): { schemas: Record<string, ZodStandardJSONSchemaPayload<schemas.$ZodType>> };
export function toJSONSchema(
  input: schemas.$ZodType | $ZodRegistry<{ id?: string | undefined }>,
  params?: ToJSONSchemaParams | RegistryToJSONSchemaParams
): any {
  if ("_idmap" in input) {
    // Registry case
    const registry = input as $ZodRegistry<{ id?: string | undefined }>;
    const ctx = initializeContext({ ...params, processors: allProcessors });
    const defs: any = {};

    // First pass: process all schemas to build the seen map
    for (const entry of registry._idmap.entries()) {
      const [_, schema] = entry;
      process(schema, ctx as any);
    }

    const schemas: Record<string, JSONSchema.BaseSchema> = {};
    const external = {
      registry,
      uri: (params as RegistryToJSONSchemaParams)?.uri,
      defs,
    };

    // Update the context with external configuration
    ctx.external = external;

    // Second pass: emit each schema
    for (const entry of registry._idmap.entries()) {
      const [key, schema] = entry;
      extractDefs(ctx as any, schema);
      schemas[key] = finalize(ctx as any, schema);
    }

    if (Object.keys(defs).length > 0) {
      const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
      schemas.__shared = {
        [defsSegment]: defs,
      };
    }

    return { schemas };
  }

  // Single schema case
  const ctx = initializeContext({ ...params, processors: allProcessors });
  process(input, ctx as any);
  extractDefs(ctx as any, input);
  return finalize(ctx as any, input);
}
