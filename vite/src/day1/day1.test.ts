import { expect, describe, it } from "vitest";
import { readInput, splitAndMapIntoGroups } from "../util";
import { sum } from "../math";

function getCaloriesByGroup(input: string): number[] {
  const groups = splitAndMapIntoGroups(input, Number);
  const sums = groups.map(sum);
  return sums;
}

function part1(input: string): number {
  const sums = getCaloriesByGroup(input);
  const max = Math.max(...sums);
  return max;
}

function part2(input: string): number {
  const sums = getCaloriesByGroup(input);
  sums.sort((a, b) => b - a);
  const top3 = sums.slice(0, 3);
  return sum(top3);
}

describe("part 1", () => {
  it("sample", () => {
    // arrange
    const input = readInput(__dirname, "sample.txt");
    // act
    const result = part1(input);
    // assert
    expect(result).toBe(24000);
  });

  it("input", () => {
    // arrange
    const input = readInput(__dirname, "input.txt");
    // act
    const result = part1(input);
    // assert
    expect(result).toBe(70374);
  });
});

describe("part 2", () => {
  it("sample", () => {
    // arrange
    const input = readInput(__dirname, "sample.txt");
    // act
    const result = part2(input);
    // assert
    expect(result).toBe(45000);
  });

  it("input", () => {
    // arrange
    const input = readInput(__dirname, "input.txt");
    // act
    const result = part2(input);
    // assert
    expect(result).toBe(204610);
  });
});
