import { splitIntoLines } from "../../util";

export function part1(input: string) {
    const { numbers, operators } = parseInput(input);

    let sum = 0n
    for (let i = 0; i < operators.length; i++) {
        const operator = operators[i];
        const value = doMath(getColumnIterator(numbers, i), operator);
        sum += value;
    }
    return sum;
}

type Operator = "+" | "*";
type NumberTable = number[][]
const whiteSpaceRegex = /\s+/;

function parseInput(input: string): { numbers: NumberTable, operators: Operator[] } {
    const lines = splitIntoLines(input);

    const numbers = parseInputNumberTable(lines.slice(0, lines.length - 1));
    const operators = parseInputOperators(lines.slice(lines.length - 1)[0]);

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

function doMath(numbers: IteratorObject<number>, operator: Operator): bigint {
    switch (operator) {
        case "*":
            return numbers.reduce((acc, curr) => acc * BigInt(curr), 1n);
        case "+":
            return numbers.reduce((acc, curr) => acc + BigInt(curr), 0n);
        default:
            throw new Error(`Unknown operator: ${operator}`);
    }
}

export function part2(input: string) {
    const { numbers, operators } = parseInput2(input);

    let sum = 0n
    for (let i = 0; i < operators.length; i++) {
        const operator = operators[i];
        const value = doMath(numbers[i].values(), operator);
        sum += value;
    }
    return sum;
}

function parseInput2(input: string) {
    const lines = splitIntoLines(input, { trim: false });
    const numbers = parseInputNumberTable2(lines);
    const operators = parseInputOperators(lines.slice(lines.length - 1)[0]);
    return { numbers, operators}
}

function parseInputNumberTable2(lines: string[]): NumberTable {
    const signsLine = lines[lines.length - 1];
    const signMatches = signsLine.matchAll(/([*+])(\s+(?=\s[+*])|(\s+$))/g);

    const numbersTable: NumberTable = []
    for (const match of signMatches) {        
        const matchLength = match[0].length;
        console.log("Length:", matchLength, "Match: '", match[0], "'");
        const numbersColumn = []
        for (let i = 0; i < matchLength; i++) {
            const number = parseColumnNumber(lines, match.index + i);
            numbersColumn.push(number);
        }
        numbersTable.push(numbersColumn);
    }    
    return numbersTable
}

function parseColumnNumber(lines: string[], colIndex: number): number {
    const column = lines.slice(0, lines.length - 1).map(line => line[colIndex]).join("");
    const number = Number(column.trim());
    return number
}