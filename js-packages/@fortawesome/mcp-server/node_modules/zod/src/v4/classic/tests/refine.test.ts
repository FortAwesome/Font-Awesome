import { describe, expect, expectTypeOf, test } from "vitest";
import * as z from "zod/v4";

describe("basic refinement functionality", () => {
  test("should create a new schema instance when refining", () => {
    const obj1 = z.object({
      first: z.string(),
      second: z.string(),
    });
    const obj2 = obj1.partial().strict();
    const obj3 = obj2.refine((data) => data.first || data.second, "Either first or second should be filled in.");

    expect(obj1 === (obj2 as any)).toEqual(false);
    expect(obj2 === (obj3 as any)).toEqual(false);
  });

  test("should validate according to refinement logic", () => {
    const schema = z
      .object({
        first: z.string(),
        second: z.string(),
      })
      .partial()
      .strict()
      .refine((data) => data.first || data.second, "Either first or second should be filled in.");

    // Should fail on empty object
    expect(() => schema.parse({})).toThrow();

    // Should pass with first property
    expect(schema.parse({ first: "a" })).toEqual({ first: "a" });

    // Should pass with second property
    expect(schema.parse({ second: "a" })).toEqual({ second: "a" });

    // Should pass with both properties
    expect(schema.parse({ first: "a", second: "a" })).toEqual({ first: "a", second: "a" });
  });

  test("should validate strict mode correctly", () => {
    const schema = z
      .object({
        first: z.string(),
        second: z.string(),
      })
      .partial()
      .strict();

    // Should throw on extra properties
    expect(() => schema.parse({ third: "adsf" })).toThrow();
  });
});

describe("refinement with custom error messages", () => {
  test("should use custom error message when validation fails", () => {
    const validationSchema = z
      .object({
        email: z.string().email(),
        password: z.string(),
        confirmPassword: z.string(),
      })
      .refine((data) => data.password === data.confirmPassword, "Both password and confirmation must match");

    const result = validationSchema.safeParse({
      email: "aaaa@gmail.com",
      password: "aaaaaaaa",
      confirmPassword: "bbbbbbbb",
    });

    expect(result.success).toEqual(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toEqual("Both password and confirmation must match");
    }
  });
});

describe("async refinements", () => {
  test("should support async refinement functions", async () => {
    const validationSchema = z
      .object({
        email: z.string().email(),
        password: z.string(),
        confirmPassword: z.string(),
      })
      .refine(
        (data) => Promise.resolve().then(() => data.password === data.confirmPassword),
        "Both password and confirmation must match"
      );

    // Should pass with matching passwords
    const validData = {
      email: "aaaa@gmail.com",
      password: "password",
      confirmPassword: "password",
    };

    await expect(validationSchema.parseAsync(validData)).resolves.toEqual(validData);

    // Should fail with non-matching passwords
    await expect(
      validationSchema.parseAsync({
        email: "aaaa@gmail.com",
        password: "password",
        confirmPassword: "different",
      })
    ).rejects.toThrow();
  });
});

describe("early termination options", () => {
  test("should abort early with continue: false", () => {
    const schema = z
      .string()
      .superRefine((val, ctx) => {
        if (val.length < 2) {
          ctx.addIssue({
            code: "custom",
            message: "BAD",
            continue: false,
          });
        }
      })
      .refine((_) => false);

    const result = schema.safeParse("");
    expect(result.success).toEqual(false);
    if (!result.success) {
      expect(result.error.issues.length).toEqual(1);
      expect(result.error.issues[0].message).toEqual("BAD");
    }
  });

  test("should abort early with fatal: true", () => {
    const schema = z
      .string()
      .superRefine((val, ctx) => {
        if (val.length < 2) {
          ctx.addIssue({
            code: "custom",
            fatal: true,
            message: "BAD",
          });
        }
      })
      .refine((_) => false);

    const result = schema.safeParse("");
    expect(result.success).toEqual(false);
    if (!result.success) {
      expect(result.error.issues.length).toEqual(1);
      expect(result.error.issues[0].message).toEqual("BAD");
    }
  });

  test("should abort early with abort flag", () => {
    const schema = z
      .string()
      .refine((_) => false, { abort: true })
      .refine((_) => false);

    const result = schema.safeParse("");
    expect(result.success).toEqual(false);
    if (!result.success) {
      expect(result.error.issues.length).toEqual(1);
    }
  });
});

