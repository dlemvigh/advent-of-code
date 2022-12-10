import { readFileSync } from "fs";
import { join } from "path";
import { it } from "vitest";

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

export const LINE_SPLIT_REGEX = "\n";

export function splitAndMapIntoLines<T>(input: string, fn: (line: string) => T, options?: Options): T[] {
  const callOptions: Options = { ...defaultOptions, ...options };
  return input.split(LINE_SPLIT_REGEX).map((x) => fn(callOptions.trim ? x.trim() : x));
}

export const GROUP_SPLIT_REGEX = /\n(\r)?\n/;

export function splitAndMapIntoGroups<T>(input: string, fn: (line: string) => T, options?: Options): T[][] {
  return input
    .split(GROUP_SPLIT_REGEX)
    .filter((x) => x?.trim())
    .map((line) => splitAndMapIntoLines(line, fn, options));
}

export function chunk<T>(array: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    chunks.push(chunk);
  }
  return chunks;
}

export function getPermutations<T>(list: T[]): T[][] {
  if (list.length === 0) return [];
  if (list.length === 1) return [list];
  return list.flatMap((value, index) => {
    const rest = list.filter((_,i) => i !== index);
    return getPermutations(rest).map(perm => [value, ...perm])
  })
}

export function reverseString(input: string): string {
  return input.split("").reverse().join("");
}

export function tests<Input, Expected>(
  test: (input: Input, expected: Expected) => void,
  testCases: [Input, Expected][] = [], 
  focus?: number
) {
  if (focus != null) {
      const [input, expected] = testCases[focus];
      it(`TestCase #${focus + 1}`, ()=>{
          test(input, expected)
      })
      testCases[focus]
  } else {
      testCases.forEach(([input, expected], index) => {
          it(`TestCase #${index + 1}`, () => {
              test(input, expected)
          })
      })
  }
} 
