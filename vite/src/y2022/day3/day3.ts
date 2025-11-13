import { sum } from "../../math";
import { chunk, splitAndMapIntoLines, splitIntoLines } from "../../util";

export function toCharCode(input: string): number {
  if (/^[a-z]$/.test(input)) {
    return input.charCodeAt(0) - "a".charCodeAt(0) + 1;
  }
  if (/^[A-Z]$/.test(input)) {
    return input.charCodeAt(0) - "A".charCodeAt(0) + 27;
  }
  throw new Error(`unknown character: '${input}`);
}

export function getIntersect(a: string, b: string): string {
  const setA = new Set(a);
  const setB = new Set(b);
  let intersects = new Set();
  for (const c of setA) {
    if (setB.has(c)) {
      intersects.add(c);
    }
  }
  return Array.from(intersects).join("");
}

export function splitInHalfs(input: string): [string, string] {
  const half = Math.floor(input.length / 2);
  return [input.slice(0, half), input.slice(half)];
}

export function getCharCodeOfIntersect(input: string): number {
  const [a, b] = splitInHalfs(input);
  const c = getIntersect(a, b);
  if (c == null) throw new Error("unable to find intersect");
  return toCharCode(c);
}

export function getIntersectOfGroup(a: string, b: string, c: string): string {
  const ab = getIntersect(a, b);
  const abc = getIntersect(ab, c);
  return abc;
}

export function part1(input: string): number {
  const charCodes = splitAndMapIntoLines(input, getCharCodeOfIntersect);
  return sum(charCodes);
}

export function part2(input: string): number {
  const lines = splitIntoLines(input);
  const groups = chunk(lines, 3);
  const charCodes = groups.map(([a, b, c]) => {
    const char = getIntersectOfGroup(a, b, c);
    const charCode = toCharCode(char);
    return charCode;
  });
  return sum(charCodes);
}
