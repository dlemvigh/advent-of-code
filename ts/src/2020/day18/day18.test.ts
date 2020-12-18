import { readInput, splitIntoLines } from "../../util";

const rParen = /(\([^\()]+\))/;
const rAdd = /(-?\d+) \+ (-?\d+)/;
const rMulti = /(-?\d+) \* (-?\d+)/;

function part1(input: string) {
  return calcLine(input, calcLeftToRight);
}
function part2(input: string) {
  return calcLine(input, calcAddFirst);
}

function calcLine(input: string, calcFn: (expr: string) => number): number {
  let expr = input;
  while (expr.match(rParen)) {
    expr = expr.replace(rParen, (match) => {
      const value = calcFn(match.substr(1, match.length - 2));
      return value.toString();
    });
  }
  return calcFn(expr);
}

function calcLeftToRight(input: string) {
  const terms = input.split(" ");
  let res = Number(terms[0]);
  for (let i = 2; i < terms.length; i += 2) {
    const op = terms[i - 1];
    const val = Number(terms[i]);
    if (op === "+") res += val;
    if (op === "*") res *= val;
  }

  return res;
}

function calcAddFirst(input: string): number {
  let expr = input;
  while (expr.match(rAdd)) {
    expr = expr.replace(rAdd, (_, a, b) => {
      const value = Number(a) + Number(b);
      return value.toString();
    });
  }
  return calcLeftToRight(expr);
}

describe("part 1", () => {
  const cases: [string, number][] = [
    ["2 * 3 + (4 * 5)", 26],
    ["5 + (8 * 3 + 9 + 3 * 4 * 3)", 437],
    ["5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))", 12240],
    ["((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2", 13632],
  ];

  cases.forEach(([input, expected]) => {
    it(`${input} = ${expected}`, () => {
      const res = part1(input);
      expect(res).toBe(expected);
    });
  });

  it("solution", () => {
    const input = readInput(__dirname);
    const lines = splitIntoLines(input);
    const values = lines.map(part1);
    const res = values.reduce((a, b) => a + b);
    expect(res).toBe(21993583522852);
  });
});

describe("part 2", () => {
  const cases: [string, number][] = [
    ["1 + 2 * 3 + 4 * 5 + 6", 231],
    ["1 + (2 * 3) + (4 * (5 + 6))", 51],
    ["2 * 3 + (4 * 5)", 46],
    ["5 + (8 * 3 + 9 + 3 * 4 * 3)", 1445],
    ["5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))", 669060],
    ["((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2", 23340],
  ];

  cases.forEach(([input, expected]) => {
    it(`${input} = ${expected}`, () => {
      const res = part2(input);
      expect(res).toBe(expected);
    });
  });

  it("solution", () => {
    const input = readInput(__dirname);
    const lines = splitIntoLines(input);
    const values = lines.map(part2);
    const res = values.reduce((a, b) => a + b);
    expect(res).toBe(122438593522757);
  });
});
