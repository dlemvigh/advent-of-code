import { describe, it, expect } from "vitest";
import { readInput } from "../util";
import { part1, part2 } from "./day_";

describe("Day 7", () => {
  describe("part 1", () => {
    describe("part 1", () => {
      it("sample", () => {
        const input = readInput(__dirname, "sample.txt");
        expect(part1(input)).toBe(undefined);
      });
      it("input", () => {
        const input = readInput(__dirname, "input.txt");
        expect(part1(input)).toBe(undefined);
      });
    });
    describe("part 2", () => {
      it("sample", () => {
        const input = readInput(__dirname, "sample.txt");
        expect(part2(input)).toBe(undefined);
      });
      it("input", () => {
        const input = readInput(__dirname, "input.txt");
        expect(part2(input)).toBe(undefined);
      });
    });
  });
});
