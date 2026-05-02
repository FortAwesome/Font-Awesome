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
exports.fromJSONSchema = fromJSONSchema;
const registries_js_1 = require("../core/registries.cjs");
const _checks = __importStar(require("./checks.cjs"));
const _iso = __importStar(require("./iso.cjs"));
const _schemas = __importStar(require("./schemas.cjs"));
// Local z object to avoid circular dependency with ../index.js
const z = {
    ..._schemas,
    ..._checks,
    iso: _iso,
};
// Keys that are recognized and handled by the conversion logic
const RECOGNIZED_KEYS = /*@__PURE__*/ new Set([
    // Schema identification
    "$schema",
    "$ref",
    "$defs",
    "definitions",
    // Core schema keywords
    "$id",
    "id",
    "$comment",
    "$anchor",
    "$vocabulary",
    "$dynamicRef",
    "$dynamicAnchor",
    // Type
    "type",
    "enum",
    "const",
    // Composition
    "anyOf",
    "oneOf",
    "allOf",
    "not",
    // Object
    "properties",
    "required",
    "additionalProperties",
    "patternProperties",
    "propertyNames",
    "minProperties",
    "maxProperties",
    // Array
    "items",
    "prefixItems",
    "additionalItems",
    "minItems",
    "maxItems",
    "uniqueItems",
    "contains",
    "minContains",
    "maxContains",
    // String
    "minLength",
    "maxLength",
    "pattern",
    "format",
    // Number
    "minimum",
    "maximum",
    "exclusiveMinimum",
    "exclusiveMaximum",
    "multipleOf",
    // Already handled metadata
    "description",
    "default",
    // Content
    "contentEncoding",
    "contentMediaType",
    "contentSchema",
    // Unsupported (error-throwing)
    "unevaluatedItems",
    "unevaluatedProperties",
    "if",
    "then",
    "else",
    "dependentSchemas",
    "dependentRequired",
    // OpenAPI
    "nullable",
    "readOnly",
]);
function detectVersion(schema, defaultTarget) {
    const $schema = schema.$schema;
    if ($schema === "https://json-schema.org/draft/2020-12/schema") {
        return "draft-2020-12";
    }
    if ($schema === "http://json-schema.org/draft-07/schema#") {
        return "draft-7";
    }
    if ($schema === "http://json-schema.org/draft-04/schema#") {
        return "draft-4";
    }
    // Use defaultTarget if provided, otherwise default to draft-2020-12
    return defaultTarget ?? "draft-2020-12";
}
function resolveRef(ref, ctx) {
    if (!ref.startsWith("#")) {
        throw new Error("External $ref is not supported, only local refs (#/...) are allowed");
    }
    const path = ref.slice(1).split("/").filter(Boolean);
    // Handle root reference "#"
    if (path.length === 0) {
        return ctx.rootSchema;
    }
    const defsKey = ctx.version === "draft-2020-12" ? "$defs" : "definitions";
    if (path[0] === defsKey) {
        const key = path[1];
        if (!key || !ctx.defs[key]) {
            throw new Error(`Reference not found: ${ref}`);
        }
        return ctx.defs[key];
    }
    throw new Error(`Reference not found: ${ref}`);
}
function convertBaseSchema(schema, ctx) {
    // Handle unsupported features
    if (schema.not !== undefined) {
        // Special case: { not: {} } represents never
        if (typeof schema.not === "object" && Object.keys(schema.not).length === 0) {
            return z.never();
        }
        throw new Error("not is not supported in Zod (except { not: {} } for never)");
    }
    if (schema.unevaluatedItems !== undefined) {
        throw new Error("unevaluatedItems is not supported");
    }
    if (schema.unevaluatedProperties !== undefined) {
        throw new Error("unevaluatedProperties is not supported");
    }
    if (schema.if !== undefined || schema.then !== undefined || schema.else !== undefined) {
        throw new Error("Conditional schemas (if/then/else) are not supported");
    }
    if (schema.dependentSchemas !== undefined || schema.dependentRequired !== undefined) {
        throw new Error("dependentSchemas and dependentRequired are not supported");
    }
    // Handle $ref
    if (schema.$ref) {
        const refPath = schema.$ref;
        if (ctx.refs.has(refPath)) {
            return ctx.refs.get(refPath);
        }
        if (ctx.processing.has(refPath)) {
            // Circular reference - use lazy
            return z.lazy(() => {
                if (!ctx.refs.has(refPath)) {
                    throw new Error(`Circular reference not resolved: ${refPath}`);
                }
                return ctx.refs.get(refPath);
            });
        }
        ctx.processing.add(refPath);
        const resolved = resolveRef(refPath, ctx);
        const zodSchema = convertSchema(resolved, ctx);
        ctx.refs.set(refPath, zodSchema);
        ctx.processing.delete(refPath);
        return zodSchema;
    }
    // Handle enum
    if (schema.enum !== undefined) {
        const enumValues = schema.enum;
        // Special case: OpenAPI 3.0 null representation { type: "string", nullable: true, enum: [null] }
        if (ctx.version === "openapi-3.0" &&
            schema.nullable === true &&
            enumValues.length === 1 &&
            enumValues[0] === null) {
            return z.null();
        }
        if (enumValues.length === 0) {
            return z.never();
        }
        if (enumValues.length === 1) {
            return z.literal(enumValues[0]);
        }
        // Check if all values are strings
        if (enumValues.every((v) => typeof v === "string")) {
            return z.enum(enumValues);
        }
        // Mixed types - use union of literals
        const literalSchemas = enumValues.map((v) => z.literal(v));
        if (literalSchemas.length < 2) {
            return literalSchemas[0];
        }
        return z.union([literalSchemas[0], literalSchemas[1], ...literalSchemas.slice(2)]);
    }
    // Handle const
    if (schema.const !== undefined) {
        return z.literal(schema.const);
    }
    // Handle type
    const type = schema.type;
    if (Array.isArray(type)) {
        // Expand type array into anyOf union
        const typeSchemas = type.map((t) => {
            const typeSchema = { ...schema, type: t };
            return convertBaseSchema(typeSchema, ctx);
        });
        if (typeSchemas.length === 0) {
            return z.never();
        }
        if (typeSchemas.length === 1) {
            return typeSchemas[0];
        }
        return z.union(typeSchemas);
    }
    if (!type) {
        // No type specified - empty schema (any)
        return z.any();
    }
    let zodSchema;
    switch (type) {
        case "string": {
            let stringSchema = z.string();
            // Apply format using .check() with Zod format functions
            if (schema.format) {
                const format = schema.format;
                // Map common formats to Zod check functions
                if (format === "email") {
                    stringSchema = stringSchema.check(z.email());
                }
                else if (format === "uri" || format === "uri-reference") {
                    stringSchema = stringSchema.check(z.url());
                }
                else if (format === "uuid" || format === "guid") {
                    stringSchema = stringSchema.check(z.uuid());
                }
                else if (format === "date-time") {
                    stringSchema = stringSchema.check(z.iso.datetime());
                }
                else if (format === "date") {
                    stringSchema = stringSchema.check(z.iso.date());
                }
                else if (format === "time") {
                    stringSchema = stringSchema.check(z.iso.time());
                }
                else if (format === "duration") {
                    stringSchema = stringSchema.check(z.iso.duration());
                }
                else if (format === "ipv4") {
                    stringSchema = stringSchema.check(z.ipv4());
                }
                else if (format === "ipv6") {
                    stringSchema = stringSchema.check(z.ipv6());
                }
                else if (format === "mac") {
                    stringSchema = stringSchema.check(z.mac());
                }
                else if (format === "cidr") {
                    stringSchema = stringSchema.check(z.cidrv4());
                }
                else if (format === "cidr-v6") {
                    stringSchema = stringSchema.check(z.cidrv6());
                }
                else if (format === "base64") {
                    stringSchema = stringSchema.check(z.base64());
                }
                else if (format === "base64url") {
                    stringSchema = stringSchema.check(z.base64url());
                }
                else if (format === "e164") {
                    stringSchema = stringSchema.check(z.e164());
                }
                else if (format === "jwt") {
                    stringSchema = stringSchema.check(z.jwt());
                }
                else if (format === "emoji") {
                    stringSchema = stringSchema.check(z.emoji());
                }
                else if (format === "nanoid") {
                    stringSchema = stringSchema.check(z.nanoid());
                }
                else if (format === "cuid") {
                    stringSchema = stringSchema.check(z.cuid());
                }
                else if (format === "cuid2") {
                    stringSchema = stringSchema.check(z.cuid2());
                }
                else if (format === "ulid") {
                    stringSchema = stringSchema.check(z.ulid());
                }
                else if (format === "xid") {
                    stringSchema = stringSchema.check(z.xid());
                }
                else if (format === "ksuid") {
                    stringSchema = stringSchema.check(z.ksuid());
                }
                // Note: json-string format is not currently supported by Zod
                // Custom formats are ignored - keep as plain string
            }
            // Apply constraints
            if (typeof schema.minLength === "number") {
                stringSchema = stringSchema.min(schema.minLength);
            }
            if (typeof schema.maxLength === "number") {
                stringSchema = stringSchema.max(schema.maxLength);
            }
            if (schema.pattern) {
                // JSON Schema patterns are not implicitly anchored (match anywhere in string)
                stringSchema = stringSchema.regex(new RegExp(schema.pattern));
            }
            zodSchema = stringSchema;
            break;
        }
        case "number":
        case "integer": {
            let numberSchema = type === "integer" ? z.number().int() : z.number();
            // Apply constraints
            if (typeof schema.minimum === "number") {
                numberSchema = numberSchema.min(schema.minimum);
            }
            if (typeof schema.maximum === "number") {
                numberSchema = numberSchema.max(schema.maximum);
            }
            if (typeof schema.exclusiveMinimum === "number") {
                numberSchema = numberSchema.gt(schema.exclusiveMinimum);
            }
            else if (schema.exclusiveMinimum === true && typeof schema.minimum === "number") {
                numberSchema = numberSchema.gt(schema.minimum);
            }
            if (typeof schema.exclusiveMaximum === "number") {
                numberSchema = numberSchema.lt(schema.exclusiveMaximum);
            }
            else if (schema.exclusiveMaximum === true && typeof schema.maximum === "number") {
                numberSchema = numberSchema.lt(schema.maximum);
            }
            if (typeof schema.multipleOf === "number") {
                numberSchema = numberSchema.multipleOf(schema.multipleOf);
            }
            zodSchema = numberSchema;
            break;
        }
        case "boolean": {
            zodSchema = z.boolean();
            break;
        }
        case "null": {
            zodSchema = z.null();
            break;
        }
        case "object": {
            const shape = {};
            const properties = schema.properties || {};
            const requiredSet = new Set(schema.required || []);
            // Convert properties - mark optional ones
            for (const [key, propSchema] of Object.entries(properties)) {
                const propZodSchema = convertSchema(propSchema, ctx);
                // If not in required array, make it optional
                shape[key] = requiredSet.has(key) ? propZodSchema : propZodSchema.optional();
            }
            // Handle propertyNames
            if (schema.propertyNames) {
                const keySchema = convertSchema(schema.propertyNames, ctx);
                const valueSchema = schema.additionalProperties && typeof schema.additionalProperties === "object"
                    ? convertSchema(schema.additionalProperties, ctx)
                    : z.any();
                // Case A: No properties (pure record)
                if (Object.keys(shape).length === 0) {
                    zodSchema = z.record(keySchema, valueSchema);
                    break;
                }
                // Case B: With properties (intersection of object and looseRecord)
                const objectSchema = z.object(shape).passthrough();
                const recordSchema = z.looseRecord(keySchema, valueSchema);
                zodSchema = z.intersection(objectSchema, recordSchema);
                break;
            }
            // Handle patternProperties
            if (schema.patternProperties) {
                // patternProperties: keys matching pattern must satisfy corresponding schema
                // Use loose records so non-matching keys pass through
                const patternProps = schema.patternProperties;
                const patternKeys = Object.keys(patternProps);
                const looseRecords = [];
                for (const pattern of patternKeys) {
                    const patternValue = convertSchema(patternProps[pattern], ctx);
                    const keySchema = z.string().regex(new RegExp(pattern));
                    looseRecords.push(z.looseRecord(keySchema, patternValue));
                }
                // Build intersection: object schema + all pattern property records
                const schemasToIntersect = [];
                if (Object.keys(shape).length > 0) {
                    // Use passthrough so patternProperties can validate additional keys
                    schemasToIntersect.push(z.object(shape).passthrough());
                }
                schemasToIntersect.push(...looseRecords);
                if (schemasToIntersect.length === 0) {
                    zodSchema = z.object({}).passthrough();
                }
                else if (schemasToIntersect.length === 1) {
                    zodSchema = schemasToIntersect[0];
                }
                else {
                    // Chain intersections: (A & B) & C & D ...
                    let result = z.intersection(schemasToIntersect[0], schemasToIntersect[1]);
                    for (let i = 2; i < schemasToIntersect.length; i++) {
                        result = z.intersection(result, schemasToIntersect[i]);
                    }
                    zodSchema = result;
                }
                break;
            }
            // Handle additionalProperties
            // In JSON Schema, additionalProperties defaults to true (allow any extra properties)
            // In Zod, objects strip unknown keys by default, so we need to handle this explicitly
            const objectSchema = z.object(shape);
            if (schema.additionalProperties === false) {
                // Strict mode - no extra properties allowed
                zodSchema = objectSchema.strict();
            }
            else if (typeof schema.additionalProperties === "object") {
                // Extra properties must match the specified schema
                zodSchema = objectSchema.catchall(convertSchema(schema.additionalProperties, ctx));
            }
            else {
                // additionalProperties is true or undefined - allow any extra properties (passthrough)
                zodSchema = objectSchema.passthrough();
            }
            break;
        }
        case "array": {
            // TODO: uniqueItems is not supported
            // TODO: contains/minContains/maxContains are not supported
            // Check if this is a tuple (prefixItems or items as array)
            const prefixItems = schema.prefixItems;
            const items = schema.items;
            if (prefixItems && Array.isArray(prefixItems)) {
                // Tuple with prefixItems (draft-2020-12)
                const tupleItems = prefixItems.map((item) => convertSchema(item, ctx));
                const rest = items && typeof items === "object" && !Array.isArray(items)
                    ? convertSchema(items, ctx)
                    : undefined;
                if (rest) {
                    zodSchema = z.tuple(tupleItems).rest(rest);
                }
                else {
                    zodSchema = z.tuple(tupleItems);
                }
                // Apply minItems/maxItems constraints to tuples
                if (typeof schema.minItems === "number") {
                    zodSchema = zodSchema.check(z.minLength(schema.minItems));
                }
                if (typeof schema.maxItems === "number") {
                    zodSchema = zodSchema.check(z.maxLength(schema.maxItems));
                }
            }
            else if (Array.isArray(items)) {
                // Tuple with items array (draft-7)
                const tupleItems = items.map((item) => convertSchema(item, ctx));
                const rest = schema.additionalItems && typeof schema.additionalItems === "object"
                    ? convertSchema(schema.additionalItems, ctx)
                    : undefined; // additionalItems: false means no rest, handled by default tuple behavior
                if (rest) {
                    zodSchema = z.tuple(tupleItems).rest(rest);
                }
                else {
                    zodSchema = z.tuple(tupleItems);
                }
                // Apply minItems/maxItems constraints to tuples
                if (typeof schema.minItems === "number") {
                    zodSchema = zodSchema.check(z.minLength(schema.minItems));
                }
                if (typeof schema.maxItems === "number") {
                    zodSchema = zodSchema.check(z.maxLength(schema.maxItems));
                }
            }
            else if (items !== undefined) {
                // Regular array
                const element = convertSchema(items, ctx);
                let arraySchema = z.array(element);
                // Apply constraints
                if (typeof schema.minItems === "number") {
                    arraySchema = arraySchema.min(schema.minItems);
                }
                if (typeof schema.maxItems === "number") {
                    arraySchema = arraySchema.max(schema.maxItems);
                }
                zodSchema = arraySchema;
            }
            else {
                // No items specified - array of any
                zodSchema = z.array(z.any());
            }
            break;
        }
        default:
            throw new Error(`Unsupported type: ${type}`);
    }
    return zodSchema;
}
function convertSchema(schema, ctx) {
    if (typeof schema === "boolean") {
        return schema ? z.any() : z.never();
    }
    // Convert base schema first (ignoring composition keywords)
    let baseSchema = convertBaseSchema(schema, ctx);
    const hasExplicitType = schema.type || schema.enum !== undefined || schema.const !== undefined;
    // Process composition keywords LAST (they can appear together)
    // Handle anyOf - wrap base schema with union
    if (schema.anyOf && Array.isArray(schema.anyOf)) {
        const options = schema.anyOf.map((s) => convertSchema(s, ctx));
        const anyOfUnion = z.union(options);
        baseSchema = hasExplicitType ? z.intersection(baseSchema, anyOfUnion) : anyOfUnion;
    }
    // Handle oneOf - exclusive union (exactly one must match)
    if (schema.oneOf && Array.isArray(schema.oneOf)) {
        const options = schema.oneOf.map((s) => convertSchema(s, ctx));
        const oneOfUnion = z.xor(options);
        baseSchema = hasExplicitType ? z.intersection(baseSchema, oneOfUnion) : oneOfUnion;
    }
    // Handle allOf - wrap base schema with intersection
    if (schema.allOf && Array.isArray(schema.allOf)) {
        if (schema.allOf.length === 0) {
            baseSchema = hasExplicitType ? baseSchema : z.any();
        }
        else {
            let result = hasExplicitType ? baseSchema : convertSchema(schema.allOf[0], ctx);
            const startIdx = hasExplicitType ? 0 : 1;
            for (let i = startIdx; i < schema.allOf.length; i++) {
                result = z.intersection(result, convertSchema(schema.allOf[i], ctx));
            }
            baseSchema = result;
        }
    }
    // Handle nullable (OpenAPI 3.0)
    if (schema.nullable === true && ctx.version === "openapi-3.0") {
        baseSchema = z.nullable(baseSchema);
    }
    // Handle readOnly
    if (schema.readOnly === true) {
        baseSchema = z.readonly(baseSchema);
    }
    // Apply `default` so it wraps the fully-composed schema. This ensures
    // `parse(undefined) -> default` works regardless of which branch of
    // `convertBaseSchema` produced the inner schema (enum/const/not/typed/etc.).
    if (schema.default !== undefined) {
        baseSchema = baseSchema.default(schema.default);
    }
    // Collect non-description annotation metadata into the user-supplied
    // registry. Description is handled separately below via `.describe()` to
    // preserve the contract that `schema.description` reads from globalRegistry.
    const extraMeta = {};
    const coreMetadataKeys = ["$id", "id", "$comment", "$anchor", "$vocabulary", "$dynamicRef", "$dynamicAnchor"];
    for (const key of coreMetadataKeys) {
        if (key in schema) {
            extraMeta[key] = schema[key];
        }
    }
    const contentMetadataKeys = ["contentEncoding", "contentMediaType", "contentSchema"];
    for (const key of contentMetadataKeys) {
        if (key in schema) {
            extraMeta[key] = schema[key];
        }
    }
    for (const key of Object.keys(schema)) {
        if (!RECOGNIZED_KEYS.has(key)) {
            extraMeta[key] = schema[key];
        }
    }
    if (Object.keys(extraMeta).length > 0) {
        ctx.registry.add(baseSchema, extraMeta);
    }
    // Apply description last. `.describe()` clones the schema and sets
    // `_zod.parent` on the clone, so registry lookups on the returned reference
    // still resolve `extraMeta` via parent inheritance.
    if (schema.description) {
        baseSchema = baseSchema.describe(schema.description);
    }
    return baseSchema;
}
/**
 * Converts a JSON Schema to a Zod schema. This function should be considered semi-experimental. It's behavior is liable to change. */
function fromJSONSchema(schema, params) {
    // Handle boolean schemas
    if (typeof schema === "boolean") {
        return schema ? z.any() : z.never();
    }
    // Normalize input via a JSON round-trip. This guarantees the converter
    // walks a plain, finite, JSON-valid object graph: cyclic inputs fail here,
    // getter/Proxy-based properties are materialized into static values, and
    // class instances collapse to plain objects.
    let normalized;
    try {
        normalized = JSON.parse(JSON.stringify(schema));
    }
    catch {
        throw new Error("fromJSONSchema input is not valid JSON (possibly cyclic); use $defs/$ref for recursive schemas");
    }
    const version = detectVersion(normalized, params?.defaultTarget);
    const defs = (normalized.$defs || normalized.definitions || {});
    const ctx = {
        version,
        defs,
        refs: new Map(),
        processing: new Set(),
        rootSchema: normalized,
        registry: params?.registry ?? registries_js_1.globalRegistry,
    };
    return convertSchema(normalized, ctx);
}
