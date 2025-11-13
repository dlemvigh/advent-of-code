import { splitAndMapIntoLines } from "../../util";

export type CleanRange = [number, number];
export type CleanRangePair = [CleanRange, CleanRange];

export function parseLine(line: string): CleanRangePair {
    const match = line.match(/^(\d+)-(\d+),(\d+)-(\d+)$/);
    if (match == null) throw new Error(`Unable to parse line: ${line}`)
    const [aFrom, aTo, bFrom, bTo] = match.slice(1).map(Number);
    return [[aFrom, aTo], [bFrom, bTo]];
}

export function isFullyContained(pair: CleanRangePair): boolean {
    const [[aFrom, aTo],[bFrom, bTo]] = pair;
    if (aFrom <= bFrom && bTo <= aTo) {
        return true;
    }
    if (bFrom <= aFrom && aTo <= bTo) {
        return true
    }
    return false;
}

export function hasOverlap(pair: CleanRangePair): boolean {
    const [[aFrom, aTo],[bFrom, bTo]] = pair;
    return aFrom <= bTo && bFrom <= aTo;
}

export function part1(input: string): number {
    const pairs = splitAndMapIntoLines(input, parseLine)
    return pairs.filter(isFullyContained).length;
}

export function part2(input: string): number {
    const pairs = splitAndMapIntoLines(input, parseLine)
    return pairs.filter(hasOverlap).length;
}