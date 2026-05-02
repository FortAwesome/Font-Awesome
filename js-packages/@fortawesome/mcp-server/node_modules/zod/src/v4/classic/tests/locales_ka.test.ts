import { expect, test } from "vitest";
import * as z from "zod/v4";

test("Georgian locale uses 'ველი' instead of 'სტრინგი'", () => {
  // Save original error map to restore later if needed, though tests are usually isolated or we can reset
  // const originalErrorMap = z.getErrorMap(); // z.getErrorMap might not exist, but let's assume isolation or just set it

  z.setErrorMap(z.locales.ka().localeError);

  // Test 1: Invalid type (Expected string, received number)
  const stringSchema = z.string();
  const numberResult = stringSchema.safeParse(123);
  expect(numberResult.success).toBe(false);
  if (!numberResult.success) {
    // Expected: "არასწორი შეყვანა: მოსალოდნელი ველი, მიღებული რიცხვი"
    expect(numberResult.error.issues[0].message).toBe("არასწორი შეყვანა: მოსალოდნელი ველი, მიღებული რიცხვი");
  }

  // Test 2: Invalid base64
  const base64Schema = z.string().base64();
  const base64Result = base64Schema.safeParse("not base64!");
  expect(base64Result.success).toBe(false);
  if (!base64Result.success) {
    // Expected: "არასწორი base64-კოდირებული ველი"
    // "არასწორი ${FormatDictionary[_issue.format] ?? issue.format}"
    // FormatDictionary['base64'] is "base64-კოდირებული ველი"
    expect(base64Result.error.issues[0].message).toBe("არასწორი base64-კოდირებული ველი");
  }
});
