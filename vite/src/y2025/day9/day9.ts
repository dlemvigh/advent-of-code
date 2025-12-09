import { splitAndMapIntoLines } from "../../util";

export function part1(input: string) {
    const data = parseInput(input);
    let maxArea = 0;
    for (let a = 0; a < data.length; a++) {
        for (let b = a + 1; b < data.length; b++) {
            const [x1, y1] = data[a];
            const [x2, y2] = data[b];
            const dx = Math.abs(x1 - x2) + 1;
            const dy = Math.abs(y1 - y2) + 1;
            const area = dx * dy;
            if (area > maxArea) {
                maxArea = area;
            }
        }
    }
    return maxArea
}

export function part2(input: string) {

}

function parseInput(input: string) {
    return splitAndMapIntoLines(input, parseLine);
}

function parseLine(line: string) {
    return line.split(",").map(Number) as [number, number];
}