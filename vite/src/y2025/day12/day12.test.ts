import { describe, it, expect } from "vitest";
import { readInput } from "../../util";
import { part1, part2 } from "./day12";

describe("Day 12", () => {
  describe("part 1", () => {
    it("sample", () => {
      const input = readInput(__dirname, "sample.txt");
      input && expect(part1(input, 2)).toBe(2);
    });
    it("input", () => {
      const input = readInput(__dirname, "input.txt");
      input && expect(part1(input, 1)).toBe(undefined);
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
