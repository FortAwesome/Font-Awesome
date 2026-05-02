import { expect, test } from "vitest";
import { type infer as _infer, json, nullable, object, pipe, transform } from "../../mini/index.js";
// biome-ignore lint/correctness/noUnusedImports: This import verifies the type is exported
import type { _ZodMiniJSONSchema } from "../../mini/schemas.js";

const DataType = object({
  data: json(),
});
type DataType = _infer<typeof DataType>;

// biome-ignore lint/suspicious/noExportsInTest: This export is required to reproduce TS4023
export const Container = object({
  contained: pipe(
    nullable(DataType),
    transform<DataType | null>(
      (v) =>
        v ?? {
          data: "",
        }
    )
  ),
});

test("issue reproduction should compile without type errors", () => {
  expect(Container).toBeDefined();
});
