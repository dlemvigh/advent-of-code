import { splitIntoLines } from "../../util"

export function part1(input: string) {
    const rotations = parseInput(input);
    const password = countZeroPositions(50, rotations);
    return password
}

export function part2(input: string)  {
    const rotations = parseInput(input);
    const password = countZeroPositionsAndPasses(50, rotations);
    return password

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

function countZeroPositionsAndPasses(initPosition: number, rotations: number[]): number {
    let position =  initPosition;
    let positionZeroCount = 0;
 
    for (const rotation of rotations) {
        const { position: newPosition, zeroes } = countZeroPositionsAndPassesForSingleRotationV2(position, rotation);
        position = newPosition;
        positionZeroCount += zeroes;
    }
    return positionZeroCount;

}

export function countZeroPositionsAndPassesForSingleRotation(initPosition: number, rotation: number): number {
    const position = initPosition + rotation;
    const zeroes = Math.floor(position / 100)
    if (rotation < 0 && position % 100 === 0) {
        return Math.abs(zeroes) + 1;
    } else {
        return Math.abs(zeroes);
    }
}

export function countZeroPositionsAndPassesForSingleRotationV2(initPosition: number, rotation: number): { position: number, zeroes: number } {
    let position = initPosition + rotation;
    let zeroes = Math.floor(position / 100)

    position = position + (zeroes * -100)

    if (initPosition === 0 && rotation < 0) {
        zeroes += 1;
    }
    if (position === 0 && rotation < 0) {
        zeroes -= 1;
    }

    return { position, zeroes: Math.abs(zeroes) };
}