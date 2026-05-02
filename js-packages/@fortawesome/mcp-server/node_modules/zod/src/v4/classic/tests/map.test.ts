import { expect, expectTypeOf, test } from "vitest";
import * as z from "zod/v4";

const stringMap = z.map(z.string(), z.string());
type stringMap = z.infer<typeof stringMap>;

const minTwo = stringMap.min(2);
const maxTwo = stringMap.max(2);
const justTwo = stringMap.size(2);
const nonEmpty = stringMap.nonempty();
const nonEmptyMax = stringMap.nonempty().max(2);

test("type inference", () => {
  expectTypeOf<stringMap>().toEqualTypeOf<Map<string, string>>();
});

test("valid parse", () => {
  const result = stringMap.safeParse(
    new Map([
      ["first", "foo"],
      ["second", "bar"],
    ])
  );
  expect(result.success).toEqual(true);
  expect(result.data).toMatchInlineSnapshot(`
    Map {
      "first" => "foo",
      "second" => "bar",
    }
  `);
});

test("valid parse: size-related methods", () => {
  expect(() => {
    minTwo.parse(
      new Map([
        ["a", "b"],
        ["c", "d"],
      ])
    );
    minTwo.parse(
      new Map([
        ["a", "b"],
        ["c", "d"],
        ["e", "f"],
      ])
    );
    maxTwo.parse(
      new Map([
        ["a", "b"],
        ["c", "d"],
      ])
    );
    maxTwo.parse(new Map([["a", "b"]]));
    justTwo.parse(
      new Map([
        ["a", "b"],
        ["c", "d"],
      ])
    );
    nonEmpty.parse(new Map([["a", "b"]]));
    nonEmptyMax.parse(
      new Map([
        ["a", "b"],
        ["c", "d"],
      ])
    );
  }).not.toThrow();

  const sizeZeroResult = stringMap.parse(new Map());
  expect(sizeZeroResult.size).toBe(0);

  const sizeTwoResult = minTwo.parse(
    new Map([
      ["a", "b"],
      ["c", "d"],
    ])
  );
  expect(sizeTwoResult.size).toBe(2);
});

test("failing when parsing empty map in nonempty ", () => {
  const result = nonEmpty.safeParse(new Map());
  expect(result.success).toEqual(false);
  expect(result.error!.issues.length).toEqual(1);
  expect(result.error!.issues[0].code).toEqual("too_small");
});

test("failing when map is bigger than max() ", () => {
  const result = maxTwo.safeParse(
    new Map([
      ["a", "b"],
      ["c", "d"],
      ["e", "f"],
    ])
  );
  expect(result.success).toEqual(false);
  expect(result.error!.issues.length).toEqual(1);
  expect(result.error!.issues[0].code).toEqual("too_big");
});

test("valid parse async", async () => {
  const asyncMap = z.map(
    z.string().refine(async () => false, "bad key"),
    z.string().refine(async () => false, "bad value")
  );
  const result = await asyncMap.safeParseAsync(new Map([["first", "foo"]]));
  expect(result.success).toEqual(false);
  expect(result.error).toMatchInlineSnapshot(`
    [ZodError: [
      {
        "code": "custom",
        "path": [
          "first"
        ],
        "message": "bad key"
      },
      {
        "code": "custom",
        "path": [
          "first"
        ],
        "message": "bad value"
      }
    ]]
  `);
});

test("throws when a Set is given", () => {
  const result = stringMap.safeParse(new Set([]));
  expect(result.success).toEqual(false);
  if (result.success === false) {
    expect(result.error.issues.length).toEqual(1);
    expect(result.error.issues[0].code).toEqual("invalid_type");
  }
});

test("throws when the given map has invalid key and invalid input", () => {
  const result = stringMap.safeParse(new Map([[42, Symbol()]]));
  expect(result.success).toEqual(false);
  if (result.success === false) {
    expect(result.error.issues.length).toEqual(2);
    expect(result.error).toMatchInlineSnapshot(`
      [ZodError: [
        {
          "expected": "string",
          "code": "invalid_type",
          "path": [
            42
          ],
          "message": "Invalid input: expected string, received number"
        },
        {
          "expected": "string",
          "code": "invalid_type",
          "path": [
            42
          ],
          "message": "Invalid input: expected string, received symbol"
        }
      ]]
    `);
  }
});

