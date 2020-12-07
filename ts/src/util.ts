import * as fs from "fs";
import * as path from "path";

export function readInput(folder: string, filename = "input.txt"): string {
  return fs.readFileSync(path.join(folder, filename)).toString();
}

export function splitIntoLines(input: string): string[] {
  return input.split("\n").map((x) => x.trim());
}

export function splitIntoGroups(input: string): string[][] {
  return input
    .split(/\n(\r)?\n/)
    .filter((x) => x)
    .map(splitIntoLines);
}
