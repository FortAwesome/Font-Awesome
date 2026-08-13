import type * as core from "../core/index.js";
import type * as JSONSchema from "./json-schema.js";
import { type $ZodRegistry } from "./registries.js";
import type * as schemas from "./schemas.js";
import type { StandardJSONSchemaV1, StandardSchemaWithJSONProps } from "./standard-schema.js";
export type Processor<T extends schemas.$ZodType = schemas.$ZodType> = (schema: T, ctx: ToJSONSchemaContext, json: JSONSchema.BaseSchema, params: ProcessParams) => void;
export interface JSONSchemaGeneratorParams {
    processors: Record<string, Processor>;
    /** A registry used to look up metadata for each schema. Any schema with an `id` property will be extracted as a $def.
     *  @default globalRegistry */
    metadata?: $ZodRegistry<Record<string, any>>;
    /** The JSON Schema version to target.
     * - `"draft-2020-12"` — Default. JSON Schema Draft 2020-12
     * - `"draft-07"` — JSON Schema Draft 7
     * - `"draft-04"` — JSON Schema Draft 4
     * - `"openapi-3.0"` — OpenAPI 3.0 Schema Object */
    target?: "draft-04" | "draft-07" | "draft-2020-12" | "openapi-3.0" | ({} & string) | undefined;
    /** How to handle unrepresentable types.
     * - `"throw"` — Default. Unrepresentable types throw an error
     * - `"any"` — Unrepresentable types become `{}` */
    unrepresentable?: "throw" | "any";
    /** Arbitrary custom logic that can be used to modify the generated JSON Schema. */
    override?: (ctx: {
        zodSchema: schemas.$ZodTypes;
        jsonSchema: JSONSchema.BaseSchema;
        path: (string | number)[];
    }) => void;
    /** Whether to extract the `"input"` or `"output"` type. Relevant to transforms, defaults, coerced primitives, etc.
     * - `"output"` — Default. Convert the output schema.
     * - `"input"` — Convert the input schema. */
    io?: "input" | "output";
    cycles?: "ref" | "throw";
    reused?: "ref" | "inline";
    external?: {
        registry: $ZodRegistry<{
            id?: string | undefined;
        }>;
        uri?: ((id: string) => string) | undefined;
        defs: Record<string, JSONSchema.BaseSchema>;
    } | undefined;
}
/**
 * Parameters for the toJSONSchema function.
 */
export type ToJSONSchemaParams = Omit<JSONSchemaGeneratorParams, "processors" | "external">;
/**
 * Parameters for the toJSONSchema function when passing a registry.
 */
export interface RegistryToJSONSchemaParams extends ToJSONSchemaParams {
    uri?: (id: string) => string;
}
export interface ProcessParams {
    schemaPath: schemas.$ZodType[];
    path: (string | number)[];
}
export interface Seen {
    /** JSON Schema result for this Zod schema */
    schema: JSONSchema.BaseSchema;
    /** A cached version of the schema that doesn't get overwritten during ref resolution */
    def?: JSONSchema.BaseSchema;
    defId?: string | undefined;
    /** Number of times this schema was encountered during traversal */
    count: number;
    /** Cycle path */
    cycle?: (string | number)[] | undefined;
    isParent?: boolean | undefined;
    /** Schema to inherit JSON Schema properties from (set by processor for wrappers) */
    ref?: schemas.$ZodType | null;
    /** JSON Schema property path for this schema */
    path?: (string | number)[] | undefined;
}
export interface ToJSONSchemaContext {
    processors: Record<string, Processor>;
    metadataRegistry: $ZodRegistry<Record<string, any>>;
    target: "draft-04" | "draft-07" | "draft-2020-12" | "openapi-3.0" | ({} & string);
    unrepresentable: "throw" | "any";
    override: (ctx: {
        zodSchema: schemas.$ZodType;
        jsonSchema: JSONSchema.BaseSchema;
        path: (string | number)[];
    }) => void;
    io: "input" | "output";
    counter: number;
    seen: Map<schemas.$ZodType, Seen>;
    cycles: "ref" | "throw";
    reused: "ref" | "inline";
    external?: {
        registry: $ZodRegistry<{
            id?: string | undefined;
        }>;
        uri?: ((id: string) => string) | undefined;
        defs: Record<string, JSONSchema.BaseSchema>;
    } | undefined;
}
export declare function initializeContext(params: JSONSchemaGeneratorParams): ToJSONSchemaContext;
export declare function process<T extends schemas.$ZodType>(schema: T, ctx: ToJSONSchemaContext, _params?: ProcessParams): JSONSchema.BaseSchema;
export declare function extractDefs<T extends schemas.$ZodType>(ctx: ToJSONSchemaContext, schema: T): void;
export declare function finalize<T extends schemas.$ZodType>(ctx: ToJSONSchemaContext, schema: T): ZodStandardJSONSchemaPayload<T>;
export type ZodStandardSchemaWithJSON<T> = StandardSchemaWithJSONProps<core.input<T>, core.output<T>>;
export interface ZodStandardJSONSchemaPayload<T> extends JSONSchema.BaseSchema {
    "~standard": ZodStandardSchemaWithJSON<T>;
}
/**
 * Creates a toJSONSchema method for a schema instance.
 * This encapsulates the logic of initializing context, processing, extracting defs, and finalizing.
 */
export declare const createToJSONSchemaMethod: <T extends schemas.$ZodType>(schema: T, processors?: Record<string, Processor>) => (params?: ToJSONSchemaParams) => ZodStandardJSONSchemaPayload<T>;
/**
 * Creates a toJSONSchema method for a schema instance.
 * This encapsulates the logic of initializing context, processing, extracting defs, and finalizing.
 */
type StandardJSONSchemaMethodParams = Parameters<StandardJSONSchemaV1["~standard"]["jsonSchema"]["input"]>[0];
export declare const createStandardJSONSchemaMethod: <T extends schemas.$ZodType>(schema: T, io: "input" | "output", processors?: Record<string, Processor>) => (params?: StandardJSONSchemaMethodParams) => JSONSchema.BaseSchema;
export {};
