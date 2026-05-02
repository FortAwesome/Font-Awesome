import { expect, test } from "vitest";
import { z } from "../../../../index.js";
import hr from "../../../locales/hr.js";

test("Croatian locale - type name translations in too_small errors", () => {
  z.config(hr());

  // Test string type translation
  const stringSchema = z.string().min(5);
  const stringResult = stringSchema.safeParse("abc");
  expect(stringResult.success).toBe(false);
  if (!stringResult.success) {
    expect(stringResult.error.issues[0].message).toBe("Premalo: očekivano da tekst ima >=5 znakova");
  }

  // Test number type translation
  const numberSchema = z.number().min(10);
  const numberResult = numberSchema.safeParse(5);
  expect(numberResult.success).toBe(false);
  if (!numberResult.success) {
    expect(numberResult.error.issues[0].message).toBe("Premalo: očekivano da broj bude >=10");
  }

  // Test array type translation
  const arraySchema = z.array(z.string()).min(3);
  const arrayResult = arraySchema.safeParse(["a", "b"]);
  expect(arrayResult.success).toBe(false);
  if (!arrayResult.success) {
    expect(arrayResult.error.issues[0].message).toBe("Premalo: očekivano da niz ima >=3 stavki");
  }

  // Test set type translation
  const setSchema = z.set(z.string()).min(2);
  const setResult = setSchema.safeParse(new Set(["a"]));
  expect(setResult.success).toBe(false);
  if (!setResult.success) {
    expect(setResult.error.issues[0].message).toBe("Premalo: očekivano da skup ima >=2 stavki");
  }
});

test("Croatian locale - type name translations in too_big errors", () => {
  z.config(hr());

  // Test string type translation
  const stringSchema = z.string().max(3);
  const stringResult = stringSchema.safeParse("abcde");
  expect(stringResult.success).toBe(false);
  if (!stringResult.success) {
    expect(stringResult.error.issues[0].message).toBe("Preveliko: očekivano da tekst ima <=3 znakova");
  }

  // Test number type translation
  const numberSchema = z.number().max(10);
  const numberResult = numberSchema.safeParse(15);
  expect(numberResult.success).toBe(false);
  if (!numberResult.success) {
    expect(numberResult.error.issues[0].message).toBe("Preveliko: očekivano da broj bude <=10");
  }

  // Test array type translation
  const arraySchema = z.array(z.string()).max(2);
  const arrayResult = arraySchema.safeParse(["a", "b", "c"]);
  expect(arrayResult.success).toBe(false);
  if (!arrayResult.success) {
    expect(arrayResult.error.issues[0].message).toBe("Preveliko: očekivano da niz ima <=2 stavki");
  }
});

test("Croatian locale - type name translations in invalid_type errors", () => {
  z.config(hr());

  // Test string expected, number received
  const stringSchema = z.string();
  const stringResult = stringSchema.safeParse(123);
  expect(stringResult.success).toBe(false);
  if (!stringResult.success) {
    expect(stringResult.error.issues[0].message).toBe("Neispravan unos: očekuje se tekst, a primljeno je broj");
  }

  // Test number expected, string received
  const numberSchema = z.number();
  const numberResult = numberSchema.safeParse("abc");
  expect(numberResult.success).toBe(false);
  if (!numberResult.success) {
    expect(numberResult.error.issues[0].message).toBe("Neispravan unos: očekuje se broj, a primljeno je tekst");
  }

  // Test boolean expected, null received
  const booleanSchema = z.boolean();
  const booleanResult = booleanSchema.safeParse(null);
  expect(booleanResult.success).toBe(false);
  if (!booleanResult.success) {
    expect(booleanResult.error.issues[0].message).toBe("Neispravan unos: očekuje se boolean, a primljeno je null");
  }

  // Test array expected, object received
  const arraySchema = z.array(z.string());
  const arrayResult = arraySchema.safeParse({});
  expect(arrayResult.success).toBe(false);
  if (!arrayResult.success) {
    expect(arrayResult.error.issues[0].message).toBe("Neispravan unos: očekuje se niz, a primljeno je objekt");
  }
});

test("Croatian locale - other error cases", () => {
  z.config(hr());

  // Test invalid_element with tuple
  const tupleSchema = z.tuple([z.string(), z.number()]);
  const tupleResult = tupleSchema.safeParse(["abc", "not a number"]);
  expect(tupleResult.success).toBe(false);
  if (!tupleResult.success) {
    expect(tupleResult.error.issues[0].message).toContain("Neispravan unos");
  }

  // Test invalid_value with enum
  const enumSchema = z.enum(["a", "b"]);
  const enumResult = enumSchema.safeParse("c");
  expect(enumResult.success).toBe(false);
  if (!enumResult.success) {
    expect(enumResult.error.issues[0].message).toBe('Neispravna opcija: očekivano jedno od "a"|"b"');
  }

  // Test not_multiple_of
  const multipleSchema = z.number().multipleOf(3);
  const multipleResult = multipleSchema.safeParse(10);
  expect(multipleResult.success).toBe(false);
  if (!multipleResult.success) {
    expect(multipleResult.error.issues[0].message).toBe("Neispravan broj: mora biti višekratnik od 3");
  }

  // Test unrecognized_keys
  const strictSchema = z.object({ a: z.string() }).strict();
  const strictResult = strictSchema.safeParse({ a: "test", b: "extra" });
  expect(strictResult.success).toBe(false);
  if (!strictResult.success) {
    expect(strictResult.error.issues[0].message).toBe('Neprepoznat ključ: "b"');
  }

  // Test invalid_union
  const unionSchema = z.union([z.string(), z.number()]);
  const unionResult = unionSchema.safeParse(true);
  expect(unionResult.success).toBe(false);
  if (!unionResult.success) {
    expect(unionResult.error.issues[0].message).toBe("Neispravan unos");
  }

  // Test invalid_format with regex
  const regexSchema = z.string().regex(/^[a-z]+$/);
  const regexResult = regexSchema.safeParse("ABC123");
  expect(regexResult.success).toBe(false);
  if (!regexResult.success) {
    expect(regexResult.error.issues[0].message).toBe("Neispravan tekst: mora odgovarati uzorku /^[a-z]+$/");
  }

  // Test invalid_format with startsWith
  const startsWithSchema = z.string().startsWith("hello");
  const startsWithResult = startsWithSchema.safeParse("world");
  expect(startsWithResult.success).toBe(false);
  if (!startsWithResult.success) {
    expect(startsWithResult.error.issues[0].message).toBe('Neispravan tekst: mora započinjati s "hello"');
  }
});
