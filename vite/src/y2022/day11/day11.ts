import { splitAndMapIntoGroups, splitIntoGroups, splitIntoLines } from "../../util";

export type Monkey = {
    key: number,
    items: number[]

    operation: Function,

    divisor: number,
    ifTrue: number, 
    ifFalse: number,
    test: (item: number) => number,

    counter: number
}

export type Monkeys = Record<number, Monkey>;

export function parseInput(input: string): Monkeys {
    const groups = splitIntoGroups(input)
    const monkeyList = groups.map(parseLines);

    const monkeys: Monkeys = {}
    monkeyList.forEach(monkey => {
        monkeys[monkey.key] = monkey;
    })

    return monkeys;
}
export function parseGroup(input: string): Monkey {
    const lines = splitIntoLines(input);
    return parseLines(lines);
}   

function parseLines(lines: string[]){
    const [, key] = lines[0].match(/Monkey (\d+):/) ?? [];
    const [, items] = lines[1].match(/Starting items: (\d+(?:, \d+)*)/) ?? [];
    const [, operation] = lines[2].match(/Operation: new = (.*)/) ?? [];
    const [, divisor] = lines[3].match(/Test: divisible by (\d+)/) ?? [];
    const [, ifTrue] = lines[4].match(/If true: throw to monkey (\d+)/) ?? [];
    const [, ifFalse] = lines[5].match(/If false: throw to monkey (\d+)/) ?? [];

    const divisorAsNumber = Number(divisor);
    const ifTrueAsNumber = Number(ifTrue);
    const ifFalseAsNumber = Number(ifFalse);
    const test = (item: number) =>item % divisorAsNumber === 0 ? ifTrueAsNumber : ifFalseAsNumber

    const monkey: Monkey = {
        key: Number(key),
        items: items.split(", ").map(Number),
        operation: new Function("old", "return " + operation),
        divisor: divisorAsNumber,
        ifTrue: ifTrueAsNumber,
        ifFalse: ifFalseAsNumber,
        test,
        counter: 0
    }

    return monkey;
}

type ReliefFunction = (worry: number) => number

export function executeTurn(monkeys: Monkeys, key: number, relief: ReliefFunction = x => Math.floor(x / 3)) {
    const monkey = monkeys[key];
    const items = monkey.items.splice(0);
    items.forEach(item => {
        let worry = item;
        worry = monkey.operation(worry);
        worry = relief(worry);
        const destination = monkey.test(worry);
        monkeys[destination].items.push(worry);
        monkey.counter++;
    })
}

export function executeRound(monkeys: Monkeys, relief?: ReliefFunction) {
    for (const monkey of Object.values(monkeys)) {
        executeTurn(monkeys, monkey.key, relief);
    }
}

export function executeRounds(monkeys: Monkeys, rounds: number, relief?: ReliefFunction) {
    for (let round = 1; round <= rounds; round++) {
        executeRound(monkeys, relief);
    }
}

export function getCombinedDivisor(monkeys: Monkeys) {
    return Object.values(monkeys).reduce((prod, monkey) => prod * monkey.divisor, 1)
}

export function part1(input: string) {
    const monkeys = parseInput(input);
    executeRounds(monkeys, 20);
    const counters = Object.values(monkeys).map(monkey => monkey.counter);
    counters.sort((a,b) => b - a);
    const [a, b, ] = counters;
    return a * b;
}

export function part2(input: string) {
    const monkeys = parseInput(input);
    const divisor = getCombinedDivisor(monkeys);
    const relief: ReliefFunction = worry => worry % divisor;
    executeRounds(monkeys, 10000, relief);
    const counters = Object.values(monkeys).map(monkey => monkey.counter);
    counters.sort((a,b) => b - a);
    const [a, b, ] = counters;
    return a * b;

}