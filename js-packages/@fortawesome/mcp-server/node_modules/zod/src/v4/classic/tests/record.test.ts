import { expect, expectTypeOf, test } from "vitest";
import * as z from "zod/v4";

test("type inference", () => {
  const booleanRecord = z.record(z.string(), z.boolean());
  type booleanRecord = typeof booleanRecord._output;

  const recordWithEnumKeys = z.record(z.enum(["Tuna", "Salmon"]), z.string());
  type recordWithEnumKeys = z.infer<typeof recordWithEnumKeys>;

  const recordWithLiteralKey = z.record(z.literal(["Tuna", "Salmon", 21]), z.string());
  type recordWithLiteralKey = z.infer<typeof recordWithLiteralKey>;

  const recordWithLiteralUnionKeys = z.record(
    z.union([z.literal("Tuna"), z.literal("Salmon"), z.literal(21)]),
    z.string()
  );
  type recordWithLiteralUnionKeys = z.infer<typeof recordWithLiteralUnionKeys>;

  enum Enum {
    Tuna = 0,
    Salmon = "Shark",
  }

  const recordWithTypescriptEnum = z.record(z.enum(Enum), z.string());
  type recordWithTypescriptEnum = z.infer<typeof recordWithTypescriptEnum>;

  expectTypeOf<booleanRecord>().toEqualTypeOf<Record<string, boolean>>();
  expectTypeOf<recordWithEnumKeys>().toEqualTypeOf<Record<"Tuna" | "Salmon", string>>();
  expectTypeOf<recordWithLiteralKey>().toEqualTypeOf<Record<"Tuna" | "Salmon" | 21, string>>();
  expectTypeOf<recordWithLiteralUnionKeys>().toEqualTypeOf<Record<"Tuna" | "Salmon" | 21, string>>();
  expectTypeOf<recordWithTypescriptEnum>().toEqualTypeOf<Record<Enum, string>>();
});

test("enum exhaustiveness", () => {
  const schema = z.record(z.enum(["Tuna", "Salmon"]), z.string());
  expect(
    schema.parse({
      Tuna: "asdf",
      Salmon: "asdf",
    })
  ).toEqual({
    Tuna: "asdf",
    Salmon: "asdf",
  });

  expect(schema.safeParse({ Tuna: "asdf", Salmon: "asdf", Trout: "asdf" })).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "code": "unrecognized_keys",
        "keys": [
          "Trout"
        ],
        "path": [],
        "message": "Unrecognized key: \\"Trout\\""
      }
    ]],
      "success": false,
    }
  `);
  expect(schema.safeParse({ Tuna: "asdf" })).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "expected": "string",
        "code": "invalid_type",
        "path": [
          "Salmon"
        ],
        "message": "Invalid input: expected string, received undefined"
      }
    ]],
      "success": false,
    }
  `);
});

