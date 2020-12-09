import { readInput } from "../../util";
import { part1, part2 } from "./day9";

describe("part 1", () => {
  it("sample", () => {
    const input = readInput(__dirname, "sample.txt");
    const res = part1(input, 5);
    expect(res).toBe(127);
  });

  it("solution", () => {
    const input = readInput(__dirname);
    const res = part1(input, 25);
    expect(res).toBe(375054920);
  });
});

describe("part 2", () => {
  it("sample", () => {
    const input = readInput(__dirname, "sample.txt");
    const res = part2(input, 5);
    expect(res).toBe(62);
  });

  it("solution", () => {
    const input = readInput(__dirname);
    const res = part2(input, 25);
    expect(res).toBe(54142584);
  });
});