describe("custom error paths", () => {
  test("should use custom path in error message", () => {
    const result = z
      .object({ password: z.string(), confirm: z.string() })
      .refine((data) => data.confirm === data.password, { path: ["confirm"] })
      .safeParse({ password: "asdf", confirm: "qewr" });

    expect(result.success).toEqual(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toEqual(["confirm"]);
    }
  });
});

describe("superRefine functionality", () => {
  test("should support multiple validation rules", () => {
    const Strings = z.array(z.string()).superRefine((val, ctx) => {
      if (val.length > 3) {
        ctx.addIssue({
          input: val,
          code: "too_big",
          origin: "array",
          maximum: 3,
          inclusive: true,
          exact: true,
          message: "Too many items 😡",
        });
      }

      if (val.length !== new Set(val).size) {
        ctx.addIssue({
          input: val,
          code: "custom",
          message: `No duplicates allowed.`,
        });
      }
    });

    // Should fail with too many items and duplicates
    const result = Strings.safeParse(["asfd", "asfd", "asfd", "asfd"]);
    expect(result.success).toEqual(false);
    if (!result.success) {
      expect(result.error.issues.length).toEqual(2);
      expect(result.error.issues[0].message).toEqual("Too many items 😡");
      expect(result.error.issues[1].message).toEqual("No duplicates allowed.");
    }

    // Should pass with valid input
    const validArray = ["asfd", "qwer"];
    expect(Strings.parse(validArray)).toEqual(validArray);
  });

  test("should support async superRefine", async () => {
    const Strings = z.array(z.string()).superRefine(async (val, ctx) => {
      if (val.length > 3) {
        ctx.addIssue({
          input: val,
          code: "too_big",
          origin: "array",
          maximum: 3,
          inclusive: true,
          message: "Too many items 😡",
        });
      }

      if (val.length !== new Set(val).size) {
        ctx.addIssue({
          input: val,
          code: "custom",
          message: `No duplicates allowed.`,
        });
      }
    });

    // Should fail with too many items and duplicates
    const result = await Strings.safeParseAsync(["asfd", "asfd", "asfd", "asfd"]);
    expect(result.success).toEqual(false);
    if (!result.success) {
      expect(result.error.issues.length).toEqual(2);
    }

    // Should pass with valid input
    const validArray = ["asfd", "qwer"];
    await expect(Strings.parseAsync(validArray)).resolves.toEqual(validArray);
  });

  test("should test continuability of custom issues", () => {
    // Default continue behavior - allows subsequent refinements
    const defaultContinue = z
      .string()
      .superRefine((_, ctx) => {
        ctx.addIssue({ code: "custom", message: "First issue" });
      })
      .refine(() => false, "Second issue");

    expect(defaultContinue.safeParse("test")).toMatchInlineSnapshot(`
      {
        "error": [ZodError: [
        {
          "code": "custom",
          "message": "First issue",
          "path": []
        },
        {
          "code": "custom",
          "path": [],
          "message": "Second issue"
        }
      ]],
        "success": false,
      }
    `);

    // Explicit continue: false - prevents subsequent refinements
    const explicitContinueFalse = z
      .string()
      .superRefine((_, ctx) => {
        ctx.addIssue({ code: "custom", message: "First issue", continue: false });
      })
      .refine(() => false, "Second issue");

    expect(explicitContinueFalse.safeParse("test")).toMatchInlineSnapshot(`
      {
        "error": [ZodError: [
        {
          "code": "custom",
          "message": "First issue",
          "path": []
        }
      ]],
        "success": false,
      }
    `);

    // Multiple issues in same refinement - both always added regardless of continue
    const multipleInSame = z.string().superRefine((_, ctx) => {
      ctx.addIssue({ code: "custom", message: "First", continue: false });
      ctx.addIssue({ code: "custom", message: "Second" });
    });

    expect(multipleInSame.safeParse("test")).toMatchInlineSnapshot(`
      {
        "error": [ZodError: [
        {
          "code": "custom",
          "message": "First",
          "path": []
        },
        {
          "code": "custom",
          "message": "Second",
          "path": []
        }
      ]],
        "success": false,
      }
    `);
  });

  test("should accept string as shorthand for custom error message", () => {
    const schema = z.string().superRefine((_, ctx) => {
      ctx.addIssue("bad stuff");
    });

    const result = schema.safeParse("asdf");
    expect(result.success).toEqual(false);
    if (!result.success) {
      expect(result.error.issues).toHaveLength(1);
      expect(result.error.issues[0].message).toEqual("bad stuff");
    }
  });

  test("should respect fatal flag in superRefine", () => {
    const schema = z
      .string()
      .superRefine((val, ctx) => {
        if (val === "") {
          ctx.addIssue({
            input: val,
            code: "custom",
            message: "foo",
            fatal: true,
          });
        }
      })
      .superRefine((val, ctx) => {
        if (val !== " ") {
          ctx.addIssue({
            input: val,
            code: "custom",
            message: "bar",
          });
        }
      });

    const result = schema.safeParse("");
    expect(result.success).toEqual(false);
    if (!result.success) {
      expect(result.error.issues.length).toEqual(1);
      expect(result.error.issues[0].message).toEqual("foo");
    }
  });
});

