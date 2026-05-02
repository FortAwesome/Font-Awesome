import { expect, expectTypeOf, test } from "vitest";
import * as z from "zod/v4";

const nested = z.object({
  name: z.string(),
  age: z.number(),
  outer: z.object({
    inner: z.string(),
  }),
  array: z.array(z.object({ asdf: z.string() })),
});

test("shallow inference", () => {
  const shallow = nested.partial();
  type shallow = z.infer<typeof shallow>;

  expectTypeOf<shallow>().toEqualTypeOf<{
    name?: string | undefined;
    age?: number | undefined;
    outer?: { inner: string } | undefined;
    array?: { asdf: string }[] | undefined;
  }>();
});

test("shallow partial parse", () => {
  const shallow = nested.partial();
  shallow.parse({});
  shallow.parse({
    name: "asdf",
    age: 23143,
  });
});

test("required", () => {
  const object = z.object({
    name: z.string(),
    age: z.number().optional(),
    field: z.string().optional().default("asdf"),
    nullableField: z.number().nullable(),
    nullishField: z.string().nullish(),
  });

  const requiredObject = object.required();
  expect(requiredObject.shape.name).toBeInstanceOf(z.ZodNonOptional);
  expect(requiredObject.shape.name.unwrap()).toBeInstanceOf(z.ZodString);
  expect(requiredObject.shape.age).toBeInstanceOf(z.ZodNonOptional);
  expect(requiredObject.shape.age.unwrap()).toBeInstanceOf(z.ZodOptional);
  expect(requiredObject.shape.field).toBeInstanceOf(z.ZodNonOptional);
  expect(requiredObject.shape.field.unwrap()).toBeInstanceOf(z.ZodDefault);
  expect(requiredObject.shape.nullableField).toBeInstanceOf(z.ZodNonOptional);
  expect(requiredObject.shape.nullableField.unwrap()).toBeInstanceOf(z.ZodNullable);
  expect(requiredObject.shape.nullishField).toBeInstanceOf(z.ZodNonOptional);
  expect(requiredObject.shape.nullishField.unwrap()).toBeInstanceOf(z.ZodOptional);
  expect(requiredObject.shape.nullishField.unwrap().unwrap()).toBeInstanceOf(z.ZodNullable);
});

test("required inference", () => {
  const object = z.object({
    name: z.string(),
    age: z.number().optional(),
    field: z.string().optional().default("asdf"),
    nullableField: z.number().nullable(),
    nullishField: z.string().nullish(),
  });

  const requiredObject = object.required();

  type required = z.infer<typeof requiredObject>;
  type expected = {
    name: string;
    age: number;
    field: string;
    nullableField: number | null;
    nullishField: string | null;
  };
  expectTypeOf<expected>().toEqualTypeOf<required>();
});

test("required with mask", () => {
  const object = z.object({
    name: z.string(),
    age: z.number().optional(),
    field: z.string().optional().default("asdf"),
    country: z.string().optional(),
  });

  const requiredObject = object.required({ age: true });
  expect(requiredObject.shape.name).toBeInstanceOf(z.ZodString);
  expect(requiredObject.shape.age).toBeInstanceOf(z.ZodNonOptional);
  expect(requiredObject.shape.field).toBeInstanceOf(z.ZodDefault);
  expect(requiredObject.shape.country).toBeInstanceOf(z.ZodOptional);
});

test("required with mask -- ignore falsy values", () => {
  const object = z.object({
    name: z.string(),
    age: z.number().optional(),
    field: z.string().optional().default("asdf"),
    country: z.string().optional(),
  });

  // @ts-expect-error
  const requiredObject = object.required({ age: true, country: false });
  expect(requiredObject.shape.name).toBeInstanceOf(z.ZodString);
  expect(requiredObject.shape.age).toBeInstanceOf(z.ZodNonOptional);
  expect(requiredObject.shape.field).toBeInstanceOf(z.ZodDefault);
  expect(requiredObject.shape.country).toBeInstanceOf(z.ZodOptional);
});

test("partial with mask", async () => {
  const object = z.object({
    name: z.string(),
    age: z.number().optional(),
    field: z.string().optional().default("asdf"),
    country: z.string(),
  });

  const masked = object.partial({ age: true, field: true, name: true }).strict();

  expect(masked.shape.name).toBeInstanceOf(z.ZodOptional);
  expect(masked.shape.age).toBeInstanceOf(z.ZodOptional);
  expect(masked.shape.field).toBeInstanceOf(z.ZodOptional);
  expect(masked.shape.country).toBeInstanceOf(z.ZodString);

  masked.parse({ country: "US" });
  await masked.parseAsync({ country: "US" });
});

