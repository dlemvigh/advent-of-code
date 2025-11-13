import { describe, it, expect } from "vitest";
import { readInput } from "../../util";
import { part1, part2 } from "./day3";

describe("Day 3", () => {
  describe("part 1", () => {
    it("sample", () => {
      const input = "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))"
      input && expect(part1(input)).toBe(161);
    });
    it("input", () => {
      const input = readInput(__dirname, "input.txt");
      input && expect(part1(input)).toBe(168539636);
    });
  });
  describe("part 2", () => {
    it("sample", () => {
      const input = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"
      input && expect(part2(input)).toBe(48);
    });
    it("input", () => {
      const input = readInput(__dirname, "input.txt");
      // 110226078 - too high
      input && expect(part2(input)).toBe(110226078);
    });
  });
});
