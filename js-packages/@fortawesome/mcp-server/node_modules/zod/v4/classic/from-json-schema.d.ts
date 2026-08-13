import type * as JSONSchema from "../core/json-schema.js";
import { type $ZodRegistry } from "../core/registries.js";
import type { ZodType } from "./schemas.js";
type JSONSchemaVersion = "draft-2020-12" | "draft-7" | "draft-4" | "openapi-3.0";
interface FromJSONSchemaParams {
    defaultTarget?: JSONSchemaVersion;
    registry?: $ZodRegistry<any>;
}
/**
 * Converts a JSON Schema to a Zod schema. This function should be considered semi-experimental. It's behavior is liable to change. */
export declare function fromJSONSchema(schema: JSONSchema.JSONSchema | boolean, params?: FromJSONSchemaParams): ZodType;
export {};
