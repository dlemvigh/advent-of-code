import { describe, it, expect } from "vitest";
import { sum } from "./math";

describe("sum", () => {
  type TestCase = [number[], number]; // [input, expected]
  const test_cases: TestCase[] = [
    [[], 0],
    [[0], 0],
    [[1], 1],
    [[2], 2],
    [[-1], -1],
    [[0.5], 0.5],
    [[1, 2, 3], 6],
    [[1, -1], 0],
    [[1, -2, 3, -4, 5, -6], -3],
    [[0.1, 0.2, 0.3], 0.6],
  ];

  test_cases.forEach(([input, expected]) => {
    it(`[${input.join(", ")}] = ${expected}`, () => {
      expect(sum(input)).toBeCloseTo(expected, 10);
    });
  });
});
