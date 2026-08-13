import type * as JSONSchema from "./json-schema.js";
import type { $ZodRegistry } from "./registries.js";
import type * as schemas from "./schemas.js";
import { type JSONSchemaGeneratorParams, type ProcessParams, type Seen } from "./to-json-schema.js";
/**
 * Parameters for the emit method of JSONSchemaGenerator.
 * @deprecated Use toJSONSchema function instead
 */
export type EmitParams = Pick<JSONSchemaGeneratorParams, "cycles" | "reused" | "external">;
/**
 * Parameters for JSONSchemaGenerator constructor.
 * @deprecated Use toJSONSchema function instead
 */
type JSONSchemaGeneratorConstructorParams = Pick<JSONSchemaGeneratorParams, "metadata" | "target" | "unrepresentable" | "override" | "io">;
/**
 * Legacy class-based interface for JSON Schema generation.
 * This class wraps the new functional implementation to provide backward compatibility.
 *
 * @deprecated Use the `toJSONSchema` function instead for new code.
 *
 * @example
 * ```typescript
 * // Legacy usage (still supported)
 * const gen = new JSONSchemaGenerator({ target: "draft-07" });
 * gen.process(schema);
 * const result = gen.emit(schema);
 *
 * // Preferred modern usage
 * const result = toJSONSchema(schema, { target: "draft-07" });
 * ```
 */
export declare class JSONSchemaGenerator {
    private ctx;
    /** @deprecated Access via ctx instead */
    get metadataRegistry(): $ZodRegistry<Record<string, any>>;
    /** @deprecated Access via ctx instead */
    get target(): ({} & string) | "draft-2020-12" | "draft-07" | "openapi-3.0" | "draft-04";
    /** @deprecated Access via ctx instead */
    get unrepresentable(): "any" | "throw";
    /** @deprecated Access via ctx instead */
    get override(): (ctx: {
        zodSchema: schemas.$ZodType;
        jsonSchema: JSONSchema.BaseSchema;
        path: (string | number)[];
    }) => void;
    /** @deprecated Access via ctx instead */
    get io(): "input" | "output";
    /** @deprecated Access via ctx instead */
    get counter(): number;
    set counter(value: number);
    /** @deprecated Access via ctx instead */
    get seen(): Map<schemas.$ZodType, Seen>;
    constructor(params?: JSONSchemaGeneratorConstructorParams);
    /**
     * Process a schema to prepare it for JSON Schema generation.
     * This must be called before emit().
     */
    process(schema: schemas.$ZodType, _params?: ProcessParams): JSONSchema.BaseSchema;
    /**
     * Emit the final JSON Schema after processing.
     * Must call process() first.
     */
    emit(schema: schemas.$ZodType, _params?: EmitParams): JSONSchema.BaseSchema;
}
export {};
