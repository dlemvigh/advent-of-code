import { splitIntoGroups } from "../../util";
import type { Piece, TestCase } from "./types.ts";

export function parseInput(input: string) {
    const groups = splitIntoGroups(input)
    const pieces = groups.slice(0, groups.length - 1).map(parsePieces);
    const testCases = parseTestCases(groups[groups.length - 1]);
    return { pieces, testCases };
}

function parsePieces(lines: string[]): Piece {
    return lines.slice(1).map(line => line.split("").map(c => c === "#"));
}

function parseTestCases(lines: string[]) {
    return lines.map(parseTestCase)
}

function parseTestCase(line: string): TestCase {
    const [sizeStr, countsStr] = line.split(": ");
    const [width, height] = sizeStr.split("x").map(Number);
    const pieceCounts = countsStr.split(" ").map(Number);
    return { width, height, pieceCounts };
}

