import { calcFuelCost, calcFuelCostRec } from "./code";

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
        expect(calcFuelCost(input)).toBe(expected);
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
        expect(calcFuelCostRec(input)).toBe(expected);
      });
    });
  });
});
