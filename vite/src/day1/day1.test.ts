import { expect, describe, it } from "vitest";
import { readInput } from "../util";
import { part1, part2 } from "./day1";

describe("day 1", () => {
  describe("part 1", () => {
    it("sample", () => {
      // arrange
      const input = readInput(__dirname, "sample.txt");
      // act
      const result = part1(input);
      // assert
      expect(result).toBe(24000);
    });

    it("input", () => {
      // arrange
      const input = readInput(__dirname, "input.txt");
      // act
      const result = part1(input);
      // assert
      expect(result).toBe(70374);
    });
  });

  describe("part 2", () => {
    it("sample", () => {
      // arrange
      const input = readInput(__dirname, "sample.txt");
      // act
      const result = part2(input);
      // assert
      expect(result).toBe(45000);
    });

    it("input", () => {
      // arrange
      const input = readInput(__dirname, "input.txt");
      // act
      const result = part2(input);
      // assert
      expect(result).toBe(204610);
    });
  });
});
