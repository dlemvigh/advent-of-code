import { describe, it, expect } from "vitest";
import { readInput } from "../util";
import { charToHeight, isReachable, parseInput, part1, part2 } from "./day12";

describe("Day 12", () => {
  describe("char to height", ()=>{
    type TestCase = [string, number];
    const testCases: TestCase[] = [
      ['S', 0],
      ['a', 1],
      ['b', 2],
      ['c', 3],
      // ...
      ['z', 26],
      ['E', 27]
    ];

    testCases.forEach(([input, expected], index) => {
      it(`Test case #${index + 1}`, ()=>{
        expect(charToHeight(input)).toBe(expected);
      })
    })
  })

  describe("is reachable", ()=>{
    type TestCase = [number, number, boolean];
    const testCases: TestCase[] = [
      [0,0, true],
      [1, 1, true],
      [100, 100, true],
      [0, 1, true],
      [0, 2, false]
    ];

    testCases.forEach(([from, to, expected], index) => {
      it(`Test case #${index + 1}`, ()=>{
        expect(isReachable(from, to)).toBe(expected);
      })
    })
  })

  it("parse input (1x1)", ()=>{
    const [graph, meta] = parseInput("a");
    expect(graph).toEqual({
      nodes: {
        "(0x0)": {
          key: "(0x0)",
          value: {
            row: 0,
            col: 0,
            char: "a",
            height: 1
          },
          neighbors: {}
        }
      }
    })
    expect(meta).toEqual({ width: 1, height: 1 })
  })

  it("parse input (2x2)", ()=>{
    const [graph, meta] = parseInput("Sa\nzE");
    const expected = {
      nodes: {
        "(0x0)": {
          key: "(0x0)",
          value: {
            row: 0,
            col: 0,
            char: "S",
            height: 0
          },
          neighbors: {}
        },
        "(0x1)": {
          key: "(0x1)",
          value: {
            row: 0,
            col: 1,
            char: "a",
            height: 1
          },
          neighbors: {}
        },
        "(1x0)": {
          key: "(1x0)",
          value: {
            row: 1,
            col: 0,
            char: "z",
            height: 26
          },
          neighbors: {}
        },
        "(1x1)": {
          key: "(1x1)",
          value: {
            row: 1,
            col: 1,
            char: "E",
            height: 27
          },
          neighbors: {}
        }
      }
    }

    expect(graph).toEqual(expected);
    expect(meta).toEqual({ 
      width: 2, 
      height: 2, 
      start: expected.nodes["(0x0)"], 
      end: expected.nodes["(1x1)"] 
    })
  })

  describe("part 1", () => {
    it("sample", () => {
      const input = readInput(__dirname, "sample2.txt");
      expect(part1(input)).toBe(31);
    });
    it("input", () => {
      const input = readInput(__dirname, "input.txt");
      const result = part1(input);
      expect(result).toBeGreaterThan(148)
      expect(result).toBe(490)
    });
  });
  describe("part 2", () => {
    it("sample", () => {
      const input = readInput(__dirname, "sample.txt");
      expect(part2(input)).toBe(undefined);
    });
    it("input", () => {
      const input = readInput(__dirname, "input.txt");
      expect(part2(input)).toBe(undefined);
    });
  });
});
