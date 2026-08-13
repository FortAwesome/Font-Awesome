import { describe, expect, it } from "vitest";
import * as z from "zod/v4";

describe("Recursive Tuples Regression #5089", () => {
  it("creates recursive tuple without crash", () => {
    expect(() => {
      const y = z.lazy((): any => z.tuple([y, y]).or(z.string()));
    }).not.toThrow();
  });

  it("parses recursive tuple data correctly", () => {
    const y = z.lazy((): any => z.tuple([y, y]).or(z.string()));

    // Base case
    expect(y.parse("hello")).toBe("hello");

    // Recursive cases
    expect(() => y.parse(["a", "b"])).not.toThrow();
    expect(() => y.parse(["a", ["b", "c"]])).not.toThrow();
  });

  it("matches #5089 expected behavior", () => {
    // Exact code from the issue
    expect(() => {
      const y = z.lazy((): any => z.tuple([y, y]).or(z.string()));
      y.parse(["a", ["b", "c"]]);
    }).not.toThrow();
  });

  it("handles workaround pattern", () => {
    // Alternative pattern from issue discussion
    expect(() => {
      const y = z.lazy((): any => z.string().or(z.lazy(() => z.tuple([y, y]))));
      y.parse(["a", ["b", "c"]]);
    }).not.toThrow();
  });

  it("recursive arrays still work (comparison)", () => {
    const y = z.lazy((): any => z.array(y).or(z.string()));

    expect(y.parse("hello")).toBe("hello");
    expect(y.parse(["hello", "world"])).toEqual(["hello", "world"]);
    expect(y.parse(["a", ["b", "c"]])).toEqual(["a", ["b", "c"]]);
  });
});
