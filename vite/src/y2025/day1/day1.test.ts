import { describe, it, expect } from "vitest";
import { readInput } from "../../util";
import { part1, part2 } from "./day1";

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
      input && expect(part2(input)).toBe(undefined);
    });
    it("input", () => {
      const input = readInput(__dirname, "input.txt");
      input && expect(part2(input)).toBe(undefined);
    });
  });
});
