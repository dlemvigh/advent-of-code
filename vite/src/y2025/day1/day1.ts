import { splitIntoLines } from "../../util"

export function part1(input: string) {
    const rotations = parseInput(input);
    const password = countZeroPositions(50, rotations);
    return password
}

export function part2(input: string)  {

}

function parseInput(input: string): number[] { 
    const lines = splitIntoLines(input);
    const numbers = lines.map(parseLine);
    return numbers;
}

function parseLine(line: string): number {
    const sign = line[0] === "R" ? 1 : -1;
    return sign * parseInt(line.slice(1)) ;
}

function countZeroPositions(initPosition: number, rotations: number[]): number {
    let position =  initPosition;
    let positionZeroCount = 0;
 
    for (const rotation of rotations) {
        position = (position + rotation) % 100
        if (position === 0) {
            positionZeroCount++;
        }
    }
    return positionZeroCount;
}
    