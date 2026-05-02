import { expectTypeOf, test } from "vitest";
import * as z from "zod/v4";

test("ZodPreprocess<B> assignable to ZodPipe<$ZodTransform, B>", () => {
  const pre = z.preprocess((v) => v, z.string().optional());
  const _asPipe: z.ZodPipe<z.core.$ZodTransform, z.ZodOptional<z.ZodString>> = pre;
  const _asCorePipe: z.core.$ZodPipe<z.core.$ZodTransform, z.ZodOptional<z.ZodString>> = pre;
  expectTypeOf(_asPipe).toMatchTypeOf<z.ZodPipe>();
  expectTypeOf(_asCorePipe).toMatchTypeOf<z.core.$ZodPipe>();
});

test("ZodPreprocess optin/optout defer to B", () => {
  const optionalInside = z.preprocess((v) => v, z.string().optional());
  expectTypeOf<(typeof optionalInside)["_zod"]["optin"]>().toEqualTypeOf<"optional">();
  expectTypeOf<(typeof optionalInside)["_zod"]["optout"]>().toEqualTypeOf<"optional">();

  const required = z.preprocess((v) => v, z.string());
  expectTypeOf<(typeof required)["_zod"]["optin"]>().toEqualTypeOf<"optional" | undefined>();
  expectTypeOf<(typeof required)["_zod"]["optout"]>().toEqualTypeOf<"optional" | undefined>();
});

test("ZodPreprocess input/output inference", () => {
  const pre = z.preprocess((v) => v, z.number().optional());
  expectTypeOf<z.output<typeof pre>>().toEqualTypeOf<number | undefined>();
  expectTypeOf<z.input<typeof pre>>().toEqualTypeOf<unknown>();
});
