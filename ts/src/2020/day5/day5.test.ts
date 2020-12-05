import * as fs from "fs";
import * as path from "path";

import { parseSeatId } from "./day5";

describe("part 1", () => {
  const cases: [string, number][] = [
    ["BFFFBBFRRR", 567],
    ["FFFBBBFRRR", 119],
    ["BBFFBBFRLL", 820],
  ];

  cases.forEach(([input, expected]) => {
    it(input, () => {
      expect(parseSeatId(input)).toBe(expected);
    });
  });

  it("solution", () => {
    const filename = path.join(__dirname, "./input.txt");
    const file = fs.readFileSync(filename);
    const lines = file
      .toString()
      .split("\n")
      .map((x) => x.trim());

    const seatIds = lines.map(parseSeatId);
    const max = Math.max(...seatIds);

    expect(max).toBe(994);
  });

  it("part 2", () => {
    const filename = path.join(__dirname, "./input.txt");
    const file = fs.readFileSync(filename);
    const lines = file
      .toString()
      .split("\n")
      .map((x) => x.trim());

    const seatIds = lines.map(parseSeatId);
    seatIds.sort((a, b) => a - b);
    for (let i = 1; i < seatIds.length; i++) {
      const prev = seatIds[i - 1];
      const next = seatIds[i];
      if (next - prev === 2) {
        console.log("gap", prev, next);
      }
    }
    // console.log(seatIds.join("\n"));
  });
});
