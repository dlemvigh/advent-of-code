import { splitIntoLines } from "../../util";

export function part1(input: string) {
    const lines = splitIntoLines(input);
    const numbers = lines.map(getBiggest2DigitNumberInString)
    const sum = numbers.reduce((a, b) => a + b, 0);
    return sum;
}

export function part2(input: string) {

}


export function getBiggest2DigitNumberInString(s: string): number {
    let biggest = -1
    for (let a = 0; a < s.length - 1; a++) {
        const firstDigit = s.charCodeAt(a) - '0'.charCodeAt(0);
        for (let b = a + 1; b < s.length; b++) {
            const secondDigit = s.charCodeAt(b) - '0'.charCodeAt(0);
            const value = firstDigit * 10 + secondDigit;
            if (value > biggest) {
                biggest = value;
            }
        }
    }
    return biggest;
    // return getBiggestNDigitNumberInString(s, 2);
}

export function getBiggestNDigitNumberInString(s: string, n: number): number {
    return 0
}