test("typescript enum exhaustiveness", () => {
  enum BigFish {
    Tuna = 0,
    Salmon = "Shark",
  }

  const schema = z.record(z.enum(BigFish), z.string());
  const value = {
    [BigFish.Tuna]: "asdf",
    [BigFish.Salmon]: "asdf",
  };

  expect(schema.parse(value)).toEqual(value);

  expect(schema.safeParse({ [BigFish.Tuna]: "asdf", [BigFish.Salmon]: "asdf", Trout: "asdf" })).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "code": "unrecognized_keys",
        "keys": [
          "Trout"
        ],
        "path": [],
        "message": "Unrecognized key: \\"Trout\\""
      }
    ]],
      "success": false,
    }
  `);
  expect(schema.safeParse({ [BigFish.Tuna]: "asdf" })).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "expected": "string",
        "code": "invalid_type",
        "path": [
          "Shark"
        ],
        "message": "Invalid input: expected string, received undefined"
      }
    ]],
      "success": false,
    }
  `);
  expect(schema.safeParse({ [BigFish.Salmon]: "asdf" })).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "expected": "string",
        "code": "invalid_type",
        "path": [
          0
        ],
        "message": "Invalid input: expected string, received undefined"
      }
    ]],
      "success": false,
    }
  `);
});

test("literal exhaustiveness", () => {
  const schema = z.record(z.literal(["Tuna", "Salmon", 21]), z.string());
  schema.parse({
    Tuna: "asdf",
    Salmon: "asdf",
    21: "asdf",
  });

  expect(schema.safeParse({ Tuna: "asdf", Salmon: "asdf", 21: "asdf", Trout: "asdf" })).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "code": "unrecognized_keys",
        "keys": [
          "Trout"
        ],
        "path": [],
        "message": "Unrecognized key: \\"Trout\\""
      }
    ]],
      "success": false,
    }
  `);
  expect(schema.safeParse({ Tuna: "asdf" })).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "expected": "string",
        "code": "invalid_type",
        "path": [
          "Salmon"
        ],
        "message": "Invalid input: expected string, received undefined"
      },
      {
        "expected": "string",
        "code": "invalid_type",
        "path": [
          21
        ],
        "message": "Invalid input: expected string, received undefined"
      }
    ]],
      "success": false,
    }
  `);
});

test("pipe exhaustiveness", () => {
  const schema = z.record(z.enum(["Tuna", "Salmon"]).pipe(z.any()), z.string());
  expect(schema.parse({ Tuna: "asdf", Salmon: "asdf" })).toEqual({
    Tuna: "asdf",
    Salmon: "asdf",
  });

  expect(schema.safeParse({ Tuna: "asdf", Salmon: "asdf", Trout: "asdf" })).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "code": "unrecognized_keys",
        "keys": [
          "Trout"
        ],
        "path": [],
        "message": "Unrecognized key: \\"Trout\\""
      }
    ]],
      "success": false,
    }
  `);
  expect(schema.safeParse({ Tuna: "asdf" })).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "expected": "string",
        "code": "invalid_type",
        "path": [
          "Salmon"
        ],
        "message": "Invalid input: expected string, received undefined"
      }
    ]],
      "success": false,
    }
  `);
});

test("union exhaustiveness", () => {
  const schema = z.record(z.union([z.literal("Tuna"), z.literal("Salmon"), z.literal(21)]), z.string());
  expect(schema.parse({ Tuna: "asdf", Salmon: "asdf", 21: "asdf" })).toEqual({
    Tuna: "asdf",
    Salmon: "asdf",
    21: "asdf",
  });

  expect(schema.safeParse({ Tuna: "asdf", Salmon: "asdf", 21: "asdf", Trout: "asdf" })).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "code": "unrecognized_keys",
        "keys": [
          "Trout"
        ],
        "path": [],
        "message": "Unrecognized key: \\"Trout\\""
      }
    ]],
      "success": false,
    }
  `);
  expect(schema.safeParse({ Tuna: "asdf" })).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "expected": "string",
        "code": "invalid_type",
        "path": [
          "Salmon"
        ],
        "message": "Invalid input: expected string, received undefined"
      },
      {
        "expected": "string",
        "code": "invalid_type",
        "path": [
          21
        ],
        "message": "Invalid input: expected string, received undefined"
      }
    ]],
      "success": false,
    }
  `);
});

test("applies transforms on the key schema (#5296)", () => {
  const single = z.record(
    z.literal("a").transform(() => "b" as const),
    z.string()
  );
  expect(single.parse({ a: "John" })).toEqual({ b: "John" });

  const multi = z.record(
    z.literal(["a", "b"]).transform((k) => k.toUpperCase()),
    z.number()
  );
  expect(multi.parse({ a: 1, b: 2 })).toEqual({ A: 1, B: 2 });

  // required-key semantics still hold when the keyType has a known value set
  expect(multi.safeParse({ a: 1 }).success).toBe(false);

  const en = z.record(
    z.enum(["a", "b"]).transform((k) => k.toUpperCase()),
    z.number()
  );
  expect(en.parse({ a: 1, b: 2 })).toEqual({ A: 1, B: 2 });

  // matches partialRecord, which already applied transforms
  const part = z.partialRecord(
    z.literal("a").transform(() => "b" as const),
    z.string()
  );
  expect(part.parse({ a: "John" })).toEqual({ b: "John" });
});

test("surfaces key schema refinement failures as invalid_key", () => {
  // refine rejects "b" but it's still in the literal's value set
  const schema = z.record(
    z.literal(["a", "b"]).refine((k) => k === "a", { message: "only 'a' is allowed" }),
    z.string()
  );

  expect(schema.safeParse({ a: "ok", b: "nope" })).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "code": "invalid_key",
        "origin": "record",
        "issues": [
          {
            "code": "custom",
            "path": [],
            "message": "only 'a' is allowed"
          }
        ],
        "path": [
          "b"
        ],
        "message": "Invalid key in record"
      }
    ]],
      "success": false,
    }
  `);
});

