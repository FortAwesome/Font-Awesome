import { expect, expectTypeOf, test } from "vitest";
import * as z from "../index.js";

test("basic apply (number)", () => {
  const setCommonNumberChecks = <T extends z.ZodMiniNumber>(schema: T) => {
    return schema.check(z.minimum(0), z.maximum(100));
  };

  const schema = z.nullable(z.number().apply(setCommonNumberChecks));

  expect(() => z.parse(schema, -1)).toThrowError();
  expect(() => z.parse(schema, 101)).toThrowError();
  expect(z.parse(schema, 0)).toBe(0);
  expect(z.parse(schema, null)).toBe(null);
  expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<number | null>();
});

test("The callback's return value becomes the apply's return value.", () => {
  const symbol = Symbol();
  const result = z.number().apply(() => symbol);

  expect(result).toBe(symbol);
  expectTypeOf<typeof result>().toEqualTypeOf<symbol>();
});
