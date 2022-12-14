import { describe, it, expect } from "vitest";
import { readInput } from "../util";
import { isListInRightOrder, Packet, part1, part2 } from "./day13";

describe("Day 13", () => {
  describe("is in right order", () => {
    type TestCase =  [[Packet, Packet], boolean | undefined];
    const testCases: TestCase[] = [
      [[[1],[1]],undefined],
      [[[1],[2]],true],
      [[[2],[1]],false],
      [[[1],[]],false],
      [[[],[1]],true],
      [[[1,1,3,1,1],[1,1,5,1,1]],true],
      [[[[[1]]],[1]],undefined],
      [[[1],[[[1]]]],undefined],
      [[[1,[2,[3]]],[1,[2,3]]],undefined],
      [[[[1],[2,3,4]],[[1],4]],true],
      [[[9],[[8,7,6]]],false],
      [[[[4,4],4,4],[[4,4],4,4,4]],true],
      [[[7,7,7,7],[7,7,7]],false],
      [[[],[3]],true],
      [[[[[]]],[[]]],false],
      [[[1,[2,[3,[4,[5,6,7]]]],8,9],[1,[2,[3,[4,[5,6,0]]]],8,9]],false]
    ]

    testCases.forEach(([[left, right], expected], index) =>{
      it(`Test case #${index + 1}`,()=>{
        expect(isListInRightOrder(left, right)).toBe(expected);
      })
    })
  })

  describe("part 1", () => {
    it("sample", () => {
      const input = readInput(__dirname, "sample.txt");
      expect(part1(input)).toBe(13);
    });
    it("input", () => {
      const input = readInput(__dirname, "input.txt");
      expect(part1(input)).toBe(5013);
    });
  });
  describe("part 2", () => {
    it("sample", () => {
      const input = readInput(__dirname, "sample.txt");
      expect(part2(input)).toBe(140);
    });
    it("input", () => {
      const input = readInput(__dirname, "input.txt");
      expect(part2(input)).toBe(25038);
    });
  });
});
