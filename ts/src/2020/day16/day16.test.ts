import { readInput, splitIntoGroups } from "../../util";

type Rule = [number, number[]];

const rulesRegex = /([^:]+): (\d+)-(\d+) or (\d+)-(\d+)/;
function parseInput(input: string) {
  const groups = splitIntoGroups(input);

  const flatRules = [];
  const rules = groups[0].map((line) => {
    const [_, name, ...values] = line.match(rulesRegex);
    const numbers = values.map(Number);
    flatRules.push([numbers[0], numbers[1]]);
    flatRules.push([numbers[2], numbers[3]]);
    return [name, numbers];
  });

  const myTicket = parseTicket(groups[1][1]);
  const otherTickets = groups[2].slice(1).map(parseTicket);

  return { rules, flatRules, myTicket, otherTickets };
}

function parseTicket(input: string): number[] {
  return input.split(",").map(Number);
}

function validateTickets(tickets: number[][], rules: [number, number][]) {
  const invalid = [];
  tickets.forEach((ticket) => {
    ticket.forEach((value) => {
      if (!rules.some(([from, to]) => from <= value && value <= to)) {
        invalid.push(value);
      }
    });
  });
  return invalid.reduce((sum, val) => sum + val, 0);
}

describe("part 1", () => {
  it("sample", () => {
    const input = readInput(__dirname, "sample.txt");
    const { otherTickets, flatRules } = parseInput(input);
    const errorRate = validateTickets(otherTickets, flatRules);
    expect(errorRate).toBe(71);
  });

  it("solution", () => {
    const input = readInput(__dirname);
    const { otherTickets, flatRules } = parseInput(input);
    const errorRate = validateTickets(otherTickets, flatRules);
    expect(errorRate).toBe(21081);
  });
});
