import { describe, it, expect } from "vitest";
import { readInput } from "../../util";
import { part1, part2 } from "./day10";

describe("Day 10", () => {
  describe("part 1", () => {
    it("sample", () => {
      const input = readInput(__dirname, "sample.txt");
      input && expect(part1(input)).toBe(7);
    });
    it("input", () => {
      const input = readInput(__dirname, "input.txt");
      input && expect(part1(input)).toBe(532);
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
