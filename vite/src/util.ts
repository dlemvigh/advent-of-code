import { readFileSync } from "fs";
import { join } from "path";

type Options = { trim: boolean };
const defaultOptions: Options = { trim: true };

export function readInput(folder: string, filename: string): string {
  return readFileSync(join(folder, filename)).toString();
}

export function splitIntoLines(input: string, options?: Options): string[] {
  return splitAndMapIntoLines(input, (x) => x, options);
}

export function splitIntoGroups(input: string, options?: Options): string[][] {
  return splitAndMapIntoGroups(input, (x) => x, options);
}

export function splitIntoGrid(input: string, options?: Options): string[][] {
  return splitAndMapIntoGrid(input, (x) => x, options);
}

export const LINE_SPLIT_REGEX = "\n";

export function splitAndMapIntoLines<T>(input: string, fn: (line: string, row: number) => T, options?: Options): T[] {
  const callOptions: Options = { ...defaultOptions, ...options };
  return input.split(LINE_SPLIT_REGEX).map((x, row) => fn(callOptions.trim ? x.trim() : x, row));
}

export const GROUP_SPLIT_REGEX = /\n(\r)?\n/;

export function splitAndMapIntoGroups<T>(input: string, fn: (line: string) => T, options?: Options): T[][] {
  return input
    .split(GROUP_SPLIT_REGEX)
    .filter((x) => x?.trim())
    .map((line) => splitAndMapIntoLines(line, fn, options));
}

export function splitAndMapIntoGrid<T>(input: string, fn: (item: string, row: number, col: number) => T, options?: Options): T[][] {
  return splitAndMapIntoLines(input, (line, row) => line.split("").map((item, col) => fn(item, row, col)), options)
}

export function chunk<T>(array: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    chunks.push(chunk);
  }
  return chunks;
}

export function reverseString(input: string): string {
  return input.split("").reverse().join("");
}
