import { describe, it, expect } from "vitest";
import { readInput } from "../../util";
import { countZeroPositionsAndPassesForSingleRotation, countZeroPositionsAndPassesForSingleRotationV2, part1, part2 } from "./day1";

describe("Day 1", () => {
  describe("part 1", () => {
    it("sample", () => {
      const input = readInput(__dirname, "sample.txt");
      input && expect(part1(input)).toBe(3);
    });
    it("input", () => {
      const input = readInput(__dirname, "input.txt");
      input && expect(part1(input)).toBe(1097);
    });
  });
  describe("part 2", () => {
    it("sample", () => {
      const input = readInput(__dirname, "sample.txt");
      input && expect(part2(input)).toBe(6);
    });
    it("input", () => {
      const input = readInput(__dirname, "input.txt");
      input && expect(part2(input)).toBe(7101);
    });
  });

  describe("countZeroPositionsAndPassesForSingleRotation", () => {
    it.each([
      [50, 0, 0],
      [50, 1, 0],
      [50, -1, 0],
      [50, 50, 1],
      [50, -50, 1],
      [50, 100, 1],
      [50, -100, 1],
      [50, 150, 2],
      [50, -150, 2],
    ])("from %i by %i results in %i", (initPosition, rotation, expected) => {
      expect(countZeroPositionsAndPassesForSingleRotation(initPosition, rotation)).toBe(expected);
    })

    describe("part 2 example", () => {
      it.each([
        [50, -68, 1],
        [82, -30, 0],
      ])("from %i by %i results in %i", (initPosition, rotation, expected) => {
        expect(countZeroPositionsAndPassesForSingleRotation(initPosition, rotation)).toBe(expected);
      })
    })
  })

  describe("countZeroPositionsAndPassesForSingleRotationV2", () => {
    it.each([
      [50, 0, 50, 0],
      [50, 1, 51, 0],
      [50, -1, 49, 0],
      [50, 50, 0, 1],
      [50, -50, 0, 1],
      [50, 100, 50, 1],
      [50, -100, 50, 1],
      [50, 150, 0, 2],
      [50, -150, 0, 2],

    ])("from %i by %i results in %i and %i", (initPosition, rotation, expectedPosition, expectedZeroes) => {
      expect(countZeroPositionsAndPassesForSingleRotationV2(initPosition, rotation)).toEqual({ position: expectedPosition, zeroes: expectedZeroes });
    })
  })

});
