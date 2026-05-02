import { expect, expectTypeOf, test } from "vitest";

import * as z from "zod/v4";

test("basic apply (object)", () => {
  const schema = z
    .object({
      a: z.number(),
      b: z.string(),
    })
    .apply((s) => s.omit({ b: true }))
    .apply((s) => s.extend({ c: z.boolean() }));

  expect(z.toJSONSchema(schema)).toMatchInlineSnapshot(`
    {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "additionalProperties": false,
      "properties": {
        "a": {
          "type": "number",
        },
        "c": {
          "type": "boolean",
        },
      },
      "required": [
        "a",
        "c",
      ],
      "type": "object",
    }
  `);
  expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<{
    a: number;
    c: boolean;
  }>();
});

test("basic apply (number)", () => {
  const setCommonNumberChecks = <T extends z.ZodNumber>(schema: T) => {
    return schema.min(0).max(100);
  };

  const schema = z.number().apply(setCommonNumberChecks).nullable();

  expect(() => schema.parse(-1)).toThrowError();
  expect(() => schema.parse(101)).toThrowError();
  expect(schema.parse(0)).toBe(0);
  expect(schema.parse(null)).toBe(null);
  expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null>();
});

test("The callback's return value becomes the apply's return value.", () => {
  const symbol = Symbol();
  const result = z.number().apply(() => symbol);

  expect(result).toBe(symbol);
  expectTypeOf<typeof result>().toEqualTypeOf<symbol>();
});
