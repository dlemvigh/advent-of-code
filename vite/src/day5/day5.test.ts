import { describe, it, expect } from "vitest";
import { readInput } from "../util";
import { executeMove, Move, parseInput, part1, part2, Stacks } from "./day5";

describe("Day 5", () => {
  describe("part 1", () => {
    it("parse sample", () => {
      const input = readInput(__dirname, "sample.txt");
      const [stacks, moves] = parseInput(input);
      expect(stacks).toEqual(["ZN", "MCD", "P"]);
      expect(moves).toEqual([
        [1, 2, 1],
        [3, 1, 3],
        [2, 2, 1],
        [1, 1, 2],
      ]);
    });

    describe("execute move", () => {
      type TestCase = [Stacks, Move, Stacks];
      const testCases: TestCase[] = [
        [
          ["A", ""],
          [1, 1, 2],
          ["", "A"],
        ],
        [
          ["", "A"],
          [1, 2, 1],
          ["A", ""],
        ],
        [
          ["ABC", ""],
          [1, 1, 2],
          ["AB", "C"],
        ],
        [
          ["ABC", ""],
          [2, 1, 2],
          ["A", "CB"],
        ],
        [
          ["ABC", ""],
          [3, 1, 2],
          ["", "CBA"],
        ],
        [
          ["ABC", "XYZ"],
          [1, 1, 2],
          ["AB", "XYZC"],
        ],
        [
          ["ABC", "XYZ"],
          [2, 1, 2],
          ["A", "XYZCB"],
        ],
        [
          ["ABC", "XYZ"],
          [3, 1, 2],
          ["", "XYZCBA"],
        ],
        [
          ["ABCDEFG", ""],
          [1, 1, 2],
          ["ABCDEF", "G"],
        ],
      ];
      testCases.forEach(([inputStack, move, expectedStack], index) => {
        it(`Test case #${index + 1}`, () => {
          expect(executeMove(inputStack, move)).toEqual(expectedStack);
        });
      });
    });

    it("sample", () => {
      const input = readInput(__dirname, "sample.txt");
      expect(part1(input)).toBe("CMZ");
    });
    it("input", () => {
      const input = readInput(__dirname, "input.txt");
      expect(part1(input)).toBe("CFFHVVHNC");
    });
  });
  describe("part 2", () => {
    it("sample", () => {
      const input = readInput(__dirname, "sample.txt");
      expect(part2(input)).toBe("MCD");
    });
    it("input", () => {
      const input = readInput(__dirname, "input.txt");
      expect(part2(input)).toBe("FSZWBPTBG");
    });
  });
});
