import { describe, it, expect } from "vitest";
import { readInput } from "../../util";
import { executeRound, executeTurn, parseGroup, parseInput, part1, part2 } from "./day11";

describe("Day 11", () => {

  it("parse group #1", ()=>{
    // arrange
    const input = `Monkey 0:
    Starting items: 79, 98
    Operation: new = old * 19
    Test: divisible by 23
      If true: throw to monkey 2
      If false: throw to monkey 3`
    
    // act
    const monkey = parseGroup(input);

    // assert
    expect(monkey.key).toBe(0);
    expect(monkey.items).toEqual([79,98]);
    expect(monkey.operation(1)).toBe(19);
    expect(monkey.test(23)).toBe(2);
    expect(monkey.test(24)).toBe(3);
    expect(monkey.counter).toBe(0);
  })

  it("parse group #2", ()=>{
    // arrange
    const input = `Monkey 2:
    Starting items: 79, 60, 97
    Operation: new = old * old
    Test: divisible by 13
      If true: throw to monkey 1
      If false: throw to monkey 3`
    
    // act
    const monkey = parseGroup(input);

    // assert
    expect(monkey.key).toBe(2);
    expect(monkey.items).toEqual([79,60,97]);
    expect(monkey.operation(1)).toBe(1);
    expect(monkey.operation(2)).toBe(4);
    expect(monkey.operation(3)).toBe(9);
    expect(monkey.test(13)).toBe(1);
    expect(monkey.test(14)).toBe(3);
    expect(monkey.counter).toBe(0);
  })

  it("execute turn", () => {
    // arrange
    const input = readInput(__dirname, "sample.txt");
    const monkeys = parseInput(input);

    // act
    executeTurn(monkeys, 0);

    // assert
    expect(monkeys[0].items).toEqual([]);
    expect(monkeys[0].counter).toBe(2);
    expect(monkeys[3].items).toEqual([74,500,620])
  })

  it("execute round", () => {
    // arrange
    const input = readInput(__dirname, "sample.txt");
    const monkeys = parseInput(input);

    // act
    executeRound(monkeys);

    // assert
    expect(monkeys[0].items).toEqual([20, 23, 27, 26])
    expect(monkeys[1].items).toEqual([2080, 25, 167, 207, 401, 1046])
    expect(monkeys[2].items).toEqual([])
    expect(monkeys[3].items).toEqual([])
  })

  describe("part 1", () => {
    it("sample", () => {
      const input = readInput(__dirname, "sample.txt");
      expect(part1(input)).toBe(10605);
    });
    it.skip("input", () => {
      const input = readInput(__dirname, "input.txt");
      expect(part1(input)).toBe(56120);
    });
  });
  describe("part 2", () => {
    it("sample", () => {
      const input = readInput(__dirname, "sample.txt");
      expect(part2(input)).toBe(2713310158);
    });
    it.skip("input", () => {
      const input = readInput(__dirname, "input.txt");
      expect(part2(input)).toBe(24389045529);
    });
  });
});
