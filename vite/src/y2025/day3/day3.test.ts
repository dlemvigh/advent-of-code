import { describe, it, expect } from "vitest";
import { readInput } from "../../util";
import { getBiggest2DigitNumberInString, part1, part2 } from "./day3";

describe("Day 3", () => {
  describe("part 1", () => {
    it("sample", () => {
      const input = readInput(__dirname, "sample.txt");
      input && expect(part1(input)).toBe(357);
    });
    it("input", () => {
      const input = readInput(__dirname, "input.txt");
      input && expect(part1(input)).toBe(17311);
      // 17310 too low
    });
  });
  describe("part 2", () => {
    it("sample", () => {
      const input = readInput(__dirname, "sample.txt");
      input && expect(part2(input)).toBe(3121910778619);
    });
    it("input", () => {
      const input = readInput(__dirname, "input.txt");
      input && expect(part2(input)).toBe(171419245422055);
    });
  });
});
 
describe("get biggest 2 digit number in string", () => {
  it.each([
    ["987654321111111", 98],
    ["811111111111119", 89],
    ["234234234234278", 78],
    ["818181911112111", 92]
  ])("In %s, biggest 2 digit number is %d", (input, expected) => {
    expect(getBiggest2DigitNumberInString(input)).toBe(expected);
  })
})