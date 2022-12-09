import { splitAndMapIntoLines } from "../util";

export type Position = { x: number; y: number };
export type Direction = { dx: -1 | 0 | 1; dy: -1 | 0 | 1 };

export const DirUp: Direction = { dx: 0, dy: 1 };
export const DirRight: Direction = { dx: 1, dy: 0 };
export const DirDown: Direction = { dx: 0, dy: -1 };
export const DirLeft: Direction = { dx: -1, dy: 0 };

export type Move = [Direction, number];

export function parseLine(input: string): Move {
  const match = input.match(/([URLD]) (\d+)/);
  if (match) {
    const [_, dir, count] = match;
    const Count = Number(count);
    switch (dir) {
      case "U":
        return [DirUp, Count];
      case "R":
        return [DirRight, Count];
      case "D":
        return [DirDown, Count];
      case "L":
        return [DirLeft, Count];
    }
    throw new Error("Unknown direction: " + dir);
  }
  throw new Error("Unable to parse line");
}

export type State = {
  head: Position;
  tail: Position;
  visited: Set<string>;
};

export function executeMove(move: Move, state: State): State {
  const [dir, steps] = move;
  for (let i = 0; i < steps; i++) {
    executeStep(dir, state);
  }
  return state;
}

export function executeMoves(moves: Move[], state: State): State {
  for (const move of moves) {
    executeMove(move, state);
  }
  return state;
}

export function executeStep(direction: Direction, state: State): State {
  // move head
  state.head.x += direction.dx;
  state.head.y += direction.dy;

  // move tail
  const dx = state.head.x - state.tail.x;
  const dy = state.head.y - state.tail.y;
  if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
    state.tail.x += Math.sign(dx);
    state.tail.y += Math.sign(dy);
  }

  // update visited
  state.visited.add(toVisited(state.tail));

  return state;
}

export function toVisited(position: Position): string {
  return `(${position.x},${position.y})`;
}

export function part1(input: string) {
  // parse input
  const moves = splitAndMapIntoLines(input, parseLine);

  // setup initial state
  const head: Position = { x: 0, y: 0 };
  const tail: Position = { x: 0, y: 0 };
  const visited = new Set([toVisited(tail)]);
  const state: State = { head, tail, visited };

  executeMoves(moves, state);

  return state.visited.size;
}

export function part2(input: string) {}
