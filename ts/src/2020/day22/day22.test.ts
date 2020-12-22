import { readInput } from "../../util";
import { part1, part2, playRecursiveWar } from "./day22";

describe("part 1", () => {
  it("sample", () => {
    const input = readInput(__dirname, "sample.txt");
    const res = part1(input);
    expect(res).toBe(306);
  });

  it("solution", () => {
    const input = readInput(__dirname);
    const res = part1(input);
    expect(res).toBe(33631);
  });
});

describe("part 2", () => {
  it("sample", () => {
    const input = readInput(__dirname, "sample.txt");
    const res = part2(input);
    expect(res).toBe(291);
  });
  it("infinite loop", () => {
    const input = readInput(__dirname, "inf.txt");
    const res = part2(input);
    expect(res).toBe(369);
  });

  it("solution", () => {
    const input = readInput(__dirname);
    const res = part2(input);
    expect(res).toBeGreaterThan(31894);
    expect(res).toBeGreaterThan(32177);
    expect(res).toBeLessThan(34232);
    expect(res).toBe(33469);
  });
});
