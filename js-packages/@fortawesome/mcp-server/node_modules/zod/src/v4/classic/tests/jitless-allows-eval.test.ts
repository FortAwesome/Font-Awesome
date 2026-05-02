import { expect, test } from "vitest";
import * as z from "zod/v4";
import * as core from "zod/v4/core";

const { allowsEval } = core.util;

// Regression test for the CSP feature-probe issue (#4461, #5414):
// `allowsEval` used to always invoke `new Function("")` even when the
// user had opted into `z.config({ jitless: true })`, producing a
// `securitypolicyviolation` report on strict-CSP pages (no 'unsafe-eval')
// that Chrome DevTools surfaces as an Issue.
//
// The fix: when `globalConfig.jitless` is true, `allowsEval.value`
// returns `false` without triggering the probe. This test lives in its
// own file because vitest isolates ESM graphs per file, so the cached
// `allowsEval.value` is fresh and is never accessed before the config
// mutation below.

test("globalConfig.jitless=true short-circuits the allowsEval probe", () => {
  // Set BEFORE first access to allowsEval.value — the getter is memoised
  // via `cached()`, so the contract is "configure at app entry".
  z.config({ jitless: true });

  // Sanity: config is wired
  expect(core.globalConfig.jitless).toBe(true);

  // Spy: if the probe were still attempted, `new Function("")` would be
  // called. Swap the global `Function` constructor with a throwing stub
  // and verify the stub is NEVER invoked.
  const origFunction = globalThis.Function;
  let probeAttempted = false;
  // @ts-expect-error assigning a stub to the Function global for the test
  globalThis.Function = function StubFunction(..._args: unknown[]): never {
    probeAttempted = true;
    throw new Error("allowsEval probe should have been skipped under jitless=true");
  };

  try {
    expect(allowsEval.value).toBe(false);
    expect(probeAttempted).toBe(false);
  } finally {
    globalThis.Function = origFunction;
    // Restore config so other test files in the same worker see default
    delete core.globalConfig.jitless;
  }
});
