import { expect, test } from "vitest";
import * as z from "zod/v4";

test("Romanian locale uses 'șir' instead of 'string'", () => {
  z.setErrorMap(z.locales.ro().localeError);

  // Test 1: Invalid type (Expected string, received number)
  const stringSchema = z.string();
  const numberResult = stringSchema.safeParse(123);
  expect(numberResult.success).toBe(false);
  if (!numberResult.success) {
    // Expected: "Intrare invalidă: așteptat șir, primit număr"
    expect(numberResult.error.issues[0].message).toBe("Intrare invalidă: așteptat șir, primit număr");
  }

  // Test 2: Invalid base64
  const base64Schema = z.string().base64();
  const base64Result = base64Schema.safeParse("not base64!");
  expect(base64Result.success).toBe(false);
  if (!base64Result.success) {
    // Expected: "Format invalid: șir codat base64"
    expect(base64Result.error.issues[0].message).toBe("Format invalid: șir codat base64");
  }
});
