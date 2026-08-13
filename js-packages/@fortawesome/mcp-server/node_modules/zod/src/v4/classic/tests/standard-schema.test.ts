import { expect, test } from "vitest";

import * as z from "zod/v4";

test("length checks", async () => {
  const schema = z.string();
  const result = await schema["~standard"].validate(12);
  expect(result).toMatchInlineSnapshot(`
    {
      "issues": [
        {
          "code": "invalid_type",
          "expected": "string",
          "message": "Invalid input: expected string, received number",
          "path": [],
        },
      ],
    }
  `);
});

test("length checks", async () => {
  const schema = z.string();
  const result = await schema["~standard"].validate("asdf");
  expect(result).toMatchInlineSnapshot(`
    {
      "value": "asdf",
    }
  `);
});

test("length checks", async () => {
  const schema = z.string().refine(async (val) => val.length > 5);
  const result = await schema["~standard"].validate(12);
  expect(result).toMatchInlineSnapshot(`
    {
      "issues": [
        {
          "code": "invalid_type",
          "expected": "string",
          "message": "Invalid input: expected string, received number",
          "path": [],
        },
      ],
    }
  `);
});

test("length checks", async () => {
  const schema = z.string().refine(async (val) => val.length > 5);
  const result = await schema["~standard"].validate("234134134");
  expect(result).toMatchInlineSnapshot(`
    {
      "value": "234134134",
    }
  `);
});

test("schemas conform to StandardJSONSchemaV1", async () => {
  const schema = z.codec(z.string(), z.number(), {
    decode: (str) => Number.parseFloat(str),
    encode: (num) => num.toString(),
  });
  expect(schema["~standard"].validate).toBeTypeOf("function");
  expect(await schema["~standard"].validate("42")).toMatchInlineSnapshot(`
		{
		  "value": 42,
		}
	`);
  expect(schema["~standard"].jsonSchema.input({ target: "draft-2020-12" })).toMatchInlineSnapshot(`
		{
		  "$schema": "https://json-schema.org/draft/2020-12/schema",
		  "type": "string",
		}
	`);
  expect(schema["~standard"].jsonSchema.output({ target: "draft-2020-12" })).toMatchInlineSnapshot(`
		{
		  "$schema": "https://json-schema.org/draft/2020-12/schema",
		  "type": "number",
		}
	`);
});

test(".toJSONSchema() returns StandardJSONSchemaV1", async () => {
  const codec = z.codec(z.string(), z.number(), {
    decode: (str) => Number.parseFloat(str),
    encode: (num) => num.toString(),
  });
  const result = codec.toJSONSchema();
  expect(result["~standard"].validate).toBeTypeOf("function");
  expect(await result["~standard"].validate("42")).toMatchInlineSnapshot(`
		{
		  "value": 42,
		}
	`);
  expect(result["~standard"].jsonSchema.input({ target: "draft-2020-12" })).toMatchInlineSnapshot(`
		{
		  "$schema": "https://json-schema.org/draft/2020-12/schema",
		  "type": "string",
		}
	`);
  expect(result["~standard"].jsonSchema.output({ target: "draft-2020-12" })).toMatchInlineSnapshot(`
		{
		  "$schema": "https://json-schema.org/draft/2020-12/schema",
		  "type": "number",
		}
	`);
});

test("z.toJSONSchema() returns StandardJSONSchemaV1", async () => {
  const codec = z.codec(z.string(), z.number(), {
    decode: (str) => Number.parseFloat(str),
    encode: (num) => num.toString(),
  });
  const result = z.toJSONSchema(codec);
  expect(result["~standard"].validate).toBeTypeOf("function");
  expect(await result["~standard"].validate("42")).toMatchInlineSnapshot(`
		{
		  "value": 42,
		}
	`);
  expect(result["~standard"].jsonSchema.input({ target: "draft-2020-12" })).toMatchInlineSnapshot(`
		{
		  "$schema": "https://json-schema.org/draft/2020-12/schema",
		  "type": "string",
		}
	`);
  expect(result["~standard"].jsonSchema.output({ target: "draft-2020-12" })).toMatchInlineSnapshot(`
		{
		  "$schema": "https://json-schema.org/draft/2020-12/schema",
		  "type": "number",
		}
	`);
});
