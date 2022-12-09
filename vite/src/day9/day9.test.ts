import { describe, it, expect } from "vitest";
import { readInput } from "../util";
import {
  DirDown,
  Direction,
  DirLeft,
  DirRight,
  DirUp,
  executeMove,
  executeMoves,
  executeStep,
  Move,
  parseLine,
  part1,
  part2,
  State,
  toVisited,
} from "./day9";

describe("Day 9", () => {
  describe("parse line", () => {
    type TestCase = [string, Direction, number]; // [input, expectedDirection, expectedCount]
    const testCases: TestCase[] = [
      ["U 4", DirUp, 4],
      ["R 13", DirRight, 13],
      ["D 1", DirDown, 1],
      ["L 123", DirLeft, 123],
    ];
    testCases.forEach(([input, dir, count], index) => {
      it(`Test case #${index + 1}`, () => {
        expect(parseLine(input)).toEqual([dir, count]);
      });
    });
  });

  function testStateFactory(head: [number, number] = [0, 0], tail = [0, 0], visited: string[] = ["(0,0)"]): State {
    const [headX, headY] = head;
    const [tailX, tailY] = tail;
    return {
      head: { x: headX, y: headY },
      tail: { x: tailX, y: tailY },
      visited: new Set(visited),
    };
  }

  describe("execute step", () => {
    type TestCase = [State, Direction, State];
    const testCases: TestCase[] = [
      [testStateFactory(), DirUp, testStateFactory([0, 1], [0, 0], ["(0,0)"])],
      [testStateFactory([-1, -1]), DirUp, testStateFactory([-1, 0], [0, 0], ["(0,0)"])],
      [testStateFactory([0, -1]), DirUp, testStateFactory([0, 0], [0, 0], ["(0,0)"])],
      [testStateFactory([1, -1]), DirUp, testStateFactory([1, 0], [0, 0], ["(0,0)"])],
      [testStateFactory([-1, 1]), DirUp, testStateFactory([-1, 2], [-1, 1], ["(0,0)", "(-1,1)"])],
      [testStateFactory([0, 1]), DirUp, testStateFactory([0, 2], [0, 1], ["(0,0)", "(0,1)"])],
      [testStateFactory([1, 1]), DirUp, testStateFactory([1, 2], [1, 1], ["(0,0)", "(1,1)"])],
      [testStateFactory(), DirRight, testStateFactory([1, 0], [0, 0], ["(0,0)"])],
      [testStateFactory(), DirDown, testStateFactory([0, -1], [0, 0], ["(0,0)"])],
      [testStateFactory(), DirLeft, testStateFactory([-1, 0], [0, 0], ["(0,0)"])],
    ];
    testCases.forEach(([initialState, dir, expectedState], index) => {
      it(`Test case #${index + 1}`, () => {
        expect(executeStep(dir, initialState)).toEqual(expectedState);
      });
    });
  });

  describe("execute move", () => {
    type TestCase = [State, Move, State]; // [initialState, move, expectedState]
    const testCases: TestCase[] = [
      [testStateFactory(), [DirRight, 4], testStateFactory([4, 0], [3, 0], ["(0,0)", "(1,0)", "(2,0)", "(3,0)"])],
      [
        testStateFactory([0, 1], [0, 0]),
        [DirRight, 4],
        testStateFactory([4, 1], [3, 1], ["(0,0)", "(1,1)", "(2,1)", "(3,1)"]),
      ],
      [testStateFactory([-1, 1], [0, 0]), [DirRight, 4], testStateFactory([3, 1], [2, 1], ["(0,0)", "(1,1)", "(2,1)"])],
    ];
    testCases.forEach(([initialState, move, expectedState], index) => {
      it(`Test case #${index + 1}`, () => {
        expect(executeMove(move, initialState)).toEqual(expectedState);
      });
    });
  });

  describe("execute moves", () => {
    type TestCase = [State, Move[], State]; // [initialState, moves, expectedState]
    const testCases: TestCase[] = [
      [testStateFactory(), [], testStateFactory()],
      [testStateFactory(), [[DirDown, 3]], testStateFactory([0, -3], [0, -2], ["(0,0)", "(0,-1)", "(0,-2)"])],
      [
        testStateFactory(),
        [
          [DirDown, 3],
          [DirLeft, 3],
        ],
        testStateFactory([-3, -3], [-2, -3], ["(0,0)", "(0,-1)", "(0,-2)", "(-1,-3)", "(-2,-3)"]),
      ],
    ];

    testCases.forEach(([initialState, moves, expectedState], index) => {
      it(`Test case #${index + 1}`, () => {
        expect(executeMoves(moves, initialState)).toEqual(expectedState);
      });
    });
  });

  describe("part 1", () => {
    it("sample", () => {
      const input = readInput(__dirname, "sample.txt");
      expect(part1(input)).toBe(13);
    });
    it("input", () => {
      const input = readInput(__dirname, "input.txt");
      expect(part1(input)).toBe(5960);
    });
  });
  describe("part 2", () => {
    it("sample", () => {
      const input = readInput(__dirname, "sample.txt");
      expect(part2(input)).toBe(1);
    });
    it("sample2", () => {
      const input = readInput(__dirname, "sample2.txt");
      expect(part2(input)).toBe(36);
    });
    it("input", () => {
      const input = readInput(__dirname, "input.txt");
      expect(part2(input)).toBe(undefined);
    });
  });
});
