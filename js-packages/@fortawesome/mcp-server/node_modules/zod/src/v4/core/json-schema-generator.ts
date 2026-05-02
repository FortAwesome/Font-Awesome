import { allProcessors } from "./json-schema-processors.js";
import type * as JSONSchema from "./json-schema.js";
import type { $ZodRegistry } from "./registries.js";
import type * as schemas from "./schemas.js";
import {
  type JSONSchemaGeneratorParams,
  type ProcessParams,
  type Seen,
  type ToJSONSchemaContext,
  extractDefs,
  finalize,
  initializeContext,
  process,
} from "./to-json-schema.js";

/**
 * Parameters for the emit method of JSONSchemaGenerator.
 * @deprecated Use toJSONSchema function instead
 */
export type EmitParams = Pick<JSONSchemaGeneratorParams, "cycles" | "reused" | "external">;

/**
 * Parameters for JSONSchemaGenerator constructor.
 * @deprecated Use toJSONSchema function instead
 */
type JSONSchemaGeneratorConstructorParams = Pick<
  JSONSchemaGeneratorParams,
  "metadata" | "target" | "unrepresentable" | "override" | "io"
>;

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
export class JSONSchemaGenerator {
  private ctx: ToJSONSchemaContext;

  /** @deprecated Access via ctx instead */
  get metadataRegistry(): $ZodRegistry<Record<string, any>> {
    return this.ctx.metadataRegistry;
  }
  /** @deprecated Access via ctx instead */
  get target() {
    return this.ctx.target;
  }
  /** @deprecated Access via ctx instead */
  get unrepresentable() {
    return this.ctx.unrepresentable;
  }
  /** @deprecated Access via ctx instead */
  get override() {
    return this.ctx.override;
  }
  /** @deprecated Access via ctx instead */
  get io() {
    return this.ctx.io;
  }
  /** @deprecated Access via ctx instead */
  get counter() {
    return this.ctx.counter;
  }
  set counter(value: number) {
    this.ctx.counter = value;
  }
  /** @deprecated Access via ctx instead */
  get seen(): Map<schemas.$ZodType, Seen> {
    return this.ctx.seen;
  }

  constructor(params?: JSONSchemaGeneratorConstructorParams) {
    // Normalize target for internal context
    let normalizedTarget: ToJSONSchemaContext["target"] = params?.target ?? "draft-2020-12";
    if (normalizedTarget === "draft-4") normalizedTarget = "draft-04";
    if (normalizedTarget === "draft-7") normalizedTarget = "draft-07";

    this.ctx = initializeContext({
      processors: allProcessors,
      target: normalizedTarget,
      ...(params?.metadata && { metadata: params.metadata }),
      ...(params?.unrepresentable && { unrepresentable: params.unrepresentable }),
      ...(params?.override && { override: params.override as any }),
      ...(params?.io && { io: params.io }),
    });
  }

  /**
   * Process a schema to prepare it for JSON Schema generation.
   * This must be called before emit().
   */
  process(schema: schemas.$ZodType, _params: ProcessParams = { path: [], schemaPath: [] }): JSONSchema.BaseSchema {
    return process(schema, this.ctx, _params);
  }

  /**
   * Emit the final JSON Schema after processing.
   * Must call process() first.
   */
  emit(schema: schemas.$ZodType, _params?: EmitParams): JSONSchema.BaseSchema {
    // Apply emit params to the context
    if (_params) {
      if (_params.cycles) this.ctx.cycles = _params.cycles;
      if (_params.reused) this.ctx.reused = _params.reused;
      if (_params.external) this.ctx.external = _params.external;
    }

    extractDefs(this.ctx, schema);
    const result = finalize(this.ctx, schema);

    // Strip ~standard property to match old implementation's return type
    const { "~standard": _, ...plainResult } = result as any;
    return plainResult as JSONSchema.BaseSchema;
  }
}
