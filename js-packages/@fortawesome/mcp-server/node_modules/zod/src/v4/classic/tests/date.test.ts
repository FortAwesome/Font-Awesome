import { expect, test } from "vitest";

import * as z from "zod/v4";

const beforeBenchmarkDate = new Date(Date.UTC(2022, 10, 4));
const benchmarkDate = new Date(Date.UTC(2022, 10, 5));
const afterBenchmarkDate = new Date(Date.UTC(2022, 10, 6));

const minCheck = z.date().min(benchmarkDate);
const maxCheck = z.date().max(benchmarkDate);

test("passing validations", () => {
  minCheck.parse(benchmarkDate);
  minCheck.parse(afterBenchmarkDate);

  maxCheck.parse(benchmarkDate);
  maxCheck.parse(beforeBenchmarkDate);
});

test("date min", () => {
  const result = minCheck.safeParse(beforeBenchmarkDate);

  expect(result.success).toEqual(false);
  expect(result.error!.issues).toMatchInlineSnapshot(`
    [
      {
        "code": "too_small",
        "inclusive": true,
        "message": "Too small: expected date to be >=1667606400000",
        "minimum": 1667606400000,
        "origin": "date",
        "path": [],
      },
    ]
  `);
});

test("date max", () => {
  const result = maxCheck.safeParse(afterBenchmarkDate);

  expect(result.success).toEqual(false);
  expect(result.error!.issues).toMatchInlineSnapshot(`
    [
      {
        "code": "too_big",
        "inclusive": true,
        "maximum": 1667606400000,
        "message": "Too big: expected date to be <=1667606400000",
        "origin": "date",
        "path": [],
      },
    ]
  `);
});

test("min max getters", () => {
  expect(minCheck.minDate).toEqual(benchmarkDate);
  expect(minCheck.min(afterBenchmarkDate).minDate).toEqual(afterBenchmarkDate);

  expect(maxCheck.maxDate).toEqual(benchmarkDate);
  expect(maxCheck.max(beforeBenchmarkDate).maxDate).toEqual(beforeBenchmarkDate);
});