test("partial with mask -- ignore falsy values", async () => {
  const object = z.object({
    name: z.string(),
    age: z.number().optional(),
    field: z.string().optional().default("asdf"),
    country: z.string(),
  });

  // @ts-expect-error
  const masked = object.partial({ name: true, country: false }).strict();

  expect(masked.shape.name).toBeInstanceOf(z.ZodOptional);
  expect(masked.shape.age).toBeInstanceOf(z.ZodOptional);
  expect(masked.shape.field).toBeInstanceOf(z.ZodDefault);
  expect(masked.shape.country).toBeInstanceOf(z.ZodString);

  masked.parse({ country: "US" });
  await masked.parseAsync({ country: "US" });
});

test("catch/prefault/default", () => {
  const mySchema = z.object({
    a: z.string().catch("catch value").optional(),
    b: z.string().default("default value").optional(),
    c: z.string().prefault("prefault value").optional(),
    d: z.string().catch("catch value"),
    e: z.string().default("default value"),
    f: z.string().prefault("prefault value"),
  });

  expect(mySchema.safeParse({}).error!.issues).toMatchInlineSnapshot(`
    [
      {
        "code": "invalid_type",
        "expected": "nonoptional",
        "message": "Invalid input: expected nonoptional, received undefined",
        "path": [
          "d",
        ],
      },
    ]
  `);

  expect(mySchema.safeParse({}, { jitless: true }).error!.issues).toMatchInlineSnapshot(`
    [
      {
        "code": "invalid_type",
        "expected": "nonoptional",
        "message": "Invalid input: expected nonoptional, received undefined",
        "path": [
          "d",
        ],
      },
    ]
  `);

  expect(mySchema.parse({ d: undefined })).toMatchInlineSnapshot(`
    {
      "b": "default value",
      "c": "prefault value",
      "d": "catch value",
      "e": "default value",
      "f": "prefault value",
    }
  `);

  expect(mySchema.parse({ d: undefined }, { jitless: true })).toMatchInlineSnapshot(`
    {
      "b": "default value",
      "c": "prefault value",
      "d": "catch value",
      "e": "default value",
      "f": "prefault value",
    }
  `);
});

test("handleOptionalObjectResult branches", () => {
  const mySchema = z.object({
    // Branch: input[key] === undefined, key not in input, caught error
    caughtMissing: z.string().catch("caught").optional(),
    // Branch: input[key] === undefined, key in input, caught error
    caughtUndefined: z.string().catch("caught").optional(),
    // Branch: input[key] === undefined, key not in input, validation issues
    issueMissing: z.string().min(5).optional(),
    // Branch: input[key] === undefined, key in input, validation issues
    issueUndefined: z.string().min(5).optional(),
    // Branch: input[key] === undefined, validation returns undefined
    validUndefined: z.string().optional(),
    // Branch: input[key] === undefined, non-undefined result (default/transform)
    defaultValue: z.string().default("default").optional(),
    // Branch: input[key] defined, caught error
    caughtDefined: z.string().catch("caught").optional(),
    // Branch: input[key] defined, validation issues
    issueDefined: z.string().min(5).optional(),
    // Branch: input[key] defined, validation returns undefined
    validDefinedUndefined: z
      .string()
      .transform(() => undefined)
      .optional(),
    // Branch: input[key] defined, non-undefined value
    validDefined: z.string().optional(),
  });

  // Test input[key] === undefined cases
  const result1 = mySchema.parse(
    {
      // caughtMissing: not present (key not in input)
      caughtUndefined: undefined, // key in input
      // issueMissing: not present (key not in input)
      issueUndefined: undefined, // key in input
      validUndefined: undefined,
      // defaultValue: not present, will get default
    },
    { jitless: true }
  );

  expect(result1).toEqual({
    caughtUndefined: undefined,
    issueUndefined: undefined,
    validUndefined: undefined,
    defaultValue: "default",
  });

  // Test input[key] defined cases (successful)
  const result2 = mySchema.parse(
    {
      caughtDefined: 123, // invalid type, should catch
      validDefinedUndefined: "test", // transforms to undefined
      validDefined: "valid", // valid value
    },
    { jitless: true }
  );

  expect(result2).toEqual({
    caughtDefined: "caught",
    validDefinedUndefined: undefined,
    validDefined: "valid",
    defaultValue: "default",
  });

  // Test validation issues are properly reported (input[key] defined, validation fails)
  expect(() =>
    mySchema.parse(
      {
        issueDefined: "abc", // too short
      },
      { jitless: true }
    )
  ).toThrow();
});

