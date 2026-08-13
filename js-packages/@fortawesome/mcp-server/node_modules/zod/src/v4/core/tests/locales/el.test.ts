import { expect, test } from "vitest";
import { z } from "../../../../index.js";
import el from "../../../locales/el.js";

test("Greek locale - too_small errors", () => {
  z.config(el());

  // Test string type translation
  const stringSchema = z.string().min(5);
  const stringResult = stringSchema.safeParse("abc");
  expect(stringResult.success).toBe(false);
  if (!stringResult.success) {
    expect(stringResult.error.issues[0].message).toBe("Πολύ μικρό: αναμενόταν string να έχει >=5 χαρακτήρες");
  }

  // Test number type translation
  const numberSchema = z.number().min(10);
  const numberResult = numberSchema.safeParse(5);
  expect(numberResult.success).toBe(false);
  if (!numberResult.success) {
    expect(numberResult.error.issues[0].message).toBe("Πολύ μικρό: αναμενόταν number να είναι >=10");
  }

  // Test array type translation
  const arraySchema = z.array(z.string()).min(3);
  const arrayResult = arraySchema.safeParse(["a", "b"]);
  expect(arrayResult.success).toBe(false);
  if (!arrayResult.success) {
    expect(arrayResult.error.issues[0].message).toBe("Πολύ μικρό: αναμενόταν array να έχει >=3 στοιχεία");
  }

  // Test set type translation
  const setSchema = z.set(z.string()).min(2);
  const setResult = setSchema.safeParse(new Set(["a"]));
  expect(setResult.success).toBe(false);
  if (!setResult.success) {
    expect(setResult.error.issues[0].message).toBe("Πολύ μικρό: αναμενόταν set να έχει >=2 στοιχεία");
  }
});

test("Greek locale - too_big errors", () => {
  z.config(el());

  // Test string type translation
  const stringSchema = z.string().max(3);
  const stringResult = stringSchema.safeParse("abcde");
  expect(stringResult.success).toBe(false);
  if (!stringResult.success) {
    expect(stringResult.error.issues[0].message).toBe("Πολύ μεγάλο: αναμενόταν string να έχει <=3 χαρακτήρες");
  }

  // Test number type translation
  const numberSchema = z.number().max(10);
  const numberResult = numberSchema.safeParse(15);
  expect(numberResult.success).toBe(false);
  if (!numberResult.success) {
    expect(numberResult.error.issues[0].message).toBe("Πολύ μεγάλο: αναμενόταν number να είναι <=10");
  }

  // Test array type translation
  const arraySchema = z.array(z.string()).max(2);
  const arrayResult = arraySchema.safeParse(["a", "b", "c"]);
  expect(arrayResult.success).toBe(false);
  if (!arrayResult.success) {
    expect(arrayResult.error.issues[0].message).toBe("Πολύ μεγάλο: αναμενόταν array να έχει <=2 στοιχεία");
  }
});

test("Greek locale - invalid_type errors", () => {
  z.config(el());

  // Test string expected, number received
  const stringSchema = z.string();
  const stringResult = stringSchema.safeParse(123);
  expect(stringResult.success).toBe(false);
  if (!stringResult.success) {
    expect(stringResult.error.issues[0].message).toBe("Μη έγκυρη είσοδος: αναμενόταν string, λήφθηκε number");
  }

  // Test number expected, string received
  const numberSchema = z.number();
  const numberResult = numberSchema.safeParse("abc");
  expect(numberResult.success).toBe(false);
  if (!numberResult.success) {
    expect(numberResult.error.issues[0].message).toBe("Μη έγκυρη είσοδος: αναμενόταν number, λήφθηκε string");
  }

  // Test boolean expected, null received
  const booleanSchema = z.boolean();
  const booleanResult = booleanSchema.safeParse(null);
  expect(booleanResult.success).toBe(false);
  if (!booleanResult.success) {
    expect(booleanResult.error.issues[0].message).toBe("Μη έγκυρη είσοδος: αναμενόταν boolean, λήφθηκε null");
  }

  // Test array expected, object received
  const arraySchema = z.array(z.string());
  const arrayResult = arraySchema.safeParse({});
  expect(arrayResult.success).toBe(false);
  if (!arrayResult.success) {
    expect(arrayResult.error.issues[0].message).toBe("Μη έγκυρη είσοδος: αναμενόταν array, λήφθηκε object");
  }
});