describe("chained refinements", () => {
  test("should collect all validation errors when appropriate", () => {
    const objectSchema = z
      .object({
        length: z.number(),
        size: z.number(),
      })
      .refine(({ length }) => length > 5, {
        path: ["length"],
        message: "length greater than 5",
      })
      .refine(({ size }) => size > 7, {
        path: ["size"],
        message: "size greater than 7",
      });

    // Should fail with one error
    const r1 = objectSchema.safeParse({
      length: 4,
      size: 9,
    });
    expect(r1.success).toEqual(false);
    if (!r1.success) {
      expect(r1.error.issues.length).toEqual(1);
      expect(r1.error.issues[0].path).toEqual(["length"]);
    }

    // Should fail with two errors
    const r2 = objectSchema.safeParse({
      length: 4,
      size: 3,
    });
    expect(r2.success).toEqual(false);
    if (!r2.success) {
      expect(r2.error.issues.length).toEqual(2);
    }

    // Should pass with valid input
    const validData = {
      length: 6,
      size: 8,
    };
    expect(objectSchema.parse(validData)).toEqual(validData);
  });

  test("should run superRefine validation even when base schema validation fails when 'when' is defined and returns true", () => {
    const baseSchema = z.object({
      foo: z.number(),
      bar: z.number(),
    });

    const schema = baseSchema.superRefine(
      (data, ctx) => {
        if (data.foo > 10) {
          ctx.addIssue({
            code: "custom",
            message: "foo must be less than 10",
          });
        }
      },
      {
        when: ({ value }) => baseSchema.pick({ foo: true }).safeParse(value).success,
      }
    );

    const result = schema.safeParse({
      foo: 11,
    });
    expect(result.success).toEqual(false);

    if (!result.success) {
      expect(result.error.issues.length).toEqual(2);
      expect(result.error.issues[0].message).toEqual("Invalid input: expected number, received undefined");
      expect(result.error.issues[1].message).toEqual("foo must be less than 10");
    }
  });

  test("should not run superRefine validation when 'when' is defined and returns false", () => {
    const baseSchema = z.object({
      foo: z.number(),
      bar: z.number(),
    });

    const schema = baseSchema.superRefine(
      (data, ctx) => {
        if (data.foo > 10) {
          ctx.addIssue({
            code: "custom",
            message: "foo must be less than 10",
          });
        }
      },
      {
        when: ({ value }) => baseSchema.safeParse(value).success,
      }
    );

    const result = schema.safeParse({
      foo: 11,
    });
    expect(result.success).toEqual(false);

    if (!result.success) {
      expect(result.error.issues.length).toEqual(1);
      expect(result.error.issues[0].message).toEqual("Invalid input: expected number, received undefined");
    }
  });
});

