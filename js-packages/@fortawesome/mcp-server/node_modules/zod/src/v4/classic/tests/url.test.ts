import { expect, expectTypeOf, test } from "vitest";
import * as z from "zod/v4";

test("type inference", () => {
  const schema = z.string().array();
  expectTypeOf<z.infer<typeof schema>>().toEqualTypeOf<string[]>();
});

test("url regex", () => {
  expect((z.url({ hostname: /^example\.com$/ }).safeParse("http://example.org/").error?.issues[0] as any).pattern).toBe(
    "^example\\.com$"
  );
});
