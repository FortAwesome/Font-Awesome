import { describe, expect, test } from "vitest";
import * as z from "zod/v4";

// Utility functions
function expectMethodMatch(schema: z.ZodType, params?: z.core.ToJSONSchemaParams): void {
  const staticResult = z.toJSONSchema(schema, params);
  const methodResult = schema.toJSONSchema(params);
  expect(methodResult).toEqual(staticResult);
}

describe("toJSONSchema method", () => {
  describe("primitive types", () => {
    test("string", () => {
      expectMethodMatch(z.string());
    });

    test("number", () => {
      expectMethodMatch(z.number());
    });

    test("boolean", () => {
      expectMethodMatch(z.boolean());
    });

    test("bigint", () => {
      expectMethodMatch(z.bigint(), { unrepresentable: "any" });
    });

    test("symbol", () => {
      expectMethodMatch(z.symbol(), { unrepresentable: "any" });
    });

    test("null", () => {
      expectMethodMatch(z.null());
    });

    test("undefined", () => {
      expectMethodMatch(z.undefined(), { unrepresentable: "any" });
    });

    test("void", () => {
      expectMethodMatch(z.void(), { unrepresentable: "any" });
    });

    test("never", () => {
      expectMethodMatch(z.never());
    });

    test("any", () => {
      expectMethodMatch(z.any());
    });

    test("unknown", () => {
      expectMethodMatch(z.unknown());
    });

    test("date", () => {
      expectMethodMatch(z.date(), { unrepresentable: "any" });
    });

    test("nan", () => {
      expectMethodMatch(z.nan(), { unrepresentable: "any" });
    });
  });

  describe("string formats", () => {
    test("email", () => {
      expectMethodMatch(z.email());
    });

    test("url", () => {
      expectMethodMatch(z.url());
    });

    test("uuid", () => {
      expectMethodMatch(z.uuid());
    });

    test("datetime", () => {
      expectMethodMatch(z.iso.datetime());
    });

    test("date", () => {
      expectMethodMatch(z.iso.date());
    });

    test("guid", () => {
      expectMethodMatch(z.guid());
    });

    test("cuid", () => {
      expectMethodMatch(z.cuid());
    });

    test("cuid2", () => {
      expectMethodMatch(z.cuid2());
    });

    test("ulid", () => {
      expectMethodMatch(z.ulid());
    });

    test("base64", () => {
      expectMethodMatch(z.base64());
    });

    test("ipv4", () => {
      expectMethodMatch(z.ipv4());
    });

    test("ipv6", () => {
      expectMethodMatch(z.ipv6());
    });
  });

  describe("string validations", () => {
    test("min length", () => {
      expectMethodMatch(z.string().min(5));
    });

    test("max length", () => {
      expectMethodMatch(z.string().max(10));
    });

    test("length", () => {
      expectMethodMatch(z.string().length(5));
    });

    test("regex", () => {
      expectMethodMatch(z.string().regex(/^[A-Z]+$/));
    });

    test("multiple patterns", () => {
      expectMethodMatch(
        z
          .string()
          .regex(/^[A-Z]+$/)
          .regex(/^[0-9]+$/)
      );
    });

    test("startsWith", () => {
      expectMethodMatch(z.string().startsWith("hello"));
    });

    test("endsWith", () => {
      expectMethodMatch(z.string().endsWith("world"));
    });

    test("includes", () => {
      expectMethodMatch(z.string().includes("test"));
    });
  });

  describe("number validations", () => {
    test("min", () => {
      expectMethodMatch(z.number().min(5));
    });

    test("max", () => {
      expectMethodMatch(z.number().max(10));
    });

    test("int", () => {
      expectMethodMatch(z.int());
    });

    test("positive", () => {
      expectMethodMatch(z.number().positive());
    });

    test("negative", () => {
      expectMethodMatch(z.number().negative());
    });

    test("multipleOf", () => {
      expectMethodMatch(z.number().multipleOf(2));
    });

    test("gte", () => {
      expectMethodMatch(z.number().gte(5));
    });

    test("lte", () => {
      expectMethodMatch(z.number().lte(10));
    });

    test("gt", () => {
      expectMethodMatch(z.number().gt(5));
    });

    test("lt", () => {
      expectMethodMatch(z.number().lt(10));
    });
  });

  describe("literals and enums", () => {
    test("literal string", () => {
      expectMethodMatch(z.literal("hello"));
    });

    test("literal number", () => {
      expectMethodMatch(z.literal(42));
    });

    test("literal boolean", () => {
      expectMethodMatch(z.literal(true));
    });

    test("literal null", () => {
      expectMethodMatch(z.literal(null));
    });

    test("multiple literals", () => {
      expectMethodMatch(z.literal(["a", "b", "c"]));
    });

    test("enum", () => {
      expectMethodMatch(z.enum(["red", "green", "blue"]));
    });

    test("nativeEnum", () => {
      enum Colors {
        Red = "red",
        Green = "green",
        Blue = "blue",
      }
      expectMethodMatch(z.nativeEnum(Colors));
    });
  });

  describe("composite types", () => {
    test("array", () => {
      expectMethodMatch(z.array(z.string()));
    });

    test("array with min", () => {
      expectMethodMatch(z.array(z.string()).min(2));
    });

    test("array with max", () => {
      expectMethodMatch(z.array(z.string()).max(10));
    });

    test("object", () => {
      expectMethodMatch(z.object({ name: z.string(), age: z.number() }));
    });

    test("object with optional", () => {
      expectMethodMatch(z.object({ name: z.string(), age: z.number().optional() }));
    });

    test("strict object", () => {
      expectMethodMatch(z.strictObject({ name: z.string() }));
    });

    test("loose object", () => {
      expectMethodMatch(z.looseObject({ name: z.string() }));
    });

    test("object with catchall", () => {
      expectMethodMatch(z.object({ name: z.string() }).catchall(z.string()));
    });

    test("tuple", () => {
      expectMethodMatch(z.tuple([z.string(), z.number()]));
    });

    test("tuple with rest", () => {
      expectMethodMatch(z.tuple([z.string()], z.number()));
    });

    test("record", () => {
      expectMethodMatch(z.record(z.string(), z.number()));
    });

    test("union", () => {
      expectMethodMatch(z.union([z.string(), z.number()]));
    });

    test("discriminated union", () => {
      expectMethodMatch(
        z.discriminatedUnion("type", [
          z.object({ type: z.literal("a"), value: z.string() }),
          z.object({ type: z.literal("b"), value: z.number() }),
        ])
      );
    });

    test("intersection", () => {
      expectMethodMatch(z.intersection(z.object({ a: z.string() }), z.object({ b: z.number() })));
    });
  });

  describe("wrapper types", () => {
    test("optional", () => {
      expectMethodMatch(z.string().optional());
    });

    test("nullable", () => {
      expectMethodMatch(z.string().nullable());
    });

    test("nullish", () => {
      expectMethodMatch(z.string().nullish());
    });

    test("default", () => {
      expectMethodMatch(z.string().default("hello"));
    });

    test("default function", () => {
      expectMethodMatch(z.string().default(() => "hello"));
    });

    test("prefault", () => {
      expectMethodMatch(z.string().prefault("hello"));
    });

    test("prefault function", () => {
      expectMethodMatch(z.string().prefault(() => "hello"));
    });

    test("catch", () => {
      expectMethodMatch(z.string().catch("hello"));
    });

    test("readonly", () => {
      expectMethodMatch(z.string().readonly());
    });

    test("nonoptional", () => {
      expectMethodMatch(z.string().optional().nonoptional());
    });
  });

  describe("special types", () => {
    test("lazy", () => {
      type Node = {
        value: string;
        children?: Node[] | undefined;
      };
      const Node: z.ZodType<Node> = z.lazy(() =>
        z.object({
          value: z.string(),
          children: z.array(Node).optional(),
        })
      ) as z.ZodType<Node>;
      expectMethodMatch(Node);
    });

    test("promise", () => {
      expectMethodMatch(z.promise(z.string()));
    });

    test("pipe", () => {
      expectMethodMatch(
        z
          .string()
          .transform((val) => val.length)
          .pipe(z.number())
      );
    });

    test("transform", () => {
      expectMethodMatch(
        z.string().transform((val) => val.length),
        { unrepresentable: "any" }
      );
    });

    test("file", () => {
      expectMethodMatch(z.file());
    });

    test("file with mime", () => {
      expectMethodMatch(z.file().mime("image/png"));
    });
  });

  describe("parameters", () => {
    test("target draft-7", () => {
      expectMethodMatch(z.string(), { target: "draft-7" });
    });

    test("target draft-4", () => {
      expectMethodMatch(z.string(), { target: "draft-4" });
    });

    test("target openapi-3.0", () => {
      expectMethodMatch(z.string(), { target: "openapi-3.0" });
    });

    test("io input", () => {
      expectMethodMatch(z.string().default("hello"), { io: "input" });
    });

    test("cycles throw", () => {
      const schema = z.object({
        name: z.string(),
        get subcategories() {
          return z.array(schema);
        },
      });
      // Both should throw the same error
      expect(() => z.toJSONSchema(schema, { cycles: "throw" })).toThrow();
      expect(() => schema.toJSONSchema({ cycles: "throw" })).toThrow();
    });

    test("reused ref", () => {
      const shared = z.string();
      const schema = z.object({
        a: shared,
        b: shared,
      });
      expectMethodMatch(schema, { reused: "ref" });
    });
  });

  describe("edge cases with metadata", () => {
    test("schema with id metadata", () => {
      const a = z.string().meta({ id: "hi" });
      expectMethodMatch(a);
    });

    test("schema with id then additional metadata", () => {
      const a = z.string().meta({ id: "hi2" });
      const b = a.meta({ name: "asdf" });
      expectMethodMatch(b);
    });

    test("nested schema with id", () => {
      const inner = z.string().meta({ id: "inner" });
      const outer = z.object({ value: inner });
      expectMethodMatch(outer);
    });
  });
});
