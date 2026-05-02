import { expect, expectTypeOf, test } from "vitest";

import * as z from "zod/v4";

test("function parsing", () => {
  const schema = z.union([z.string().refine(() => false), z.number().refine(() => false)]);
  const result = schema.safeParse("asdf");
  expect(result.success).toEqual(false);
});

test("union 2", () => {
  const result = z.union([z.number(), z.string().refine(() => false)]).safeParse("a");
  expect(result.success).toEqual(false);
});

test("return valid over invalid", () => {
  const schema = z.union([
    z.object({
      email: z.string().email(),
    }),
    z.string(),
  ]);
  expect(schema.parse("asdf")).toEqual("asdf");
  expect(schema.parse({ email: "asdlkjf@lkajsdf.com" })).toEqual({
    email: "asdlkjf@lkajsdf.com",
  });
});

test("return errors from both union arms", () => {
  const result = z.union([z.number(), z.boolean()]).safeParse("a");
  expect(result.success).toEqual(false);
  if (!result.success) {
    expect(result.error.issues).toMatchInlineSnapshot(`
      [
        {
          "code": "invalid_union",
          "errors": [
            [
              {
                "code": "invalid_type",
                "expected": "number",
                "message": "Invalid input: expected number, received string",
                "path": [],
              },
            ],
            [
              {
                "code": "invalid_type",
                "expected": "boolean",
                "message": "Invalid input: expected boolean, received string",
                "path": [],
              },
            ],
          ],
          "message": "Invalid input",
          "path": [],
        },
      ]
    `);
  }
});

test("options getter", async () => {
  const union = z.union([z.string(), z.number()]);
  union.options[0].parse("asdf");
  union.options[1].parse(1234);
  await union.options[0].parseAsync("asdf");
  await union.options[1].parseAsync(1234);
});

test("readonly union", async () => {
  const options = [z.string(), z.number()] as const;
  const union = z.union(options);
  union.parse("asdf");
  union.parse(12);
});

test("union inferred types", () => {
  const test = z.object({}).or(z.array(z.object({})));

  type Test = z.output<typeof test>; // <— any
  expectTypeOf<Test>().toEqualTypeOf<Record<string, never> | Array<Record<string, never>>>();
});

test("union values", () => {
  const schema = z.union([z.literal("a"), z.literal("b"), z.literal("c")]);

  expect(schema._zod.values).toMatchInlineSnapshot(`
    Set {
      "a",
      "b",
      "c",
    }
  `);
});

test("non-aborted errors", () => {
  const zItemTest = z.union([
    z.object({
      date: z.number(),
      startDate: z.optional(z.null()),
      endDate: z.optional(z.null()),
    }),
    z
      .object({
        date: z.optional(z.null()),
        startDate: z.number(),
        endDate: z.number(),
      })
      .refine((data) => data.startDate !== data.endDate, {
        error: "startDate and endDate must be different",
        path: ["endDate"],
      }),
  ]);

  const res = zItemTest.safeParse({
    date: null,
    startDate: 1,
    endDate: 1,
  });

  expect(res).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "code": "custom",
        "path": [
          "endDate"
        ],
        "message": "startDate and endDate must be different"
      }
    ]],
      "success": false,
    }
  `);
});

test("surface continuable errors only if they exist", () => {
  const schema = z.union([z.boolean(), z.uuid(), z.jwt()]);

  expect(schema.safeParse("asdf")).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "code": "invalid_union",
        "errors": [
          [
            {
              "expected": "boolean",
              "code": "invalid_type",
              "path": [],
              "message": "Invalid input: expected boolean, received string"
            }
          ],
          [
            {
              "origin": "string",
              "code": "invalid_format",
              "format": "uuid",
              "pattern": "/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/",
              "path": [],
              "message": "Invalid UUID"
            }
          ],
          [
            {
              "code": "invalid_format",
              "format": "jwt",
              "path": [],
              "message": "Invalid JWT"
            }
          ]
        ],
        "path": [],
        "message": "Invalid input"
      }
    ]],
      "success": false,
    }
  `);
});

// z.xor() tests
test("z.xor() - exactly one match succeeds", () => {
  const schema = z.xor([z.string(), z.number()]);
  expect(schema.parse("hello")).toBe("hello");
  expect(schema.parse(42)).toBe(42);
});

test("z.xor() - zero matches fails", () => {
  const schema = z.xor([z.string(), z.number()]);
  const result = schema.safeParse(true);
  expect(result.success).toBe(false);
});

test("z.xor() - multiple matches fails", () => {
  const schema = z.xor([z.string(), z.any()]);
  const result = schema.safeParse("hello");
  expect(result.success).toBe(false);
  if (!result.success) {
    expect(result.error.issues[0].code).toBe("invalid_union");
    expect((result.error.issues[0] as any).inclusive).toBe(false);
  }
});

test("z.xor() with custom error message", () => {
  const schema = z.xor([z.string(), z.number()], "Expected exactly one of string or number");
  const result = schema.safeParse(true);
  expect(result.success).toBe(false);
  if (!result.success) {
    expect(result.error.issues[0].message).toBe("Expected exactly one of string or number");
  }
});

test("z.xor() type inference", () => {
  const schema = z.xor([z.string(), z.number(), z.boolean()]);
  type Result = z.infer<typeof schema>;
  expectTypeOf<Result>().toEqualTypeOf<string | number | boolean>();
});

test("z.union([]) constructs and rejects all input", () => {
  const schema = z.union([]);
  expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<never>();
  const result = schema.safeParse("anything");
  expect(result.success).toEqual(false);
  if (!result.success) {
    expect(result.error.issues).toMatchInlineSnapshot(`
      [
        {
          "code": "invalid_union",
          "errors": [],
          "message": "Invalid input",
          "path": [],
        },
      ]
    `);
  }
});

test("z.xor([]) constructs and rejects all input", () => {
  const schema = z.xor([]);
  expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<never>();
  const result = schema.safeParse("anything");
  expect(result.success).toEqual(false);
  if (!result.success) {
    expect(result.error.issues).toMatchInlineSnapshot(`
      [
        {
          "code": "invalid_union",
          "errors": [],
          "message": "Invalid input",
          "path": [],
        },
      ]
    `);
  }
});

test("z.discriminatedUnion with empty options constructs and rejects", () => {
  const schema = z.discriminatedUnion("type", [] as any);
  const nonObject = schema.safeParse("nope");
  expect(nonObject.success).toEqual(false);
  if (!nonObject.success) {
    expect(nonObject.error.issues[0].code).toBe("invalid_type");
  }
  const obj = schema.safeParse({ type: "x" });
  expect(obj.success).toEqual(false);
  if (!obj.success) {
    expect(obj.error.issues[0].code).toBe("invalid_union");
    expect((obj.error.issues[0] as any).errors).toEqual([]);
    expect((obj.error.issues[0] as any).options).toEqual([]);
  }
});
