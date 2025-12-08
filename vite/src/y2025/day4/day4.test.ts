import { describe, it, expect } from "vitest";
import { readInput } from "../../util";
import { part1, part2 } from "./day4";

describe("Day 4", () => {
  describe("part 1", () => {
    it("sample", () => {
      const input = readInput(__dirname, "sample.txt");
      input && expect(part1(input)).toBe(13);
    });
    it("input", () => {
      const input = readInput(__dirname, "input.txt");
      input && expect(part1(input)).toBe(1376);
    });
  });
  describe("part 2", () => {
    it("sample", () => {
      const input = readInput(__dirname, "sample.txt");
      input && expect(part2(input)).toBe(43);
    });
    it("input", () => {
      const input = readInput(__dirname, "input.txt");
      input && expect(part2(input)).toBe(8587);
    });
  });
});
