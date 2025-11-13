import { sum } from "../../math";
import { splitAndMapIntoLines } from "../../util";

export enum RPS {
  Rock = 1,
  Paper = 2,
  Scissors = 3,
}
export enum Outcome {
  Loss = 0,
  Draw = 1,
  Win = 2,
}
const inputToRPS: Record<string, RPS> = {
  A: RPS.Rock,
  B: RPS.Paper,
  C: RPS.Scissors,
  X: RPS.Rock,
  Y: RPS.Paper,
  Z: RPS.Scissors,
};
const inputToOutcome: Record<string, Outcome> = {
  X: Outcome.Loss,
  Y: Outcome.Draw,
  Z: Outcome.Win,
};

export function toRPS(input: string): RPS {
  return inputToRPS[input];
}
export function toOutcome(input: string): Outcome {
  return inputToOutcome[input];
}

export function getOutcome(self: RPS, other: RPS): Outcome {
  if ((self % 3) + 1 === other) {
    return Outcome.Loss;
  }

  if (self === other) {
    return Outcome.Draw;
  }

  return Outcome.Win;
}

export function getInput(other: RPS, desiredOutcome: Outcome): RPS {
  if (desiredOutcome === Outcome.Win) return (other % 3) + 1;
  if (desiredOutcome === Outcome.Draw) return other;
  if (desiredOutcome === Outcome.Loss) return ((other + 1) % 3) + 1;
  throw new Error("Unknown inputs");
}

export function getScore(self: RPS, other: RPS) {
  const outcome = getOutcome(self, other);
  const score = outcome * 3 + self;
  return score;
}

export function part1(input: string): number {
  const lines = splitAndMapIntoLines(input, (line) => line.split(" ").map(toRPS));
  // console.log("lines", lines);
  const scores = lines.map(([other, self]) => getScore(self, other));
  const total_score = sum(scores);
  return total_score;
}

export function part2(input: string): number {
  const lines = splitAndMapIntoLines(input, (line) => line.split(" "));
  const scores = lines.map((line) => {
    const other = toRPS(line[0]);
    const outcome = toOutcome(line[1]);
    const self = getInput(other, outcome);
    const score = getScore(self, other);
    return score;
  });
  const total_score = sum(scores);
  return total_score;
}
