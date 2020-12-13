import { readInput } from "../../util";
import { part1, part2 } from "./day13";

function parseInput(input: string): [number, (number | null)[]] {
  const [first, second] = input.split("\n");
  const value = Number(first);
  const list = second.split(",").map((x) => (x === "x" ? null : Number(x)));
  return [value, list];
}

describe("part 1", () => {
  it("sample", () => {
    const input = readInput(__dirname, "sample.txt");
    const [value, list] = parseInput(input);
    const res = part1(value, list);
    expect(res).toBe(295);
  });

  it("solution", () => {
    const input = readInput(__dirname);
    const [value, list] = parseInput(input);
    const res = part1(value, list);
    expect(res).toBe(4938);
  });
});

describe("part 2", () => {
  describe("samples", () => {
    const cases: [number, (number | null)[]][] = [
      [3417, [17, null, 13, 19]],
      [754018, [67, 7, 59, 61]],
      [779210, [67, null, 7, 59, 61]],
      [1261476, [67, 7, null, 59, 61]],
      [1202161486, [1789, 37, 47, 1889]],
    ];

    cases.forEach(([expected, list]) =>
      it(`${expected} : ${list.map((x) => x || "x").join(",")}`, () => {
        expect(part2(list)).toBe(expected);
      })
    );
  });

  it("solution", () => {
    const input = readInput(__dirname);
    const [_, list] = parseInput(input);
    const res = part2(list);
    expect(res).toBe(230903629977901);
  });
});
