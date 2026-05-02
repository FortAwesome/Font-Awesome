"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONSchemaGenerator = void 0;
const json_schema_processors_js_1 = require("./json-schema-processors.cjs");
const to_json_schema_js_1 = require("./to-json-schema.cjs");
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
class JSONSchemaGenerator {
    /** @deprecated Access via ctx instead */
    get metadataRegistry() {
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
    set counter(value) {
        this.ctx.counter = value;
    }
    /** @deprecated Access via ctx instead */
    get seen() {
        return this.ctx.seen;
    }
    constructor(params) {
        // Normalize target for internal context
        let normalizedTarget = params?.target ?? "draft-2020-12";
        if (normalizedTarget === "draft-4")
            normalizedTarget = "draft-04";
        if (normalizedTarget === "draft-7")
            normalizedTarget = "draft-07";
        this.ctx = (0, to_json_schema_js_1.initializeContext)({
            processors: json_schema_processors_js_1.allProcessors,
            target: normalizedTarget,
            ...(params?.metadata && { metadata: params.metadata }),
            ...(params?.unrepresentable && { unrepresentable: params.unrepresentable }),
            ...(params?.override && { override: params.override }),
            ...(params?.io && { io: params.io }),
        });
    }
    /**
     * Process a schema to prepare it for JSON Schema generation.
     * This must be called before emit().
     */
    process(schema, _params = { path: [], schemaPath: [] }) {
        return (0, to_json_schema_js_1.process)(schema, this.ctx, _params);
    }
    /**
     * Emit the final JSON Schema after processing.
     * Must call process() first.
     */
    emit(schema, _params) {
        // Apply emit params to the context
        if (_params) {
            if (_params.cycles)
                this.ctx.cycles = _params.cycles;
            if (_params.reused)
                this.ctx.reused = _params.reused;
            if (_params.external)
                this.ctx.external = _params.external;
        }
        (0, to_json_schema_js_1.extractDefs)(this.ctx, schema);
        const result = (0, to_json_schema_js_1.finalize)(this.ctx, schema);
        // Strip ~standard property to match old implementation's return type
        const { "~standard": _, ...plainResult } = result;
        return plainResult;
    }
}
exports.JSONSchemaGenerator = JSONSchemaGenerator;
