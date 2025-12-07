import { splitIntoLines } from "../../util";

export function part1(input: string) {
    const { numbers, operators } = parseInput(input);

    let sum = 0n;
    for (let i = 0; i < operators.length; i++) {
        const columnNumbers = getColumnIterator(numbers, i);
        const value = doMath(columnNumbers, operators[i]);
        sum += value;
    }
    return sum;
}

type Operator = "+" | "*";
type NumberTable = number[][];
const WHITESPACE_REGEX = /\s+/;

function parseInput(input: string): { numbers: NumberTable; operators: Operator[] } {
    const lines = splitIntoLines(input);
    const lastLineIndex = lines.length - 1;

    const numbers = parseInputNumberTable(lines.slice(0, lastLineIndex));
    const operators = parseInputOperators(lines[lastLineIndex]);

    return { numbers, operators };
}

function parseInputNumberTable(lines: string[]): NumberTable {
    return lines.map(line =>
        line.trim().split(WHITESPACE_REGEX).map(Number)
    );
}

function parseInputOperators(line: string): Operator[] {
    return line.trim().split(WHITESPACE_REGEX) as Operator[];
}

function* getColumnIterator<T>(table: T[][], colIndex: number): Generator<T> {
    for (let rowIndex = 0; rowIndex < table.length; rowIndex++) {
        yield table[rowIndex][colIndex];
    }
}

function doMath(numbers: Iterable<number>, operator: Operator): bigint {
    switch (operator) {
        case "*": {
            let result = 1n;
            for (const num of numbers) {
                result *= BigInt(num);
            }
            return result;
        }
        case "+": {
            let result = 0n;
            for (const num of numbers) {
                result += BigInt(num);
            }
            return result;
        }
        default:
            throw new Error(`Unknown operator: ${operator}`);
    }
}

export function part2(input: string) {
    const { numbers, operators } = parseInput2(input);

    let sum = 0n;
    for (let i = 0; i < operators.length; i++) {
        const value = doMath(numbers[i], operators[i]);
        sum += value;
    }
    return sum;
}

function parseInput2(input: string) {
    const lines = splitIntoLines(input, { trim: false });
    const lastLineIndex = lines.length - 1;
    
    const numbers = parseInputNumberTable2(lines);
    const operators = parseInputOperators(lines[lastLineIndex]);
    
    return { numbers, operators };
}

function parseInputNumberTable2(lines: string[]): NumberTable {
    const operatorsLine = lines[lines.length - 1];
    const operatorMatches = operatorsLine.matchAll(/([*+])(\s+(?=\s[+*])|(\s+$))/g);

    const numbersTable: NumberTable = [];
    
    for (const match of operatorMatches) {
        const matchLength = match[0].length;
        const startColumn = match.index!;
        
        const numbersColumn = [];
        for (let offset = 0; offset < matchLength; offset++) {
            const number = parseColumnNumber(lines, startColumn + offset);
            numbersColumn.push(number);
        }
        numbersTable.push(numbersColumn);
    }
    
    return numbersTable;
}

function parseColumnNumber(lines: string[], colIndex: number): number {
    const column = lines.slice(0, lines.length - 1).map(line => line[colIndex]).join("");
    const number = Number(column.trim());
    return number
}