test("fastpass vs non-fastpass consistency", () => {
  const mySchema = z.object({
    caughtMissing: z.string().catch("caught").optional(),
    caughtUndefined: z.string().catch("caught").optional(),
    issueMissing: z.string().min(5).optional(),
    issueUndefined: z.string().min(5).optional(),
    validUndefined: z.string().optional(),
    defaultValue: z.string().default("default").optional(),
    caughtDefined: z.string().catch("caught").optional(),
    validDefinedUndefined: z
      .string()
      .transform(() => undefined)
      .optional(),
    validDefined: z.string().optional(),
  });

  const input = {
    caughtUndefined: undefined,
    issueUndefined: undefined,
    validUndefined: undefined,
    caughtDefined: 123,
    validDefinedUndefined: "test",
    validDefined: "valid",
  };

  // Test both paths produce identical results
  const jitlessResult = mySchema.parse(input, { jitless: true });
  const fastpassResult = mySchema.parse(input);

  expect(jitlessResult).toEqual(fastpassResult);
  expect(jitlessResult).toEqual({
    caughtUndefined: undefined,
    issueUndefined: undefined,
    validUndefined: undefined,
    defaultValue: "default",
    caughtDefined: "caught",
    validDefinedUndefined: undefined,
    validDefined: "valid",
  });
});

test("optional with check", () => {
  const baseSchema = z
    .string()
    .optional()
    .check(({ value, ...ctx }) => {
      ctx.issues.push({
        code: "custom",
        input: value,
        message: "message",
      });
    });

  // this correctly fails
  expect(baseSchema.safeParse(undefined)).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "code": "custom",
        "message": "message",
        "path": []
      }
    ]],
      "success": false,
    }
  `);

  const schemaObject = z.object({
    date: baseSchema,
  });

  expect(schemaObject.safeParse({ date: undefined })).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "code": "custom",
        "message": "message",
        "path": [
          "date"
        ]
      }
    ]],
      "success": false,
    }
  `);
});

test("partial - throws error on schema with refinements", () => {
  const baseSchema = z.object({
    id: z.string(),
    name: z.string(),
    items: z.string().array(),
  });

  const refinedSchema = baseSchema.superRefine((val, ctx) => {
    if (val.items.length === 0) {
      ctx.addIssue({
        message: "Must have at least one item",
        code: "custom",
        path: ["items"],
      });
    }
  });

  expect(() => refinedSchema.partial()).toThrow(".partial() cannot be used on object schemas containing refinements");
});

test("partial - throws error on schema with refine", () => {
  const baseSchema = z.object({
    password: z.string(),
    confirmPassword: z.string(),
  });

  const refinedSchema = baseSchema.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
  });

  expect(() => refinedSchema.partial()).toThrow(".partial() cannot be used on object schemas containing refinements");
});

test("required - preserves refinements", () => {
  const baseSchema = z.object({
    name: z.string().optional(),
    age: z.number().optional(),
  });

  const refinedSchema = baseSchema.superRefine((val, ctx) => {
    if (val.name === "admin") {
      ctx.addIssue({
        message: "Name cannot be admin",
        code: "custom",
        path: ["name"],
      });
    }
  });

  const requiredSchema = refinedSchema.required();

  // The refinement should still be applied
  const result = requiredSchema.safeParse({ name: "admin", age: 25 });
  expect(result.success).toBe(false);
  if (!result.success) {
    expect(result.error.issues[0].message).toBe("Name cannot be admin");
  }

  // Valid data should pass
  const validResult = requiredSchema.safeParse({ name: "user", age: 25 });
  expect(validResult.success).toBe(true);
});

test("required - refinement is executed on required schema", () => {
  const baseSchema = z.object({
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
  });

  const refinedSchema = baseSchema.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
  });

  const requiredSchema = refinedSchema.required();

  // Mismatched passwords should fail refinement
  const result = requiredSchema.safeParse({ password: "abc", confirmPassword: "xyz" });
  expect(result.success).toBe(false);
  if (!result.success) {
    expect(result.error.issues[0].message).toBe("Passwords must match");
  }

  // Matching passwords should pass
  const validResult = requiredSchema.safeParse({ password: "abc", confirmPassword: "abc" });
  expect(validResult.success).toBe(true);
});
