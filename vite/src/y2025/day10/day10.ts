import { splitIntoLines } from "../../util";
import { solveLine as solveLine1 } from "./day10part1";
import { solveLine as solveLine2 } from "./day10part2";

export function part1(input: string) {
    const lines = splitIntoLines(input)
    const results = lines.map(solveLine1)
    const sum = results.reduce((a, b) => a + b, 0);
    return sum
}

export function part2(input: string) {
    const lines = splitIntoLines(input)
    const results = lines.map(solveLine2)
    const sum = results.reduce((a, b) => a + b, 0);
    return sum
}