test("Greek locale - other error cases", () => {
  z.config(el());

  // Test invalid_element with map (only "map" | "set" produce invalid_element)
  const mapSchema = z.map(z.bigint(), z.number());
  const mapResult = mapSchema.safeParse(new Map([[BigInt(123), BigInt(123)]]));
  expect(mapResult.success).toBe(false);
  if (!mapResult.success) {
    expect(mapResult.error.issues[0].code).toBe("invalid_element");
    expect(mapResult.error.issues[0].message).toBe("Μη έγκυρη τιμή στο map");
  }

  // Test invalid_key with record (only "map" | "record" produce invalid_key)
  const recordSchema = z.record(z.number(), z.string());
  const recordResult = recordSchema.safeParse({ notANumber: "value" });
  expect(recordResult.success).toBe(false);
  if (!recordResult.success) {
    expect(recordResult.error.issues[0].code).toBe("invalid_key");
    expect(recordResult.error.issues[0].message).toBe("Μη έγκυρο κλειδί στο record");
  }

  // Test invalid_value with enum
  const enumSchema = z.enum(["a", "b"]);
  const enumResult = enumSchema.safeParse("c");
  expect(enumResult.success).toBe(false);
  if (!enumResult.success) {
    expect(enumResult.error.issues[0].message).toBe('Μη έγκυρη επιλογή: αναμενόταν ένα από "a"|"b"');
  }

  // Test not_multiple_of
  const multipleSchema = z.number().multipleOf(3);
  const multipleResult = multipleSchema.safeParse(10);
  expect(multipleResult.success).toBe(false);
  if (!multipleResult.success) {
    expect(multipleResult.error.issues[0].message).toBe("Μη έγκυρος αριθμός: πρέπει να είναι πολλαπλάσιο του 3");
  }

  // Test unrecognized_keys (single key)
  const strictSchema = z.object({ a: z.string() }).strict();
  const strictResult = strictSchema.safeParse({ a: "test", b: "extra" });
  expect(strictResult.success).toBe(false);
  if (!strictResult.success) {
    expect(strictResult.error.issues[0].message).toBe('Άγνωστο κλειδί: "b"');
  }

  // Test unrecognized_keys (multiple keys)
  const strictMultipleResult = strictSchema.safeParse({
    a: "test",
    b: "extra",
    c: "another",
  });
  expect(strictMultipleResult.success).toBe(false);
  if (!strictMultipleResult.success) {
    expect(strictMultipleResult.error.issues[0].message).toBe('Άγνωστα κλειδιά: "b", "c"');
  }

  // Test invalid_union
  const unionSchema = z.union([z.string(), z.number()]);
  const unionResult = unionSchema.safeParse(true);
  expect(unionResult.success).toBe(false);
  if (!unionResult.success) {
    expect(unionResult.error.issues[0].message).toBe("Μη έγκυρη είσοδος");
  }

  // Test invalid_format with regex
  const regexSchema = z.string().regex(/^[a-z]+$/);
  const regexResult = regexSchema.safeParse("ABC123");
  expect(regexResult.success).toBe(false);
  if (!regexResult.success) {
    expect(regexResult.error.issues[0].message).toBe(
      "Μη έγκυρη συμβολοσειρά: πρέπει να ταιριάζει με το μοτίβο /^[a-z]+$/"
    );
  }

  // Test invalid_format with startsWith
  const startsWithSchema = z.string().startsWith("hello");
  const startsWithResult = startsWithSchema.safeParse("world");
  expect(startsWithResult.success).toBe(false);
  if (!startsWithResult.success) {
    expect(startsWithResult.error.issues[0].message).toBe('Μη έγκυρη συμβολοσειρά: πρέπει να ξεκινά με "hello"');
  }

  // Test invalid_format with endsWith
  const endsWithSchema = z.string().endsWith("world");
  const endsWithResult = endsWithSchema.safeParse("hello");
  expect(endsWithResult.success).toBe(false);
  if (!endsWithResult.success) {
    expect(endsWithResult.error.issues[0].message).toBe('Μη έγκυρη συμβολοσειρά: πρέπει να τελειώνει με "world"');
  }

  // Test invalid_format with includes
  const includesSchema = z.string().includes("test");
  const includesResult = includesSchema.safeParse("hello");
  expect(includesResult.success).toBe(false);
  if (!includesResult.success) {
    expect(includesResult.error.issues[0].message).toBe('Μη έγκυρη συμβολοσειρά: πρέπει να περιέχει "test"');
  }
});

test("Greek locale - invalid_type with instanceof (class-name expected)", () => {
  z.config(el());

  // When `expected` starts with a capital letter, render an `instanceof` message,
  // matching the convention used by most other locales (de, es, fr, it, etc.).
  const dateSchema = z.instanceof(Date);
  const dateResult = dateSchema.safeParse("not a date");
  expect(dateResult.success).toBe(false);
  if (!dateResult.success) {
    expect(dateResult.error.issues[0].message).toBe("Μη έγκυρη είσοδος: αναμενόταν instanceof Date, λήφθηκε string");
  }
});
