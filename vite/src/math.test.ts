import { describe, it, expect } from "vitest";
import { sum, sumBy, average, averageBy } from "./math";

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

describe("sum by", () => {
  it("sum by numbers", ()=>{
    expect(sumBy([], x => x)).toBe(0);
    expect(sumBy([1], x => x)).toBe(1);
    expect(sumBy([1,2,3], x => x)).toBe(6);
  })

  it("sum by object", ()=>{
    type TestObject = { a: number, b: number };
    const list: TestObject[] = [
      { a: 1, b: 2 },
      { a: 1, b: 2 },
      { a: 1, b: 2 },
    ]

    expect(sumBy(list, x => x.a)).toBe(3);
    expect(sumBy(list, x => x.b)).toBe(6);
    expect(sumBy(list, () => 3)).toBe(9);
  })
})

describe("average", ()=>{
  type TestCase = [number[], number];
  const test_cases: TestCase[] = [
    [[0], 0],
    [[1], 1],
    [[2], 2],
    [[-1], -1],
    [[0.5], 0.5],
    [[1, 2, 3], 2],
    [[1, -1], 0],
    [[1, -2, 3, -4, 5, -6], -.5],
    [[0.1, 0.2, 0.3], 0.2],
  ];

  test_cases.forEach(([input, expected]) => {
    it(`[${input.join(", ")}] = ${expected}`, () => {
      expect(average(input)).toBeCloseTo(expected, 10);
    });
  });
})

describe("average by", () => {
  it("average by numbers", ()=>{
    expect(averageBy([1], x => x)).toBe(1);
    expect(averageBy([1,2,3], x => x)).toBe(2);
  })

  it("average by object", ()=>{
    type TestObject = { a: number, b: number };
    const list: TestObject[] = [
      { a: 1, b: 2 },
      { a: 1, b: 2 },
      { a: 1, b: 2 },
    ]

    expect(averageBy(list, x => x.a)).toBe(1);
    expect(averageBy(list, x => x.b)).toBe(2);
    expect(averageBy(list, () => 3)).toBe(3);
  })
})
