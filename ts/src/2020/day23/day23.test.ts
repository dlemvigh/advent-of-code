import { part1 } from "./day23";

describe("part 1", () => {
  it("sample 10 rounds", () => {
    const input = "389125467";
    expect(part1(input, 10)).toBe(92658374);
  });

  it("sample 100 rounds", () => {
    const input = "389125467";
    expect(part1(input, 100)).toBe(67384529);
  });

  it("solution", () => {
    const input = "247819356";
    expect(part1(input, 100)).toBe(76385429);
  });
});
