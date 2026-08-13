import { expect, test } from "vitest";
import * as z from "zod/v4";

/**
 * Schema methods are exposed in a way that works when detached from the
 * schema instance — `const opt = schema.optional; opt()` must produce a
 * working `ZodOptional`, not a corrupt one. This pattern is used in real
 * code (e.g. `arr.map(schema.parse)`, `arr.map(schema.optional)`,
 * destructuring inside utility functions).
 *
 * This test caught a regression in colinhacks/zod#5870 where a memory
 * optimization moved methods to the prototype and made `this`-binding
 * required, silently breaking any detached usage.
 */

const probeArgs: Record<string, unknown[]> = {
  // ZodType
  optional: [],
  exactOptional: [],
  nullable: [],
  nullish: [],
  array: [],
  describe: ["x"],
  brand: [],
  readonly: [],
  default: ["fallback"],
  catch: ["fallback"],
  // _ZodString
  min: [1],
  max: [10],
  length: [5],
  nonempty: [],
  trim: [],
  toLowerCase: [],
  toUpperCase: [],
  // ZodString format methods
  email: [],
  url: [],
  uuid: [],
  cuid: [],
  cuid2: [],
  ulid: [],
  base64: [],
  base64url: [],
  ipv4: [],
  ipv6: [],
  // ZodNumber
  int: [],
  positive: [],
  negative: [],
  finite: [],
};

test("detached parse-family methods work without `this` binding", () => {
  const schema = z.string();
  const { parse, safeParse } = schema;

  expect(parse("hello")).toBe("hello");
  expect(safeParse("hello").success).toBe(true);
});

test("detached schema.optional() returns a working ZodOptional", () => {
  const schema = z.string();
  const opt = schema.optional;

  const detached = opt();

  expect(detached).toBeInstanceOf(z.ZodOptional);
  expect(detached.safeParse("hello").success).toBe(true);
  expect(detached.safeParse(undefined).success).toBe(true);
  expect(detached.safeParse(123).success).toBe(false);
});

test("detached schema.nullable() returns a working ZodNullable", () => {
  const schema = z.string();
  const nul = schema.nullable;

  const detached = nul();

  expect(detached).toBeInstanceOf(z.ZodNullable);
  expect(detached.safeParse("hello").success).toBe(true);
  expect(detached.safeParse(null).success).toBe(true);
  expect(detached.safeParse(123).success).toBe(false);
});

test("detached schema.array() returns a working ZodArray", () => {
  const schema = z.string();
  const arr = schema.array;

  const detached = arr();

  expect(detached).toBeInstanceOf(z.ZodArray);
  expect(detached.safeParse(["a", "b"]).success).toBe(true);
  expect(detached.safeParse([1, 2]).success).toBe(false);
});

test("detached schema.describe() returns a described schema", () => {
  const schema = z.string();
  const describe = schema.describe;

  const described = describe("hello world");

  expect(described.description).toBe("hello world");
});

test("detached refinement still validates", () => {
  const schema = z.string();
  const refine = schema.refine;

  const refined = refine((s: string) => s.startsWith("x"), "must start with x");

  expect(refined.safeParse("xhello").success).toBe(true);
  expect(refined.safeParse("hello").success).toBe(false);
});

test("detached chained calls work — schema.optional then parse", () => {
  const schema = z.string();
  const opt = schema.optional;
  const optionalSchema = opt();
  const { parse } = optionalSchema;

  expect(parse("hi")).toBe("hi");
  expect(parse(undefined)).toBe(undefined);
});

test("detached parse can be called as a free function", () => {
  const schema = z.string();
  const parse = schema.parse;
  const inputs = ["a", "b", "c"];

  const results = inputs.map((v) => parse(v));

  expect(results).toEqual(["a", "b", "c"]);
});

test("detached methods on z.number() work", () => {
  const schema = z.number();

  const min = schema.min;
  const max = schema.max;
  const positive = schema.positive;

  expect(min(5).safeParse(3).success).toBe(false);
  expect(max(5).safeParse(7).success).toBe(false);
  expect(positive().safeParse(-1).success).toBe(false);
});

test("detached object methods work", () => {
  const schema = z.object({ a: z.string(), b: z.number() });

  const pick = schema.pick;
  const omit = schema.omit;
  const partial = schema.partial;
  const extend = schema.extend;

  expect(Object.keys(pick({ a: true })._zod.def.shape)).toEqual(["a"]);
  expect(Object.keys(omit({ a: true })._zod.def.shape)).toEqual(["b"]);
  expect(partial().safeParse({}).success).toBe(true);
  const extended = extend({ c: z.boolean() });
  expect(Object.keys(extended._zod.def.shape).sort()).toEqual(["a", "b", "c"]);
});

// Sweep across many builder methods at once. If any of them break with the
// `const m = schema.foo; m(...)` pattern, this test will report which.
test("broad sweep: detaching builder methods does not throw or produce a corrupt schema", () => {
  const stringSchema = z.string();
  const numberSchema = z.number();

  const broken: Array<{ method: string; reason: string }> = [];

  for (const [methodName, args] of Object.entries(probeArgs)) {
    const target: any = methodName in stringSchema ? stringSchema : methodName in numberSchema ? numberSchema : null;
    if (!target) continue;

    const detached = target[methodName] as Function | undefined;
    if (typeof detached !== "function") continue;

    try {
      const result = detached(...args);
      // If the detached call returned a schema, sanity-check it parses
      // its base type. (e.g. `optional()` should accept its inner type.)
      if (result && typeof result === "object" && "_zod" in result && typeof (result as any).safeParse === "function") {
        const probeValue = target === stringSchema ? "x" : 1;
        const r = (result as any).safeParse(probeValue);
        // success or a clean failure are both fine — we only fail on throw or
        // on a schema with corrupt internal state (innerType undefined etc).
        if (r === undefined || (typeof r === "object" && !("success" in r))) {
          broken.push({ method: methodName, reason: "safeParse returned malformed result" });
        }
      }
    } catch (err: any) {
      broken.push({ method: methodName, reason: err?.message ?? String(err) });
    }
  }

  expect(broken).toEqual([]);
});