test("string record parse - pass", () => {
  const schema = z.record(z.string(), z.boolean());
  schema.parse({
    k1: true,
    k2: false,
    1234: false,
  });

  expect(schema.safeParse({ asdf: 1234 }).success).toEqual(false);
  expect(schema.safeParse("asdf")).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "expected": "record",
        "code": "invalid_type",
        "path": [],
        "message": "Invalid input: expected record, received string"
      }
    ]],
      "success": false,
    }
  `);
});

test("key and value getters", () => {
  const rec = z.record(z.string(), z.number());

  rec.keyType.parse("asdf");
  rec.valueType.parse(1234);
});

test("is not vulnerable to prototype pollution", async () => {
  const rec = z.record(
    z.string(),
    z.object({
      a: z.string(),
    })
  );

  const data = JSON.parse(`
    {
      "__proto__": {
        "a": "evil"
      },
      "b": {
        "a": "good"
      }
    }
  `);

  const obj1 = rec.parse(data);
  expect(obj1.a).toBeUndefined();

  const obj2 = rec.safeParse(data);
  expect(obj2.success).toBe(true);
  if (obj2.success) {
    expect(obj2.data.a).toBeUndefined();
  }

  const obj3 = await rec.parseAsync(data);
  expect(obj3.a).toBeUndefined();

  const obj4 = await rec.safeParseAsync(data);
  expect(obj4.success).toBe(true);
  if (obj4.success) {
    expect(obj4.data.a).toBeUndefined();
  }
});

test("dont remove undefined values", () => {
  const result1 = z.record(z.string(), z.any()).parse({ foo: undefined });

  expect(result1).toEqual({
    foo: undefined,
  });
});

test("allow undefined values", () => {
  const schema = z.record(z.string(), z.undefined());

  expect(
    Object.keys(
      schema.parse({
        _test: undefined,
      })
    )
  ).toEqual(["_test"]);
});

test("async parsing", async () => {
  const schema = z
    .record(
      z.string(),
      z
        .string()
        .optional()
        .refine(async () => true)
    )
    .refine(async () => true);

  const data = {
    foo: "bar",
    baz: "qux",
  };
  const result = await schema.safeParseAsync(data);
  expect(result.data).toEqual(data);
});

test("async parsing", async () => {
  const schema = z
    .record(
      z.string(),
      z
        .string()
        .optional()
        .refine(async () => false)
    )
    .refine(async () => false);

  const data = {
    foo: "bar",
    baz: "qux",
  };
  const result = await schema.safeParseAsync(data);
  expect(result.success).toEqual(false);
  expect(result.error).toMatchInlineSnapshot(`
    [ZodError: [
      {
        "code": "custom",
        "path": [
          "foo"
        ],
        "message": "Invalid input"
      },
      {
        "code": "custom",
        "path": [
          "baz"
        ],
        "message": "Invalid input"
      },
      {
        "code": "custom",
        "path": [],
        "message": "Invalid input"
      }
    ]]
  `);
});

test("partial record", () => {
  const schema = z.partialRecord(z.string(), z.string());
  type schema = z.infer<typeof schema>;
  expectTypeOf<schema>().toEqualTypeOf<Partial<Record<string, string>>>();

  const Keys = z.enum(["id", "name", "email"]); //.or(z.never());
  const Person = z.partialRecord(Keys, z.string());
  expectTypeOf<z.infer<typeof Person>>().toEqualTypeOf<Partial<Record<"id" | "name" | "email", string>>>();

  Person.parse({
    id: "123",
    // name: "John",
    // email: "john@example.com",
  });

  Person.parse({
    // id: "123",
    // name: "John",
    email: "john@example.com",
  });

  expect(Person.def.keyType._zod.def.type).toEqual("enum");
});

test("partialRecord with z.literal([key, ...])", () => {
  const Keys = z.literal(["id", "name", "email"]);
  const schema = z.partialRecord(Keys, z.string());
  type Schema = z.infer<typeof schema>;
  expectTypeOf<Schema>().toEqualTypeOf<Partial<Record<"id" | "name" | "email", string>>>();

  // Should parse valid partials
  expect(schema.parse({})).toEqual({});
  expect(schema.parse({ id: "1" })).toEqual({ id: "1" });
  expect(schema.parse({ name: "n", email: "e@example.com" })).toEqual({ name: "n", email: "e@example.com" });

  // Should fail with unrecognized key, error checked via inline snapshot
  expect(schema.safeParse({ foo: "bar" })).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "code": "invalid_key",
        "origin": "record",
        "issues": [
          {
            "code": "invalid_value",
            "values": [
              "id",
              "name",
              "email"
            ],
            "path": [],
            "message": "Invalid option: expected one of \\"id\\"|\\"name\\"|\\"email\\""
          }
        ],
        "path": [
          "foo"
        ],
        "message": "Invalid key in record"
      }
    ]],
      "success": false,
    }
  `);
});

