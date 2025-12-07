import { B } from "vitest/dist/chunks/benchmark.geERunq4";
import { splitIntoLines } from "../../util";

export function part1(input: string) {
    const { numbers, operators } = parseInput(input);
    console.log("Numbers:", numbers);
    console.log("Operators:", operators);

    let sum = 0n
    for (let i = 0; i < operators.length; i++) {
        const operator = operators[i];
        const value = doMath(getColumnIterator(numbers, i), operator);
        sum += value;
    }
    return sum;
}

export function part2(input: string) {

}

type Operator = "+" | "*";
type NumberTable = number[][]
const whiteSpaceRegex = /\s+/;

function parseInput(input: string): { numbers: NumberTable, operators: Operator[] } {
    const lines = splitIntoLines(input);

    const numbers = parseInputNumberTable(lines.slice(0, lines.length - 2));
    const operators = parseInputOperators(lines.slice(lines.length - 2)[0]);    

    return { numbers, operators };
}

function parseInputNumberTable(lines: string[]): NumberTable {  
    const numbers: NumberTable =  lines.map(line =>
        line.trim().split(whiteSpaceRegex).map(numStr => Number(numStr))
    );
    return numbers;
}

function parseInputOperators(line: string): Operator[] {
    const operators: Operator[] = line.trim().split(whiteSpaceRegex) as Operator[]
    return operators;
}

function* getColumnIterator<T>(table: T[][], colIndex: number): Generator<T> {
    for (let rowIndex = 0; rowIndex < table.length; rowIndex++) {
        yield table[rowIndex][colIndex];
    }
}

function doMath(numbers: Generator<number>, operator: Operator): BigInt {
    switch (operator) {
        case "*":
            return numbers.reduce((acc, curr) => acc * BigInt(curr), 1n);
        case "+":
            return numbers.reduce((acc, curr) => acc + BigInt(curr), 0n);
        default:
            throw new Error(`Unknown operator: ${operator}`);
    }
}