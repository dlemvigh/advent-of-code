import { readFileSync } from "fs";
import { join } from "path";

export function readInput(folder: string, filename = "input.txt"): string {
  return readFileSync(join(folder, filename)).toString();
}

export function splitIntoLines(input: string): string[] {
  return splitAndMapIntoLines(input, (x) => x);
}

export function splitIntoGroups(input: string): string[][] {
  return splitAndMapIntoGroups(input, (x) => x);
}

export function splitAndMapIntoLines<T>(
  input: string,
  fn: (line: string) => T
): T[] {
  return input.split("\n").map((x) => fn(x.trim()));
}

export function splitAndMapIntoGroups<T>(
  input: string,
  fn: (line: string) => T
): T[][] {
  return input
    .split(/\n(\r)?\n/)
    .filter((x) => x)
    .map((line) => splitAndMapIntoLines(line, fn));
}
