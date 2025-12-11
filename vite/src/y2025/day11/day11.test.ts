import { describe, it, expect } from "vitest";
import { readInput } from "../../util";
import { part1, part2 } from "./day11";

describe("Day 11", () => {
  describe("part 1", () => {
    it("sample", () => {
      const input = readInput(__dirname, "sample.txt");
      input && expect(part1(input)).toBe(5);
    });
    it("input", () => {
      const input = readInput(__dirname, "input.txt");
      input && expect(part1(input)).toBe(534);
    });
  });
  describe("part 2", () => {
    it("sample", () => {
      const input = readInput(__dirname, "sample2.txt");
      input && expect(part2(input)).toBe(2);
    });
    it("input", () => {
      const input = readInput(__dirname, "input.txt");
      input && expect(part2(input)).toBe(499645520864100);
    });
  });
});
