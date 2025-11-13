import { describe, expect, it } from "vitest";
import { readInput } from "../../util";
import { Outcome, RPS, getInput, getScore, part1, part2 } from "./day2";

describe("day 2", () => {
  describe("get score", () => {
    type TestCase = [RPS, RPS, number];
    const test_cases: TestCase[] = [
      [RPS.Rock, RPS.Rock, 1 + 3],
      [RPS.Rock, RPS.Paper, 1 + 0],
      [RPS.Rock, RPS.Scissors, 1 + 6],
      [RPS.Paper, RPS.Rock, 2 + 6],
      [RPS.Paper, RPS.Paper, 2 + 3],
      [RPS.Paper, RPS.Scissors, 2 + 0],
      [RPS.Scissors, RPS.Rock, 3 + 0],
      [RPS.Scissors, RPS.Paper, 3 + 6],
      [RPS.Scissors, RPS.Scissors, 3 + 3],
    ];
    test_cases.forEach(([self, other, score]) => {
      it(`get score: ${self} vs ${other}`, () => {
        expect(getScore(self, other)).toBe(score);
      });
    });
  });

  describe("get input", () => {
    type TestCase = [RPS, Outcome, RPS]; // opponent, desired outcome, expected
    const test_cases: TestCase[] = [
      [RPS.Rock, Outcome.Win, RPS.Paper],
      [RPS.Rock, Outcome.Draw, RPS.Rock],
      [RPS.Rock, Outcome.Loss, RPS.Scissors],

      [RPS.Paper, Outcome.Win, RPS.Scissors],
      [RPS.Paper, Outcome.Draw, RPS.Paper],
      [RPS.Paper, Outcome.Loss, RPS.Rock],

      [RPS.Scissors, Outcome.Win, RPS.Rock],
      [RPS.Scissors, Outcome.Draw, RPS.Scissors],
      [RPS.Scissors, Outcome.Loss, RPS.Paper],
    ];
    test_cases.forEach(([other, desiredOutcome, expected], index) => {
      it(`case #${index}:`, () => {
        expect(getInput(other, desiredOutcome)).toBe(expected);
      });
    });
  });

  const sample = "A Y\nB X\nC Z";

  describe("part 1", () => {
    it("sample", () => {
      const score = part1(sample);
      expect(score).toBe(15);
    });
    it.skip("input", () => {
      const input = readInput(__dirname, "input.txt");
      const score = part1(input);
      expect(score).toBe(12772);
    });
  });

  describe("part 2", () => {
    it("sample", () => {
      const score = part2(sample);
      expect(score).toBe(12);
    });
    it.skip("input", () => {
      const input = readInput(__dirname, "input.txt");
      const score = part2(input);
      expect(score).toBe(11618);
    });
  });
});
