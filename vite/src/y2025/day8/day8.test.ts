import { describe, it, expect } from "vitest";
import { readInput } from "../../util";
import { part1, part2 } from "./day8";

describe("Day 8", () => {
  describe("part 1", () => {
    it("sample", () => {
      const input = readInput(__dirname, "sample.txt");
      input && expect(part1(input, 10)).toBe(40);
    });
    it("input", () => {
      const input = readInput(__dirname, "input.txt");
      input && expect(part1(input, 1000)).toBe(42315);
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
