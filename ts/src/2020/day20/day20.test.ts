import { readInput } from "../../util";
import { parseInput, part1 } from "./day20";

describe("part 1", () => {
  it("sample", () => {
    const input = readInput(__dirname, "sample.txt");
    const tiles = parseInput(input);
    const res = part1(tiles);
    expect(res).toBe(20899048083289);
  });

  it("solution", () => {
    const input = readInput(__dirname);
    const tiles = parseInput(input);
    const res = part1(tiles);
    expect(res).toBe(2699020245973);
  });
});
