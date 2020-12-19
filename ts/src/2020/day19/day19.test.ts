import { readInput } from "../../util";
import { part1 } from "./day19";

describe("part 1", () => {
  it("sample", () => {
    const input = readInput(__dirname, "sample.txt");
    const res = part1(input);
    expect(res).toBe(2);
  });

  it.only("solution", () => {
    const input = readInput(__dirname);
    const res = part1(input);
    expect(res).toBe(122);
  });
});
