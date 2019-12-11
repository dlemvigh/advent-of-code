const { readInput } = require("../../util");
const { gcd, toDegrees, part1, part2 } = require("./code");

describe("day 10", () => {
  describe("gcd", () => {
    const cases = [
      [1, 1, 1],
      [1, 2, 1],
      [2, 1, 1],
      [2, 2, 2],
      [2, 3, 1],
      [2, 4, 2],
      [2 * 3 * 5, 2 * 3 * 7, 2 * 3],
      [-4, 4, 4],
      [-4, -4, 4],
      [4, -4, 4],
      [9, 0, 9],
      [0, 9, 9],
      [-9, 0, 9],
      [0, -9, 9]
    ];

    cases.forEach(([a, b, expected]) => {
      it(`gcd(${a}, ${b}) == ${expected}`, () => {
        expect(gcd(a, b)).toBe(expected);
      });
    });
  });

  describe.only("degrees", () => {
    const cases = [
      [0, 1, 0],
      [1, 1, 45],
      [1, 0, 90],
      [1, -1, 135],
      [0, -1, 180],
      [-1, -1, 225],
      [-1, 0, 270],
      [-1, 1, 315]
    ];

    cases.forEach(([dx, dy, expected]) => {
      it(`[${dx},${dy}] = ${expected}`, () => {
        expect(toDegrees(dx, dy)).toBe(expected);
      });
    });
  });

  describe("part 1", () => {
    const cases = [
      [".#..#\r\n.....\r\n#####\r\n....#\r\n...##", [3, 4], 8],
      [readInput(__dirname, "./cases/caseA.txt"), [5, 8], 33],
      [readInput(__dirname, "./cases/caseB.txt"), [1, 2], 35],
      [readInput(__dirname, "./cases/caseC.txt"), [6, 3], 41],
      [readInput(__dirname, "./cases/caseD.txt"), [11, 13], 210]
    ];

    cases.forEach(([input, [x, y], count], index) => {
      it(`Case #${index + 1}`, () => {
        const result = part1(input);
        expect(result.asteroid).toEqual([y, x]);
        expect(result.angles).toBe(count);
      });
    });

    const input = readInput(__dirname);
    const best = part1(input);
    console.log("result", best);
  });

  describe.only("part 2", () => {});
});
