import { afterEach, expect, test } from "vitest";
import * as z from "zod/v4";
import * as core from "zod/v4/core";

// `globalConfig` is attached to `globalThis.__zod_globalConfig` so that a
// single config object is shared across CJS/ESM builds and across multiple
// bundled copies of Zod in a monorepo. This mirrors the existing
// `globalRegistry` -> `globalThis.__zod_globalRegistry` treatment.
//
// See #5789 for the footgun this fixes: users with both CJS and ESM
// instances of Zod loaded had to call `z.config({ jitless: true })`
// twice — once per instance — because each module-scope `globalConfig`
// was a different object. With this change, one call updates state seen
// by every loaded copy.

afterEach(() => {
  // Don't leak config mutations into other test files.
  delete core.globalConfig.jitless;
});

test("globalConfig is singleton and attached to globalThis", () => {
  expect(core.globalConfig).toBe((globalThis as any).__zod_globalConfig);
});

test("z.config writes are observed via globalThis.__zod_globalConfig", () => {
  z.config({ jitless: true });
  expect((globalThis as any).__zod_globalConfig.jitless).toBe(true);
});

test("pre-set globalThis.__zod_globalConfig is preserved on import", () => {
  // Object identity is preserved across reloads of the module: anyone who
  // pre-populates `globalThis.__zod_globalConfig` before Zod loads (e.g.
  // an inline script before the bundle) keeps that exact object as the
  // source of truth. Mutating it directly is equivalent to z.config().
  const direct = (globalThis as any).__zod_globalConfig;
  direct.jitless = true;
  expect(core.globalConfig.jitless).toBe(true);
  expect(z.config()).toBe(core.globalConfig);
});
