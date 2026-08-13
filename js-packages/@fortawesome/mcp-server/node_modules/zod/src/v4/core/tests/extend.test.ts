import { expect, test } from "vitest";
import * as z from "zod/v4";

test("safeExtend chaining preserves and overrides properties", () => {
  const schema1 = z.object({
    email: z.string(),
  });

  const schema2 = schema1.safeExtend({
    email: schema1.shape.email.check(z.email()),
  });

  const schema3 = schema2.safeExtend({
    email: schema2.shape.email.or(z.literal("")),
  });

  schema3.parse({ email: "test@example.com" });
});

test("extend with constructor field in shape", () => {
  const baseSchema = z.object({
    name: z.string(),
  });

  const extendedSchema = baseSchema.extend({
    constructor: z.string(),
    age: z.number(),
  });

  const result = extendedSchema.parse({
    name: "John",
    constructor: "Person",
    age: 30,
  });

  expect(result).toEqual({
    name: "John",
    constructor: "Person",
    age: 30,
  });

  const testCases = [
    { name: "Test", constructor: 123, age: 25 },
    { name: "Test", constructor: null, age: 25 },
    { name: "Test", constructor: true, age: 25 },
    { name: "Test", constructor: {}, age: 25 },
  ];

  for (const testCase of testCases) {
    const anyConstructorSchema = baseSchema.extend({
      constructor: z.any(),
      age: z.number(),
    });

    expect(() => anyConstructorSchema.parse(testCase)).not.toThrow();
    const parsed = anyConstructorSchema.parse(testCase);
    expect(parsed).toEqual(testCase);
  }
});
