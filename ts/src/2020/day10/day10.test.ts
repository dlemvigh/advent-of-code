import { readInput, splitIntoLines } from "../../util";

function part1(input: string): number {
  const values = splitIntoLines(input).map(Number);
  values.sort((a, b) => a - b);
  values.unshift(0);
  const diff = values.map((val, idx) => values[idx + 1] - val || 3);
  const d1 = diff.filter((x) => x === 1).length;
  const d3 = diff.filter((x) => x === 3).length;
  return d1 * d3;
}

function part2(input: string): number {
  const values = splitIntoLines(input).map(Number);
  values.sort((a, b) => a - b);
  values.unshift(0);

  const paths = values.map(() => 0);
  paths[0] = 1;

  for (let a = 1; a < values.length; a++) {
    for (let b = 1; b <= 3; b++) {
      if (a - b < 0) break;
      const diff = values[a] - values[a - b];
      if (diff > 3) break;
      paths[a] += paths[a - b];
    }
  }
  return paths[paths.length - 1];
}

describe("part 1", () => {
  it("sample", () => {
    const input = readInput(__dirname, "sample.txt");
    const res = part1(input);
    expect(res).toBe(220);
  });

  it("solution", () => {
    const input = readInput(__dirname);
    const res = part1(input);
    expect(res).toBe(2240);
  });
});

describe("part 2", () => {
  it("mini", () => {
    const input = readInput(__dirname, "mini.txt");
    var res = part2(input);
    expect(res).toBe(8);
  });

  it("sample", () => {
    const input = readInput(__dirname, "sample.txt");
    var res = part2(input);
    expect(res).toBe(19208);
  });

  it("input", () => {
    const input = readInput(__dirname);
    var res = part2(input);
    expect(res).toBe(99214346656768);
  });
});
