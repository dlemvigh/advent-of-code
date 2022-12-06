import { reverseString, splitIntoGroups } from "../util";

export type Stack = string;
export type Stacks = Stack[];
export type Move = [number, number, number];
// type Move = { count: number; from: number; to: number }; // [count, from, to]
export type Moves = Move[];

export function parseInput(input: string): [Stacks, Moves] {
  const [inputStacks, inputMoves] = splitIntoGroups(input, { trim: false });
  const stacks = parseStacks(inputStacks);
  const moves = parseMoves(inputMoves);
  return [stacks, moves];
}

function parseStacks(input: string[]): Stacks {
  const height = input.length - 1;
  const width = input[height].length;
  const columns = [];

  for (let c = 0; c * 4 < width; c++) {
    let column = "";
    for (let h = 0; h < height; h++) {
      const hh = height - h - 1;
      const cc = c * 4 + 1;
      const char = input[hh][cc];
      if (char == " ") {
        break;
      }
      column += char;
    }
    columns.push(column);
  }
  return columns;
}

function parseMoves(input: string[]): Moves {
  return input.map<Move>((line: string) => {
    const match = line.trim().match(/^move (\d+) from (\d+) to (\d+)$/);
    if (match == null) {
      throw new Error("Unable to parse move");
    }

    const [_, count, from, to] = match;
    return [count, from, to].map(Number) as Move;
  });
}

export function executeMove(stacks: Stacks, move: Move, reverse = true) {
  const [count, from, to] = move;
  const newStacks = [...stacks];
  const fromStack = stacks[from - 1];

  const index = fromStack.length - count;
  const keep = fromStack.substring(0, index);
  const take = fromStack.substring(index);

  newStacks[from - 1] = keep;
  newStacks[to - 1] += reverse ? reverseString(take) : take;

  return newStacks;
}

function executeMoves(input: Stacks, moves: Moves, reverse?: boolean): Stacks {
  return moves.reduce((stack, move) => executeMove(stack, move, reverse), input);
}

function getTopOfStacks(input: Stacks): string {
  return input.map((stack) => stack[stack.length - 1]).join("");
}

export function part1(input: string): string {
  const [stacks, moves] = parseInput(input);
  const finalStacks = executeMoves(stacks, moves);
  const result = getTopOfStacks(finalStacks);
  return result;
}

export function part2(input: string): string {
  const [stacks, moves] = parseInput(input);
  const finalStacks = executeMoves(stacks, moves, false);
  const result = getTopOfStacks(finalStacks);
  return result;
}
