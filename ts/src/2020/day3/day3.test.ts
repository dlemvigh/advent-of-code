import * as fs from "fs";
import * as path from "path";

import { countTreesOnTrajectory, countMultiple } from "./day3";

describe("day 3", () => {
  const MAP = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`.split("\n");

  describe("part 1", () => {
    it("sample", () => {
      const trees = countTreesOnTrajectory(MAP, [1, 3]);
      expect(trees).toBe(7);
    });

    it("part 1 solution", () => {
      const filename = path.join(__dirname, "./input.txt");
      const file = fs.readFileSync(filename);
      const map = file.toString().split("\n");

      const trees = countTreesOnTrajectory(map, [1, 3]);
      expect(trees).toBe(286);
    });
  });

  describe("part 2", () => {
    it("sample", () => {
      const trees = countMultiple(MAP);
      expect(trees).toBe(336);
    });

    it("part 2 solution", () => {
      const filename = path.join(__dirname, "./input.txt");
      const file = fs.readFileSync(filename);
      const map = file.toString().split("\n");

      const trees = countMultiple(map);
      expect(trees).toBe(3638606400);
    });
  });
});
