import { expect, test } from "vitest";
import * as z from "zod/v4";

test("locales - uz", () => {
  z.config(z.locales.uz());

  const invalidType = z.number().safeParse("a");
  expect(invalidType.error!.issues[0].code).toBe("invalid_type");
  expect(invalidType.error!.issues[0].message).toBe("Noto‘g‘ri kirish: kutilgan raqam, qabul qilingan string");

  const invalidType2 = z.string().safeParse(1);
  expect(invalidType2.error!.issues[0].code).toBe("invalid_type");
  expect(invalidType2.error!.issues[0].message).toBe("Noto‘g‘ri kirish: kutilgan string, qabul qilingan raqam");

  const invalidValue = z.enum(["a", "b"]).safeParse(1);
  expect(invalidValue.error!.issues[0].code).toBe("invalid_value");
  expect(invalidValue.error!.issues[0].message).toBe('Noto‘g‘ri variant: quyidagilardan biri kutilgan "a"|"b"');

  const tooBig = z.number().max(10).safeParse(15);
  expect(tooBig.error!.issues[0].code).toBe("too_big");
  expect(tooBig.error!.issues[0].message).toBe("Juda katta: kutilgan number <=10");

  const tooSmall = z.number().min(10).safeParse(5);
  expect(tooSmall.error!.issues[0].code).toBe("too_small");
  expect(tooSmall.error!.issues[0].message).toBe("Juda kichik: kutilgan number >=10");

  const invalidFormatRegex = z.string().regex(/abcd/).safeParse("invalid-string");
  expect(invalidFormatRegex.error!.issues[0].code).toBe("invalid_format");
  expect(invalidFormatRegex.error!.issues[0].message).toContain("shabloniga mos kelishi kerak");

  const invalidFormatStartsWith = z.string().startsWith("abcd").safeParse("invalid-string");
  expect(invalidFormatStartsWith.error!.issues[0].code).toBe("invalid_format");
  expect(invalidFormatStartsWith.error!.issues[0].message).toContain('"abcd" bilan boshlanishi kerak');

  const notMultipleOf = z.number().multipleOf(3).safeParse(10);
  expect(notMultipleOf.error!.issues[0].code).toBe("not_multiple_of");
  expect(notMultipleOf.error!.issues[0].message).toContain("3 ning karralisi bo‘lishi kerak");

  const unrecognizedKeys = z.object({ a: z.string(), b: z.number() }).strict().safeParse({ a: "a", b: 1, c: 2 });
  expect(unrecognizedKeys.error!.issues[0].code).toBe("unrecognized_keys");
  expect(unrecognizedKeys.error!.issues[0].message).toContain('Noma’lum kalit: "c"');

  const invalidUnion = z.union([z.string(), z.number()]).safeParse(true);
  expect(invalidUnion.error!.issues[0].code).toBe("invalid_union");
  expect(invalidUnion.error!.issues[0].message).toBe("Noto‘g‘ri kirish");

  const tooBigString = z.string().max(5).safeParse("too long string");
  expect(tooBigString.error!.issues[0].code).toBe("too_big");
  expect(tooBigString.error!.issues[0].message).toContain("belgi");
  expect(tooBigString.error!.issues[0].message).toContain("bo‘lishi kerak");

  const tooSmallArray = z.array(z.string()).min(3).safeParse(["a", "b"]);
  expect(tooSmallArray.error!.issues[0].code).toBe("too_small");
  expect(tooSmallArray.error!.issues[0].message).toContain("element");
  expect(tooSmallArray.error!.issues[0].message).toContain("bo‘lishi kerak");

  const invalidFormatEndsWith = z.string().endsWith("xyz").safeParse("invalid-string");
  expect(invalidFormatEndsWith.error!.issues[0].code).toBe("invalid_format");
  expect(invalidFormatEndsWith.error!.issues[0].message).toContain('"xyz" bilan tugashi kerak');

  const invalidFormatIncludes = z.string().includes("test").safeParse("invalid-string");
  expect(invalidFormatIncludes.error!.issues[0].code).toBe("invalid_format");
  expect(invalidFormatIncludes.error!.issues[0].message).toContain('"test" ni o‘z ichiga olishi kerak');

  const invalidFormatEmail = z.string().email().safeParse("invalid-email");
  expect(invalidFormatEmail.error!.issues[0].code).toBe("invalid_format");
  expect(invalidFormatEmail.error!.issues[0].message).toContain("elektron pochta manzili");

  const invalidFormatUrl = z.string().url().safeParse("invalid-url");
  expect(invalidFormatUrl.error!.issues[0].code).toBe("invalid_format");
  expect(invalidFormatUrl.error!.issues[0].message).toContain("URL");

  const unrecognizedKeysMultiple = z
    .object({ a: z.string(), b: z.number() })
    .strict()
    .safeParse({ a: "a", b: 1, c: 2, d: 3 });
  expect(unrecognizedKeysMultiple.error!.issues[0].code).toBe("unrecognized_keys");
  expect(unrecognizedKeysMultiple.error!.issues[0].message).toContain("Noma’lum kalitlar");

  const invalidElement = z.array(z.string()).safeParse([1, 2, 3]);
  expect(invalidElement.error!.issues[0].code).toBe("invalid_type");
  expect(invalidElement.error!.issues[0].message).toContain("raqam");

  const tooSmallMap = z
    .map(z.string(), z.string())
    .min(3)
    .safeParse(new Map([["a", "b"]]));
  expect(tooSmallMap.error!.issues[0].code).toBe("too_small");
  expect(tooSmallMap.error!.issues[0].message).toContain("yozuv");
  expect(tooSmallMap.error!.issues[0].message).toContain("bo‘lishi kerak");

  const tooBigMap = z
    .map(z.string(), z.string())
    .max(2)
    .safeParse(
      new Map([
        ["a", "b"],
        ["c", "d"],
        ["e", "f"],
      ])
    );
  expect(tooBigMap.error!.issues[0].code).toBe("too_big");
  expect(tooBigMap.error!.issues[0].message).toContain("yozuv");
  expect(tooBigMap.error!.issues[0].message).toContain("bo‘lishi kerak");
});
