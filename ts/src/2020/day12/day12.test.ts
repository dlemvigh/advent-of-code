import { readInput } from "../../util";
import { part1, part2 } from "./day12";

describe("part 1", () => {
  it("sample", () => {
    const input = readInput(__dirname, "sample.txt");
    const res = part1(input);
    expect(res).toBe(25);
  });

  it("solution", () => {
    const input = readInput(__dirname);
    const res = part1(input);
    expect(res).toBe(590);
    // 216 too low
  });
});

describe("part 2", () => {
  it("sample", () => {
    const input = readInput(__dirname, "sample.txt");
    const res = part2(input);
    expect(res).toBe(286);
  });

  it("solution", () => {
    const input = readInput(__dirname);
    const res = part2(input);
    // expect(res).toBeGreaterThan(9819);
    expect(res).toBe(42013);
  });
});
