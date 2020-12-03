import * as fs from "fs";
import * as path from "path";

import { parseLine, validate, validatePosition } from "./day2";

type Case = [string, [number, number, string, string, boolean, boolean]];
describe("day2", () => {
  const CASES: Case[] = [
    ["1-3 a: abcde", [1, 3, "a", "abcde", true, true]],
    ["1-3 b: cdefg", [1, 3, "b", "cdefg", false, false]],
    ["2-9 c: ccccccccc", [2, 9, "c", "ccccccccc", true, false]],
  ];

  describe("parse line", () => {
    CASES.forEach(([input, [min, max, letter, password, valid]]) => {
      it(input, () => {
        expect(parseLine(input)).toEqual([min, max, letter, password]);
      });
    });
  });

  describe("validate", () => {
    CASES.forEach(([input, [min, max, letter, password, valid]]) => {
      it(input, () => {
        expect(validate(min, max, letter, password)).toBe(valid);
      });
    });
  });

  describe("solutions", () => {
    it("part 1", () => {
      const filename = path.join(__dirname, "./input.txt");
      const file = fs.readFileSync(filename);
      const lines = file.toString().split("\n");

      let count = 0;
      lines.forEach((line) => {
        const parsed = parseLine(line);
        const valid = validate(...parsed);
        if (valid) {
          count++;
        }
      });
      expect(count).toBe(483);
    });

    it("part 2", () => {
      const filename = path.join(__dirname, "./input.txt");
      const file = fs.readFileSync(filename);
      const lines = file.toString().split("\n");

      let count = 0;
      lines.forEach((line) => {
        const parsed = parseLine(line);
        const valid = validatePosition(...parsed);
        if (valid) {
          count++;
        }
      });
      expect(count).toBe(482);
    });
  });
  describe("validate position", () => {
    CASES.forEach(([input, [min, max, letter, password, _, valid]]) => {
      it(input, () => {
        expect(validatePosition(min, max, letter, password)).toBe(valid);
      });
    });
  });
});
