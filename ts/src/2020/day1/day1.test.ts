import * as fs from "fs";
import * as path from "path";

import { part1, part2 } from "./day1";

describe("day 1", () => {
  describe("part 1", () => {
    it("sample", () => {
      const input = "1721\n979\n366\n299\n675\n1456";
      const [a, b, ab] = part1(input);
      expect(ab).toBe(514579);
    });

    it("part 1", () => {
      const filename = path.join(__dirname, "./input.txt");
      const file = fs.readFileSync(filename);
      const [a, b, ab] = part1(file.toString());
      expect(ab).toBe(956091);
    });

    it("part 2", () => {
      const filename = path.join(__dirname, "./input.txt");
      const file = fs.readFileSync(filename);
      const res = part2(file.toString());
      expect(res).toBe(79734368);
    });
  });
});
