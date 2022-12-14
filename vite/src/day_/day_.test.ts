import { describe, it, expect } from "vitest";
import { readInput } from "../util";
import { part1, part2 } from "./day_";

describe("Day _", () => {
  describe("part 1", () => {
    it("sample", () => {
      const input = readInput(__dirname, "sample.txt");
      input && expect(part1(input)).toBe(undefined);
    });
    it("input", () => {
      const input = readInput(__dirname, "input.txt");
      input && expect(part1(input)).toBe(undefined);
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