describe("type refinement with type guards", () => {
  test("type guard narrows output type", () => {
    const schema = z.string().refine((s): s is "a" => s === "a");

    expectTypeOf<z.input<typeof schema>>().toEqualTypeOf<string>();
    expectTypeOf<z.output<typeof schema>>().toEqualTypeOf<"a">();
  });

  test("non-type-guard refine does not narrow", () => {
    const schema = z.string().refine((s) => s.length > 0);

    expectTypeOf<z.input<typeof schema>>().toEqualTypeOf<string>();
    expectTypeOf<z.output<typeof schema>>().toEqualTypeOf<string>();
  });

  // TODO: Implement type narrowing for superRefine
  // test("superRefine - type narrowing", () => {
  //   type NarrowType = { type: string; age: number };
  //   const schema = z
  //     .object({
  //       type: z.string(),
  //       age: z.number(),
  //     })
  //     .nullable()
  //     .superRefine((arg, ctx): arg is NarrowType => {
  //       if (!arg) {
  //         ctx.addIssue({
  //           input: arg,
  //           code: "custom",
  //           message: "cannot be null",
  //           fatal: true,
  //         });
  //         return false;
  //       }
  //       return true;
  //     });
  //
  //   expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<NarrowType>();
  //
  //   expect(schema.safeParse({ type: "test", age: 0 }).success).toEqual(true);
  //   expect(schema.safeParse(null).success).toEqual(false);
  // });
});

test("when", () => {
  const schema = z
    .strictObject({
      password: z.string().min(8),
      confirmPassword: z.string(),
      other: z.string(),
    })
    .refine(
      (data) => {
        // console.log("running check...");
        // console.log(data);
        // console.log(data.password);
        return data.password === data.confirmPassword;
      },
      {
        message: "Passwords do not match",
        path: ["confirmPassword"],
        when(payload) {
          if (payload.value === undefined) return false;
          if (payload.value === null) return false;
          // no issues with confirmPassword or password
          return payload.issues.every((iss) => iss.path?.[0] !== "confirmPassword" && iss.path?.[0] !== "password");
        },
      }
    );

  expect(schema.safeParse(undefined)).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "expected": "object",
        "code": "invalid_type",
        "path": [],
        "message": "Invalid input: expected object, received undefined"
      }
    ]],
      "success": false,
    }
  `);
  expect(schema.safeParse(null)).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "expected": "object",
        "code": "invalid_type",
        "path": [],
        "message": "Invalid input: expected object, received null"
      }
    ]],
      "success": false,
    }
  `);
  expect(
    schema.safeParse({
      password: "asdf",
      confirmPassword: "asdfg",
      other: "qwer",
    })
  ).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "origin": "string",
        "code": "too_small",
        "minimum": 8,
        "inclusive": true,
        "path": [
          "password"
        ],
        "message": "Too small: expected string to have >=8 characters"
      }
    ]],
      "success": false,
    }
  `);

  expect(
    schema.safeParse({
      password: "asdf",
      confirmPassword: "asdfg",
      other: 1234,
    })
  ).toMatchInlineSnapshot(`
    {
      "error": [ZodError: [
      {
        "origin": "string",
        "code": "too_small",
        "minimum": 8,
        "inclusive": true,
        "path": [
          "password"
        ],
        "message": "Too small: expected string to have >=8 characters"
      },
      {
        "expected": "string",
        "code": "invalid_type",
        "path": [
          "other"
        ],
        "message": "Invalid input: expected string, received number"
      }
    ]],
      "success": false,
    }
  `);
});
