import { readFileSync } from "fs";
import { join } from "path";

export function readInput(folder: string, filename: string): string {
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
    .filter((x) => x?.trim())
    .map((line) => splitAndMapIntoLines(line, fn));
}

export function chunk<T>(array: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      chunks.push(chunk);
  }  
  return chunks;
}