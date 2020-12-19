import { readInput } from "../../util";
import { part1, part2 } from "./day19";

describe("part 1", () => {
  it("sample", () => {
    const input = readInput(__dirname, "sample.txt");
    const res = part1(input);
    expect(res).toBe(2);
  });

  it("solution", () => {
    const input = readInput(__dirname);
    const res = part1(input);
    expect(res).toBe(122);
  });
});

describe("part 2", () => {
  it("sample", () => {
    const input = readInput(__dirname, "part2sample.txt");
    const res = part2(input);
    expect(res).toBe(12);
  });

  it("solution", () => {
    const input = readInput(__dirname);
    const res = part2(input);
    expect(res).toBe(287);
  });
});
