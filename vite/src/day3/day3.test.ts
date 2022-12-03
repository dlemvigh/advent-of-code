import { describe, expect, it } from "vitest";
import { sum } from "../math";
import { chunk, readInput, splitAndMapIntoLines, splitIntoLines } from "../util";

function toCharCode(input: string): number {
  if (/^[a-z]$/.test(input)) {
    return input.charCodeAt(0) - "a".charCodeAt(0) + 1;
  }
  if (/^[A-Z]$/.test(input)) {
    return input.charCodeAt(0) - "A".charCodeAt(0) + 27;
  }
  throw new Error(`unknown character: '${input}`);
}

function getIntersect(a: string, b: string): string {
  const setA = new Set(a);
  const setB = new Set(b);
  let intersects = new Set();
  for (const c of setA) {
    if (setB.has(c)) {
      intersects.add(c);
    }
  }
  return Array.from(intersects).join("");
}

function splitInHalfs(input: string): [string, string] {
  const half = Math.floor(input.length / 2);
  return [input.slice(0, half), input.slice(half)];
}

function getCharCodeOfIntersect(input: string): number {
  const [a, b] = splitInHalfs(input);
  const c = getIntersect(a, b);
  if (c == null) throw new Error("unable to find intersect");
  return toCharCode(c);
}

function getIntersectOfGroup(a: string, b: string, c: string): string {
  const ab = getIntersect(a, b);
  const abc = getIntersect(ab, c);
  return abc;
}

function part1(input: string): number {
  const charCodes = splitAndMapIntoLines(input, getCharCodeOfIntersect);
  return sum(charCodes);
}

function part2(input: string): number {
  const lines = splitIntoLines(input);
  const groups = chunk(lines, 3);
  const charCodes = groups.map(([a, b, c]) => {
    const char = getIntersectOfGroup(a, b, c);
    const charCode = toCharCode(char);
    return charCode;
  });
  return sum(charCodes);
}

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

    it("input", () => {
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

    it("input", () => {
      const input = readInput(__dirname, "input.txt");
      const result = part2(input);
      expect(result).toBe(2616);
    });
  });
});
