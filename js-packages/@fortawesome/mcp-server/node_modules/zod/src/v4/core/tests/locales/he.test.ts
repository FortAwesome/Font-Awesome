import { beforeEach, describe, expect, test } from "vitest";
import { z } from "../../../../index.js";
import he from "../../../locales/he.js";

describe("Hebrew localization", () => {
  beforeEach(() => {
    z.config(he());
  });

  describe("too_small errors with definite article and gendered verbs", () => {
    test("string type (feminine - צריכה)", () => {
      const schema = z.string().min(3);
      const result = schema.safeParse("ab");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("קצר מדי: המחרוזת צריכה להכיל 3 תווים או יותר");
      }
    });

    test("number type (masculine - צריך)", () => {
      const schema = z.number().min(10);
      const result = schema.safeParse(5);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("קטן מדי: המספר צריך להיות גדול או שווה ל-10");
      }
    });

    test("array type (masculine - צריך)", () => {
      const schema = z.array(z.string()).min(1);
      const result = schema.safeParse([]);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("קטן מדי: המערך צריך להכיל לפחות פריט אחד");
      }
    });

    test("set type (feminine - צריכה)", () => {
      const schema = z.set(z.string()).min(2);
      const result = schema.safeParse(new Set(["a"]));
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("קטן מדי: הקבוצה (Set) צריכה להכיל 2 פריטים או יותר");
      }
    });
  });

  describe("too_big errors with definite article and gendered verbs", () => {
    test("string type (feminine - צריכה)", () => {
      const schema = z.string().max(3);
      const result = schema.safeParse("abcde");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("ארוך מדי: המחרוזת צריכה להכיל 3 תווים או פחות");
      }
    });

    test("number type (masculine - צריך)", () => {
      const schema = z.number().max(365);
      const result = schema.safeParse(400);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("גדול מדי: המספר צריך להיות קטן או שווה ל-365");
      }
    });

    test("array max", () => {
      const schema = z.array(z.string()).max(2);
      const result = schema.safeParse(["a", "b", "c"]);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("גדול מדי: המערך צריך להכיל 2 פריטים או פחות");
      }
    });
  });

  describe("invalid_type errors with definite article and gendered verbs", () => {
    test("string expected (feminine), number received", () => {
      const schema = z.string();
      const result = schema.safeParse(123);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("קלט לא תקין: צריך להיות מחרוזת, התקבל מספר");
      }
    });

    test("number expected (masculine), string received", () => {
      const schema = z.number();
      const result = schema.safeParse("abc");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("קלט לא תקין: צריך להיות מספר, התקבל מחרוזת");
      }
    });

    test("boolean expected (masculine), null received", () => {
      const schema = z.boolean();
      const result = schema.safeParse(null);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("קלט לא תקין: צריך להיות ערך בוליאני, התקבל ערך ריק (null)");
      }
    });

    test("array expected (masculine), object received", () => {
      const schema = z.array(z.string());
      const result = schema.safeParse({});
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("קלט לא תקין: צריך להיות מערך, התקבל אובייקט");
      }
    });

    test("object expected (masculine), array received", () => {
      const schema = z.object({ a: z.string() });
      const result = schema.safeParse([]);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("קלט לא תקין: צריך להיות אובייקט, התקבל מערך");
      }
    });

    test("function expected (feminine), string received", () => {
      const schema = z.function();
      const result = schema.safeParse("not a function");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("קלט לא תקין: צריך להיות פונקציה, התקבל מחרוזת");
      }
    });
  });

  describe("gendered verbs consistency", () => {
    test("feminine types use צריכה", () => {
      const feminineTypes = [
        { schema: z.string().min(5), input: "abc" },
        { schema: z.set(z.string()).min(2), input: new Set(["a"]) },
      ];

      for (const { schema, input } of feminineTypes) {
        const result = schema.safeParse(input);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toContain("צריכה");
        }
      }
    });

    test("masculine types use צריך", () => {
      const masculineTypes = [
        { schema: z.number().min(10), input: 5 },
        { schema: z.array(z.string()).min(2), input: ["a"] },
      ];

      for (const { schema, input } of masculineTypes) {
        const result = schema.safeParse(input);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toContain("צריך");
        }
      }
    });
  });

  describe("invalid_value with enum", () => {
    test("single value", () => {
      const schema = z.enum(["a"]);
      const result = schema.safeParse("b");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('ערך לא תקין: הערך חייב להיות "a"');
      }
    });

    test("two values", () => {
      const schema = z.enum(["a", "b"]);
      const result = schema.safeParse("c");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('ערך לא תקין: האפשרויות המתאימות הן "a" או "b"');
      }
    });

    test("multiple values", () => {
      const schema = z.enum(["a", "b", "c"]);
      const result = schema.safeParse("d");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('ערך לא תקין: האפשרויות המתאימות הן "a", "b" או "c"');
      }
    });
  });

  describe("other error types", () => {
    test("not_multiple_of", () => {
      const schema = z.number().multipleOf(3);
      const result = schema.safeParse(10);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("מספר לא תקין: חייב להיות מכפלה של 3");
      }
    });

    test("unrecognized_keys - single key", () => {
      const schema = z.object({ a: z.string() }).strict();
      const result = schema.safeParse({ a: "test", b: "extra" });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('מפתח לא מזוהה: "b"');
      }
    });

    test("unrecognized_keys - multiple keys", () => {
      const schema = z.object({ a: z.string() }).strict();
      const result = schema.safeParse({ a: "test", b: "extra", c: "more" });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('מפתחות לא מזוהים: "b", "c"');
      }
    });

    test("invalid_union", () => {
      const schema = z.union([z.string(), z.number()]);
      const result = schema.safeParse(true);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("קלט לא תקין");
      }
    });

    test("invalid_key in object", () => {
      const schema = z.record(z.number(), z.string());
      const result = schema.safeParse({ notANumber: "value" });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("שדה לא תקין באובייקט");
      }
    });
  });

  describe("invalid_format with string checks", () => {
    test("startsWith", () => {
      const schema = z.string().startsWith("hello");
      const result = schema.safeParse("world");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('המחרוזת חייבת להתחיל ב "hello"');
      }
    });

    test("endsWith", () => {
      const schema = z.string().endsWith("world");
      const result = schema.safeParse("hello");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('המחרוזת חייבת להסתיים ב "world"');
      }
    });

    test("includes", () => {
      const schema = z.string().includes("test");
      const result = schema.safeParse("hello world");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('המחרוזת חייבת לכלול "test"');
      }
    });

    test("regex", () => {
      const schema = z.string().regex(/^[a-z]+$/);
      const result = schema.safeParse("ABC123");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("המחרוזת חייבת להתאים לתבנית /^[a-z]+$/");
      }
    });
  });

  describe("invalid_format with common formats", () => {
    test("email", () => {
      const schema = z.string().email();
      const result = schema.safeParse("not-an-email");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("כתובת אימייל לא תקינה");
      }
    });

    test("url", () => {
      const schema = z.string().url();
      const result = schema.safeParse("not-a-url");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("כתובת רשת לא תקינה");
      }
    });

    test("uuid", () => {
      const schema = z.string().uuid();
      const result = schema.safeParse("not-a-uuid");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("UUID לא תקין");
      }
    });
  });

  describe("tuple validation", () => {
    test("invalid element type in tuple shows full error message", () => {
      const schema = z.tuple([z.string(), z.number()]);
      const result = schema.safeParse(["abc", "not a number"]);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("קלט לא תקין: צריך להיות מספר, התקבל מחרוזת");
      }
    });
  });

  describe("inclusive vs exclusive bounds", () => {
    test("inclusive minimum (>=)", () => {
      const schema = z.number().min(10);
      const result = schema.safeParse(5);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("קטן מדי: המספר צריך להיות גדול או שווה ל-10");
      }
    });

    test("exclusive minimum (>)", () => {
      const schema = z.number().gt(10);
      const result = schema.safeParse(10);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("קטן מדי: המספר צריך להיות גדול מ-10");
      }
    });

    test("inclusive maximum (<=)", () => {
      const schema = z.number().max(10);
      const result = schema.safeParse(15);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("גדול מדי: המספר צריך להיות קטן או שווה ל-10");
      }
    });

    test("exclusive maximum (<)", () => {
      const schema = z.number().lt(10);
      const result = schema.safeParse(10);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("גדול מדי: המספר צריך להיות קטן מ-10");
      }
    });
  });

  describe("all type names with definite article", () => {
    test("verifies all type translations are correct", () => {
      const types = [
        { schema: z.string(), expected: "מחרוזת", input: 123 },
        { schema: z.number(), expected: "מספר", input: "abc" },
        { schema: z.boolean(), expected: "ערך בוליאני", input: "abc" },
        { schema: z.bigint(), expected: "BigInt", input: "abc" },
        { schema: z.date(), expected: "תאריך", input: "abc" },
        { schema: z.array(z.any()), expected: "מערך", input: "abc" },
        { schema: z.object({}), expected: "אובייקט", input: "abc" },
        { schema: z.function(), expected: "פונקציה", input: "abc" },
      ];

      for (const { schema, expected, input } of types) {
        const result = schema.safeParse(input);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toContain(expected);
        }
      }
    });
  });
});
