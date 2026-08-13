import { expect, test } from "vitest";
import * as z from "zod/v4";

test("record should parse objects with non-function constructor field", () => {
  const schema = z.record(z.string(), z.any());

  expect(() => schema.parse({ constructor: "string", key: "value" })).not.toThrow();

  const result1 = schema.parse({ constructor: "string", key: "value" });
  expect(result1).toEqual({ constructor: "string", key: "value" });

  expect(() => schema.parse({ constructor: 123, key: "value" })).not.toThrow();

  const result2 = schema.parse({ constructor: 123, key: "value" });
  expect(result2).toEqual({ constructor: 123, key: "value" });

  expect(() => schema.parse({ constructor: null, key: "value" })).not.toThrow();

  const result3 = schema.parse({ constructor: null, key: "value" });
  expect(result3).toEqual({ constructor: null, key: "value" });

  expect(() => schema.parse({ constructor: {}, key: "value" })).not.toThrow();

  const result4 = schema.parse({ constructor: {}, key: "value" });
  expect(result4).toEqual({ constructor: {}, key: "value" });

  expect(() => schema.parse({ constructor: [], key: "value" })).not.toThrow();

  const result5 = schema.parse({ constructor: [], key: "value" });
  expect(result5).toEqual({ constructor: [], key: "value" });

  expect(() => schema.parse({ constructor: true, key: "value" })).not.toThrow();

  const result6 = schema.parse({ constructor: true, key: "value" });
  expect(result6).toEqual({ constructor: true, key: "value" });
});

test("record should still work with normal objects", () => {
  const schema = z.record(z.string(), z.string());

  expect(() => schema.parse({ normalKey: "value" })).not.toThrow();

  const result1 = schema.parse({ normalKey: "value" });
  expect(result1).toEqual({ normalKey: "value" });

  expect(() => schema.parse({ key1: "value1", key2: "value2" })).not.toThrow();

  const result2 = schema.parse({ key1: "value1", key2: "value2" });
  expect(result2).toEqual({ key1: "value1", key2: "value2" });
});

test("record should validate values according to schema even with constructor field", () => {
  const stringSchema = z.record(z.string(), z.string());

  expect(() => stringSchema.parse({ constructor: "string", key: "value" })).not.toThrow();

  expect(() => stringSchema.parse({ constructor: 123, key: "value" })).toThrow();
});

test("record should work with different key types and constructor field", () => {
  const enumSchema = z.record(z.enum(["constructor", "key"]), z.string());

  expect(() => enumSchema.parse({ constructor: "value1", key: "value2" })).not.toThrow();

  const result = enumSchema.parse({ constructor: "value1", key: "value2" });
  expect(result).toEqual({ constructor: "value1", key: "value2" });
});

test("record should skip non-enumerable own properties", () => {
  const schema = z.record(z.string(), z.string());

  const input = { key: "value" };
  Object.defineProperty(input, "~standard", {
    value: { validate: () => {}, vendor: "zod", version: 1 },
    enumerable: false,
    writable: false,
    configurable: false,
  });

  const result = schema.safeParse(input);
  expect(result.success).toBe(true);
  if (result.success) {
    expect(result.data).toEqual({ key: "value" });
    expect("~standard" in result.data).toBe(false);
  }
});

test("record fails on enumerable invalid values even when non-enumerable properties are present", () => {
  const schema = z.record(z.string(), z.string());

  const input = { key: "value", bad: 123 };
  Object.defineProperty(input, "hidden", {
    value: "should be ignored",
    enumerable: false,
  });

  const result = schema.safeParse(input);
  expect(result.success).toBe(false);
});

test("record validates enumerable Symbol keys and skips non-enumerable Symbol keys", () => {
  const enumerableSym = Symbol.for("included");
  const nonEnumerableSym = Symbol.for("hidden");
  const schema = z.record(z.symbol(), z.string());

  const input: Record<symbol, unknown> = { [enumerableSym]: "value" };
  Object.defineProperty(input, nonEnumerableSym, {
    value: 123,
    enumerable: false,
  });

  const result = schema.safeParse(input);
  expect(result.success).toBe(true);
  if (result.success) {
    expect(result.data[enumerableSym]).toBe("value");
    expect(Object.prototype.hasOwnProperty.call(result.data, nonEnumerableSym)).toBe(false);
  }
});

test("z.json() accepts z.toJSONSchema() output (issue #5714)", () => {
  const schema = z.object({ name: z.string() });
  const jsonSchema = z.toJSONSchema(schema);

  expect(z.json().safeParse(jsonSchema).success).toBe(true);
});