test("partialRecord with numeric literal keys", () => {
  const Keys = z.literal([1, 2, 3]);
  const schema = z.partialRecord(Keys, z.string());
  type Schema = z.infer<typeof schema>;
  expectTypeOf<Schema>().toEqualTypeOf<Partial<Record<1 | 2 | 3, string>>>();

  // Should parse valid partials with numeric keys (as strings in JS objects)
  expect(schema.parse({})).toEqual({});
  expect(schema.parse({ 1: "one" })).toEqual({ 1: "one" });
  expect(schema.parse({ 2: "two", 3: "three" })).toEqual({ 2: "two", 3: "three" });

  // Should fail with unrecognized key
  expect(schema.safeParse({ 4: "four" }).success).toBe(false);
});

test("partialRecord with union of string and numeric literal keys", () => {
  const StringKeys = z.literal(["a", "b", "c"]);
  const NumericKeys = z.literal([1, 2, 3]);
  const schema = z.partialRecord(z.union([StringKeys, NumericKeys]), z.string());
  type Schema = z.infer<typeof schema>;
  expectTypeOf<Schema>().toEqualTypeOf<Partial<Record<"a" | "b" | "c" | 1 | 2 | 3, string>>>();

  // Should parse valid partials with mixed keys
  expect(schema.parse({})).toEqual({});
  expect(schema.parse({ a: "1", 2: "4" })).toEqual({ a: "1", 2: "4" });
  expect(schema.parse({ a: "a", b: "b", 1: "1", 2: "2" })).toEqual({ a: "a", b: "b", 1: "1", 2: "2" });

  // Should fail with unrecognized key
  expect(schema.safeParse({ d: "d" }).success).toBe(false);
  expect(schema.safeParse({ 4: "4" }).success).toBe(false);
});

test("looseRecord passes through non-matching keys", () => {
  const schema = z.looseRecord(z.string().regex(/^S_/), z.string());

  // Keys matching pattern are validated
  expect(schema.parse({ S_name: "John" })).toEqual({ S_name: "John" });
  expect(() => schema.parse({ S_name: 123 })).toThrow(); // wrong value type

  // Keys not matching pattern pass through unchanged
  expect(schema.parse({ S_name: "John", other: "value" })).toEqual({ S_name: "John", other: "value" });
  expect(schema.parse({ S_name: "John", count: 123 })).toEqual({ S_name: "John", count: 123 });
  expect(schema.parse({ other: "value" })).toEqual({ other: "value" });
});

