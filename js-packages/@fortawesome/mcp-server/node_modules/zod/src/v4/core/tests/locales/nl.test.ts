import { expect, test } from "vitest";
import nl from "../../../locales/nl.js";

test("Dutch locale error messages", () => {
  const { localeError } = nl();

  // Test invalid_type
  expect(
    localeError({
      code: "invalid_type",
      expected: "string",
      input: 123,
    })
  ).toBe("Ongeldige invoer: verwacht string, ontving getal");

  // Test too_big with sizing
  expect(
    localeError({
      code: "too_big",
      origin: "string",
      maximum: 10,
      inclusive: true,
      input: "test string that is too long",
    })
  ).toBe("Te lang: verwacht dat string <=10 tekens heeft");

  // Test too_small with sizing
  expect(
    localeError({
      code: "too_small",
      origin: "array",
      minimum: 5,
      inclusive: false,
      input: [1, 2],
    })
  ).toBe("Te klein: verwacht dat array >5 elementen heeft");

  // Test invalid_format
  expect(
    localeError({
      code: "invalid_format",
      format: "email",
      input: "invalid-email",
    })
  ).toBe("Ongeldig: emailadres");
});
