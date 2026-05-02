import { describe, expect, it } from "vitest";
import * as z from "../index.js";

describe("z.describe() check", () => {
  it("registers description in globalRegistry", () => {
    const schema = z.string().check(z.describe("A string"));
    expect(z.globalRegistry.get(schema)?.description).toBe("A string");
  });
});

describe("z.meta() check", () => {
  it("registers metadata in globalRegistry", () => {
    const schema = z.number().check(z.meta({ title: "Age", description: "User's age" }));
    const meta = z.globalRegistry.get(schema);
    expect(meta?.title).toBe("Age");
    expect(meta?.description).toBe("User's age");
  });
});

describe("combined usage", () => {
  it("works with multiple checks", () => {
    const schema = z.string().check(z.describe("Email address"), z.meta({ title: "Email" }));
    const meta = z.globalRegistry.get(schema);
    expect(meta?.description).toBe("Email address");
    expect(meta?.title).toBe("Email");
  });
});
