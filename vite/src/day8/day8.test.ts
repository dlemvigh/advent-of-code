import { describe, it, expect } from "vitest";
import { readInput } from "../util";
import {
  getScenicScoreDir, 
  DirRight, 
  getScenicScore,
  parseInput,
  TreeMap,
  part1,
  part2,
  getVisibilityFromLeft,
  VisibilityMap,
  getVisibilityFromRight,
  getVisibilityFromTop,
  getVisibilityFromBottom,
  getVisibility,
  compbineVisibility,
} from "./day8";

const T = true;
const F = false;

describe("Day 8", () => {
  it("parse input", () => {
    const sample = readInput(__dirname, "sample.txt");
    const result = parseInput(sample);
    expect(result).toEqual([
      [3, 0, 3, 7, 3],
      [2, 5, 5, 1, 2],
      [6, 5, 3, 3, 2],
      [3, 3, 5, 4, 9],
      [3, 5, 3, 9, 0],
    ] as TreeMap);
  });

  describe("get scenic score right", ()=> {
    type TestCase = [TreeMap, number, number, number] // [map, row, col, expectedScenicScore]
    const testCases: TestCase[] = [
      [[[1, 2, 3]], 0, 0, 1],
      [[[1, 2, 3]], 0, 1, 1],
      [[[1, 2, 3]], 0, 2, 0],
      [[[1, 1, 1]], 0, 0, 1],
      [[[1, 1, 1]], 0, 1, 1],
      [[[1, 1, 1]], 0, 2, 0],
      [[[3, 2, 1]], 0, 0, 2],
      [[[3, 2, 1]], 0, 1, 1],
      [[[3, 2, 1]], 0, 2, 0],
    ]
    testCases.forEach(([treeMap, row, col, expectedScore], index) => {
      it(`Test Case #${index + 1}`, ()=>{
        expect(getScenicScoreDir(treeMap, row, col, DirRight)).toBe(expectedScore)
      })
    })
  })  

  describe("get scenic score", () => {
    it("sample",()=> {
      const sample = readInput(__dirname, "sample.txt");
      const treeMap = parseInput(sample);
      expect(getScenicScore(treeMap, 1, 2)).toBe(4)
      expect(getScenicScore(treeMap, 3, 2)).toBe(8)
    })
  })

  describe("visible from left", () => {
    type TestCase = [TreeMap, VisibilityMap];
    const testCases: TestCase[] = [
      [[[1, 2, 3]], [[T, T, T]]],
      [[[1, 1, 1]], [[T, F, F]]],
      [[[3, 2, 1]], [[T, F, F]]],
      [
        [
          [1, 1, 1, 1, 1],
          [1, 2, 2, 2, 1],
          [1, 2, 3, 2, 1],
          [1, 2, 2, 2, 1],
          [1, 1, 1, 1, 1],
        ],
        [
          [T, F, F, F, F],
          [T, T, F, F, F],
          [T, T, T, F, F],
          [T, T, F, F, F],
          [T, F, F, F, F],
        ],
      ],
      [
        [
          [3, 0, 3, 7, 3],
          [2, 5, 5, 1, 2],
          [6, 5, 3, 3, 2],
          [3, 3, 5, 4, 9],
          [3, 5, 3, 9, 0],
        ],
        [
          [T, F, F, T, F],
          [T, T, F, F, F],
          [T, F, F, F, F],
          [T, F, T, F, T],
          [T, T, F, T, F],
        ],
      ],
    ];
    testCases.forEach(([treeMap, expected], index) => {
      it(`Test Case #${index + 1}`, () => {
        const result = getVisibilityFromLeft(treeMap);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("visible from right", () => {
    type TestCase = [TreeMap, VisibilityMap];
    const testCases: TestCase[] = [
      [[[1, 2, 3]], [[F, F, T]]],
      [[[1, 1, 1]], [[F, F, T]]],
      [[[3, 2, 1]], [[T, T, T]]],
      [
        [
          [1, 1, 1, 1, 1],
          [1, 2, 2, 2, 1],
          [1, 2, 3, 2, 1],
          [1, 2, 2, 2, 1],
          [1, 1, 1, 1, 1],
        ],
        [
          [F, F, F, F, T],
          [F, F, F, T, T],
          [F, F, T, T, T],
          [F, F, F, T, T],
          [F, F, F, F, T],
        ],
      ],
      [
        [
          [3, 0, 3, 7, 3],
          [2, 5, 5, 1, 2],
          [6, 5, 3, 3, 2],
          [3, 3, 5, 4, 9],
          [3, 5, 3, 9, 0],
        ],
        [
          [F, F, F, T, T],
          [F, F, T, F, T],
          [T, T, F, T, T],
          [F, F, F, F, T],
          [F, F, F, T, T],
        ],
      ],
    ];
    testCases.forEach(([treeMap, expected], index) => {
      it(`Test Case #${index + 1}`, () => {
        const result = getVisibilityFromRight(treeMap);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("visible from top", () => {
    type TestCase = [TreeMap, VisibilityMap];
    const testCases: TestCase[] = [
      [
        [[1], [2], [3]],
        [[T], [T], [T]],
      ],
      [
        [[1], [1], [1]],
        [[T], [F], [F]],
      ],
      [
        [[3], [2], [1]],
        [[T], [F], [F]],
      ],
      [
        [
          [1, 1, 1, 1, 1],
          [1, 2, 2, 2, 1],
          [1, 2, 3, 2, 1],
          [1, 2, 2, 2, 1],
          [1, 1, 1, 1, 1],
        ],
        [
          [T, T, T, T, T],
          [F, T, T, T, F],
          [F, F, T, F, F],
          [F, F, F, F, F],
          [F, F, F, F, F],
        ],
      ],
      [
        [
          [3, 0, 3, 7, 3],
          [2, 5, 5, 1, 2],
          [6, 5, 3, 3, 2],
          [3, 3, 5, 4, 9],
          [3, 5, 3, 9, 0],
        ],
        [
          [T, T, T, T, T],
          [F, T, T, F, F],
          [T, F, F, F, F],
          [F, F, F, F, T],
          [F, F, F, T, F],
        ],
      ],
    ];
    testCases.forEach(([treeMap, expected], index) => {
      it(`Test Case #${index + 1}`, () => {
        const result = getVisibilityFromTop(treeMap);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("visible from bottom", () => {
    type TestCase = [TreeMap, VisibilityMap];
    const testCases: TestCase[] = [
      [
        [[1], [2], [3]],
        [[F], [F], [T]],
      ],
      [
        [[1], [1], [1]],
        [[F], [F], [T]],
      ],
      [
        [[3], [2], [1]],
        [[T], [T], [T]],
      ],
      [
        [
          [1, 1, 1, 1, 1],
          [1, 2, 2, 2, 1],
          [1, 2, 3, 2, 1],
          [1, 2, 2, 2, 1],
          [1, 1, 1, 1, 1],
        ],
        [
          [F, F, F, F, F],
          [F, F, F, F, F],
          [F, F, T, F, F],
          [F, T, T, T, F],
          [T, T, T, T, T],
        ],
      ],
      [
        [
          [3, 0, 3, 7, 3],
          [2, 5, 5, 1, 2],
          [6, 5, 3, 3, 2],
          [3, 3, 5, 4, 9],
          [3, 5, 3, 9, 0],
        ],
        [
          [F, F, F, F, F],
          [F, F, F, F, F],
          [T, F, F, F, F],
          [F, F, T, F, T],
          [T, T, T, T, T],
        ],
      ],
    ];
    testCases.forEach(([treeMap, expected], index) => {
      it(`Test Case #${index + 1}`, () => {
        const result = getVisibilityFromBottom(treeMap);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("get visibility", () => {
    type TestCase = [TreeMap, VisibilityMap];
    const testCases: TestCase[] = [
      [
        [
          [1, 1, 1, 1, 1],
          [1, 2, 2, 2, 1],
          [1, 2, 3, 2, 1],
          [1, 2, 2, 2, 1],
          [1, 1, 1, 1, 1],
        ],
        [
          [T, T, T, T, T],
          [T, T, T, T, T],
          [T, T, T, T, T],
          [T, T, T, T, T],
          [T, T, T, T, T],
        ],
      ],
      [
        [
          [3, 3, 3, 3, 3],
          [3, 2, 2, 2, 3],
          [3, 2, 1, 2, 3],
          [3, 2, 2, 2, 3],
          [3, 3, 3, 3, 3],
        ],
        [
          [T, T, T, T, T],
          [T, F, F, F, T],
          [T, F, F, F, T],
          [T, F, F, F, T],
          [T, T, T, T, T],
        ],
      ],
      [
        [
          [1, 1, 1, 1, 1],
          [1, 2, 2, 2, 1],
          [1, 2, 1, 2, 1],
          [1, 2, 2, 2, 1],
          [1, 1, 1, 1, 1],
        ],
        [
          [T, T, T, T, T],
          [T, T, T, T, T],
          [T, T, F, T, T],
          [T, T, T, T, T],
          [T, T, T, T, T],
        ],
      ],
      [
        [
          [3, 3, 3, 3, 3],
          [3, 2, 2, 2, 3],
          [3, 2, 5, 2, 3],
          [3, 2, 2, 2, 3],
          [3, 3, 3, 3, 3],
        ],
        [
          [T, T, T, T, T],
          [T, F, F, F, T],
          [T, F, T, F, T],
          [T, F, F, F, T],
          [T, T, T, T, T],
        ],
      ],
      [
        [
          [3, 0, 3, 7, 3],
          [2, 5, 5, 1, 2],
          [6, 5, 3, 3, 2],
          [3, 3, 5, 4, 9],
          [3, 5, 3, 9, 0],
        ],
        [
          [T, T, T, T, T],
          [T, T, T, F, T],
          [T, T, F, T, T],
          [T, F, T, F, T],
          [T, T, T, T, T],
        ],
      ],
    ];
    testCases.forEach(([treeMap, expected], index) => {
      it(`Test Case #${index + 1}`, () => {
        const result = getVisibility(treeMap);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("combine visibility", () => {
    type TestCase = [VisibilityMap[], VisibilityMap];
    const test_cases: TestCase[] = [
      [[[[F]], [[F]]], [[F]]],
      [[[[F]], [[T]]], [[T]]],
      [[[[T]], [[F]]], [[T]]],
      [[[[T]], [[T]]], [[T]]],
      [
        [
          [
            [F, F, F, F],
            [F, F, F, F],
            [T, T, T, T],
            [T, T, T, T],
          ],
          [
            [F, F, F, F],
            [T, T, T, T],
            [F, F, F, F],
            [T, T, T, T],
          ],
          [
            [F, F, T, T],
            [F, F, T, T],
            [F, F, T, T],
            [F, F, T, T],
          ],
          [
            [F, T, F, T],
            [F, T, F, T],
            [F, T, F, T],
            [F, T, F, T],
          ],
        ],
        [
          [F, T, T, T],
          [T, T, T, T],
          [T, T, T, T],
          [T, T, T, T],
        ],
      ],
    ];

    test_cases.forEach(([input, expected], index) => {
      it(`Test case #${index + 1}`, () => {
        expect(compbineVisibility(...input)).toEqual(expected);
      });
    });
  });


  describe("part 1", () => {
    it("sample", () => {
      const input = readInput(__dirname, "sample.txt");
      expect(part1(input)).toBe(21);
    });
    it("input", () => {
      const input = readInput(__dirname, "input.txt");
      expect(part1(input)).toBe(1690);
    });
  });

  describe("part 2", () => {
    it("sample", () => {
      const input = readInput(__dirname, "sample.txt");
      expect(part2(input)).toBe(8);
    });
    it("input", () => {
      const input = readInput(__dirname, "input.txt");
      expect(part2(input)).toBe(535680);
    });
  });
});
