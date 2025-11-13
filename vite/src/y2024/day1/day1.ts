import { splitIntoLines } from "../../util";

export function part1(input: string) {
    const lines = splitIntoLines(input);

    let sum = 0;
    const left: number[] = [];
    const right: number[] = [];

    for (const line of lines) {
        const [a, b] = line.split(/\s+/).map(Number);
        left.push(a);
        right.push(b);
    }
    
    left.sort((a, b) => a - b);
    right.sort((a, b) => a - b);

    for (let i = 0; i < left.length; i++) {
        const a = left[i];
        const b = right[i];

        const diff = Math.abs(a - b);

        sum += diff;
    }

    return sum;
}

export function part2(input: string) {
    const lines = splitIntoLines(input);

    const left: number[] = [];
    const right: number[] = [];
    let sum = 0;

    for (const line of lines) {
        const [a, b] = line.split(/\s+/).map(Number);
        left.push(a);
        right.push(b);
    }

    const occurences = new Map<number, number>();
    for (const num of right) {
        occurences.set(num, (occurences.get(num) ?? 0) + 1);
    }

    for (const num of left) {
        const count = occurences.get(num) ?? 0;
        sum += count * num;
    }

    return sum;
}
