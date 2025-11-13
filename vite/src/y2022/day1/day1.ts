import { splitAndMapIntoGroups } from "../../util";
import { sum } from "../../math";

export function getCaloriesByGroup(input: string): number[] {
  const groups = splitAndMapIntoGroups(input, Number);
  const sums = groups.map(sum);
  return sums;
}

export function part1(input: string): number {
  const sums = getCaloriesByGroup(input);
  const max = Math.max(...sums);
  return max;
}

export function part2(input: string): number {
  const sums = getCaloriesByGroup(input);
  sums.sort((a, b) => b - a);
  const top3 = sums.slice(0, 3);
  return sum(top3);
}
