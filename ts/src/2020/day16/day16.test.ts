import { readInput } from "../../util";
import { parseInput, part1_validateTickets, part2 } from "./day16";

describe("part 1", () => {
  it("sample", () => {
    const input = readInput(__dirname, "sample.txt");
    const { otherTickets, flatRules } = parseInput(input);
    const errorRate = part1_validateTickets(otherTickets, flatRules);
    expect(errorRate).toBe(71);
  });

  it("solution", () => {
    const input = readInput(__dirname);
    const { otherTickets, flatRules } = parseInput(input);
    const errorRate = part1_validateTickets(otherTickets, flatRules);
    expect(errorRate).toBe(21081);
  });
});

describe("part 2", () => {
  it("solution", () => {
    const input = readInput(__dirname);
    const res = part2(input);
    expect(res).toBe(314360510573);
  });
});