test("throws when the given map has multiple invalid entries", () => {
  // const result = stringMap.safeParse(new Map([[42, Symbol()]]));

  const result = stringMap.safeParse(
    new Map([
      [1, "foo"],
      ["bar", 2],
    ] as [any, any][]) as Map<any, any>
  );

  // const result = stringMap.safeParse(new Map([[42, Symbol()]]));
  expect(result.success).toEqual(false);
  if (result.success === false) {
    expect(result.error.issues.length).toEqual(2);
    expect(result.error.issues).toMatchInlineSnapshot(`
      [
        {
          "code": "invalid_type",
          "expected": "string",
          "message": "Invalid input: expected string, received number",
          "path": [
            1,
          ],
        },
        {
          "code": "invalid_type",
          "expected": "string",
          "message": "Invalid input: expected string, received number",
          "path": [
            "bar",
          ],
        },
      ]
    `);
  }
});

test("dirty", async () => {
  const map = z.map(
    z.string().refine((val) => val === val.toUpperCase(), {
      message: "Keys must be uppercase",
    }),
    z.string()
  );
  const result = await map.spa(
    new Map([
      ["first", "foo"],
      ["second", "bar"],
    ])
  );
  expect(result.success).toEqual(false);
  if (!result.success) {
    expect(result.error.issues.length).toEqual(2);
    expect(result.error).toMatchInlineSnapshot(`
      [ZodError: [
        {
          "code": "custom",
          "path": [
            "first"
          ],
          "message": "Keys must be uppercase"
        },
        {
          "code": "custom",
          "path": [
            "second"
          ],
          "message": "Keys must be uppercase"
        }
      ]]
    `);
  }
});

test("map with object keys", () => {
  const map = z.map(
    z.object({
      name: z.string(),
      age: z.number(),
    }),
    z.string()
  );
  const data = new Map([
    [{ name: "John", age: 30 }, "foo"],
    [{ name: "Jane", age: 25 }, "bar"],
  ]);
  const result = map.safeParse(data);
  expect(result.success).toEqual(true);
  expect(result.data!).toEqual(data);

  const badData = new Map([["bad", "foo"]]);
  const badResult = map.safeParse(badData);
  expect(badResult.success).toEqual(false);
  expect(badResult.error).toMatchInlineSnapshot(`
    [ZodError: [
      {
        "expected": "object",
        "code": "invalid_type",
        "path": [
          "bad"
        ],
        "message": "Invalid input: expected object, received string"
      }
    ]]
  `);
});

test("min/max", async () => {
  const schema = stringMap.min(4).max(5);

  const r1 = schema.safeParse(
    new Map([
      ["a", "a"],
      ["b", "b"],
      ["c", "c"],
      ["d", "d"],
    ])
  );
  expect(r1.success).toEqual(true);

  const r2 = schema.safeParse(
    new Map([
      ["a", "a"],
      ["b", "b"],
      ["c", "c"],
    ])
  );
  expect(r2.success).toEqual(false);
  expect(r2.error!.issues).toMatchInlineSnapshot(`
    [
      {
        "code": "too_small",
        "inclusive": true,
        "message": "Too small: expected map to have >=4 entries",
        "minimum": 4,
        "origin": "map",
        "path": [],
      },
    ]
  `);

  const r3 = schema.safeParse(
    new Map([
      ["a", "a"],
      ["b", "b"],
      ["c", "c"],
      ["d", "d"],
      ["e", "e"],
      ["f", "f"],
    ])
  );
  expect(r3.success).toEqual(false);
  expect(r3.error!.issues).toMatchInlineSnapshot(`
    [
      {
        "code": "too_big",
        "inclusive": true,
        "maximum": 5,
        "message": "Too big: expected map to have <=5 entries",
        "origin": "map",
        "path": [],
      },
    ]
  `);
});