test("intersection of loose records", () => {
  const schema = z.intersection(
    z.object({ name: z.string() }).passthrough(),
    z.intersection(
      z.looseRecord(z.string().regex(/^S_/), z.string()),
      z.looseRecord(z.string().regex(/^N_/), z.number())
    )
  );

  // Each pattern validates its matching keys
  const result = schema.parse({ name: "John", S_foo: "bar", N_count: 123 });
  expect(result.name).toBe("John");
  expect(result.S_foo).toBe("bar");
  expect(result.N_count).toBe(123);

  // Keys not matching any pattern pass through
  const result2 = schema.parse({ name: "John", S_foo: "bar", N_count: 123, other: "value" });
  expect(result2.other).toBe("value");

  // Validation errors still occur for matching keys
  expect(() => schema.parse({ name: "John", S_foo: 123 })).toThrow(); // S_foo should be string
  expect(() => schema.parse({ name: "John", N_count: "abc" })).toThrow(); // N_count should be number
});

test("object with looseRecord index signature", () => {
  // Simulates TypeScript index signature: { label: string; [key: `label:${string}`]: string }
  const schema = z.object({ label: z.string() }).and(z.looseRecord(z.string().regex(/^label:[a-z]{2}$/), z.string()));

  type Schema = z.infer<typeof schema>;
  expectTypeOf<Schema>().toEqualTypeOf<{ label: string } & Record<string, string>>();

  // Valid: has required property and matching pattern keys
  expect(schema.parse({ label: "Purple", "label:en": "Purple", "label:ru": "Пурпурный" })).toEqual({
    label: "Purple",
    "label:en": "Purple",
    "label:ru": "Пурпурный",
  });

  // Valid: just required property
  expect(schema.parse({ label: "Purple" })).toEqual({ label: "Purple" });

  // Invalid: missing required property
  expect(schema.safeParse({ "label:en": "Purple" })).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "expected": "string",
        "code": "invalid_type",
        "path": [
          "label"
        ],
        "message": "Invalid input: expected string, received undefined"
      }
    ]],
      "success": false,
    }
  `);

  // Invalid: pattern key with wrong value type
  expect(schema.safeParse({ label: "Purple", "label:en": 123 })).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "expected": "string",
        "code": "invalid_type",
        "path": [
          "label:en"
        ],
        "message": "Invalid input: expected string, received number"
      }
    ]],
      "success": false,
    }
  `);
});

test("numeric string keys", () => {
  const schema = z.record(z.number(), z.number());

  // Numeric string keys work
  expect(schema.parse({ 1: 100, 2: 200 })).toEqual({ 1: 100, 2: 200 });
  expect(schema.parse({ "1.5": 100, "-3": 200 })).toEqual({ "1.5": 100, "-3": 200 });

  // Non-numeric keys fail
  expect(schema.safeParse({ abc: 100 }).success).toBe(false);

  // Integer constraint is respected
  const intSchema = z.record(z.number().int(), z.number());
  expect(intSchema.parse({ 1: 100 })).toEqual({ 1: 100 });
  expect(intSchema.safeParse({ "1.5": 100 }).success).toBe(false);

  // Transforms on numeric keys work
  const transformedSchema = z.record(
    z.number().overwrite((n) => n * 2),
    z.string()
  );
  expect(transformedSchema.parse({ 5: "five", 10: "ten" })).toEqual({ 10: "five", 20: "ten" });
});

test("v3-compat single-arg form: z.record(valueType)", () => {
  // single arg should default keyType to z.string() and use the arg as valueType
  const schema = (z.record as any)(z.number());
  expect(schema.keyType._zod.def.type).toEqual("string");
  expect(schema.valueType._zod.def.type).toEqual("number");

  expect(schema.parse({ a: 1, b: 2 })).toEqual({ a: 1, b: 2 });
  expect(schema.safeParse({ a: "x" }).success).toBe(false);

  // params still flow through in the single-arg form
  const withMessage = (z.record as any)(z.number(), "must be a number record");
  expect(withMessage.keyType._zod.def.type).toEqual("string");
  expect(withMessage.valueType._zod.def.type).toEqual("number");

  // toJSONSchema should produce a well-formed schema (regression: previously produced
  // additionalProperties from undefined valueType, crashing process())
  const json = z.toJSONSchema(schema);
  expect(json).toMatchObject({
    type: "object",
    propertyNames: { type: "string" },
    additionalProperties: { type: "number" },
  });
});
