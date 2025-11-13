import { describe, expect, it } from "vitest";
import { readInput } from "../../util";
import { 
  getIntersect, 
  getIntersectOfGroup, 
  splitInHalfs, 
  getCharCodeOfIntersect, 
  part1, 
  part2, 
  toCharCode 
} from "./day3";

describe("day 3", () => {
  describe("to char code", () => {
    type TestCase = [string, number];
    const test_cases: TestCase[] = [
      ["a", 1],
      ["b", 2],
      ["c", 3],
      ["z", 26],
      ["A", 27],
      ["B", 28],
      ["C", 29],
      ["Z", 52],
    ];

    test_cases.forEach(([input, expected]) => {
      it(`char code of '${input}' = ${expected}`, () => {
        expect(toCharCode(input)).toBe(expected);
      });
    });
  });

  describe("get intersection", () => {
    type TestCase = [string, string, string | undefined];
    const test_cases: TestCase[] = [
      ["a", "a", "a"],
      ["b", "b", "b"],
      ["abcde", "c", "c"],
      ["d", "abcde", "d"],
      ["abcde", "efghi", "e"],
      ["abc", "def", ""],
      ["abc", "", ""],
      ["", "abc", ""],
      ["aa", "aa", "a"],
      ["bbb", "bbb", "b"],
      ["aab", "aac", "a"],
    ];
    test_cases.forEach(([a, b, expected]) => {
      it(`intersection between '${a}' and '${b}'`, () => {
        expect(getIntersect(a, b)).toBe(expected);
      });
    });
  });

  describe("split in half", () => {
    type TestCase = [string, [string, string]];
    const test_cases: TestCase[] = [
      ["", ["", ""]],
      ["ab", ["a", "b"]],
      ["abcd", ["ab", "cd"]],
      ["abcdef", ["abc", "def"]],
    ];
    test_cases.forEach(([input, expected]) => {
      it(`split ${input}`, () => {
        expect(splitInHalfs(input)).toEqual(expected);
      });
    });
  });

  describe("get char code of intersect", () => {
    type TestCase = [string, number];
    const test_cases: TestCase[] = [
      ["aa", 1],
      ["bb", 2],
      ["zz", 26],
      ["AA", 27],
      ["BB", 28],
      ["ZZ", 52],
      ["abbc", 2],
      ["abccde", 3],
    ];
    test_cases.forEach(([input, expected]) => {
      it(input, () => {
        expect(getCharCodeOfIntersect(input)).toBe(expected);
      });
    });
  });

  describe("get intersect of group", () => {
    it("sample 1", () => {
      expect(
        getIntersectOfGroup("vJrwpWtwJgWrhcsFMMfFFhFp", "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL", "PmmdzqPrVvPwwTWBwg")
      ).toBe("r");
    });
    it("sample 2", () => {
      expect(
        getIntersectOfGroup("wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn", "ttgJtRGJQctTZtZT", "CrZsJsPPZsGzwwsLwLmpwMDw")
      ).toBe("Z");
    });
  });

  const sample = `vJrwpWtwJgWrhcsFMMfFFhFp
    jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
    PmmdzqPrVvPwwTWBwg
    wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
    ttgJtRGJQctTZtZT
    CrZsJsPPZsGzwwsLwLmpwMDw`;

  describe("part 1", () => {
    it("sample", () => {
      const result = part1(sample);
      expect(result).toBe(157);
    });

    it.skip("input", () => {
      const input = readInput(__dirname, "input.txt");
      const result = part1(input);
      expect(result).toBe(7848);
    });
  });

  describe("part 2", () => {
    it("sample", () => {
      const result = part2(sample);
      expect(result).toBe(70);
    });

    it.skip("input", () => {
      const input = readInput(__dirname, "input.txt");
      const result = part2(input);
      expect(result).toBe(2616);
    });
  });
});
