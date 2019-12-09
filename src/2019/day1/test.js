const { part1, part2 } = require("./code");

describe("day 1", () => {
  describe("part 1", () => {
    const cases = [
      [12, 2],
      [14, 2],
      [1969, 654],
      [100756, 33583]
    ];
    cases.forEach(([input, expected]) => {
      it(`${input} => ${expected}`, () => {
        expect(part1(input)).toBe(expected);
      });
    });
  });

  describe("part 2", () => {
    const cases = [
      [12, 2],
      [14, 2],
      [1969, 966],
      [100756, 50346]
    ];
    cases.forEach(([input, expected]) => {
      it(`${input} => ${expected}`, () => {
        expect(part2(input)).toBe(expected);
      });
    });
  });
});
