import { readInput, splitIntoLines } from "../../util";

import { part1, part2, getLineOfSightMap } from "./day11";

describe("part 1", () => {
  it("sample", () => {
    const input = readInput(__dirname, "sample.txt");
    const res = part1(input);
    expect(res).toBe(37);
  });

  it("solution", () => {
    const input = readInput(__dirname);
    const res = part1(input);
    expect(res).toBe(2406);
  });
});

describe("part 2", () => {
  describe("get near by line of sight", () => {
    it("small thin", () => {
      const input = splitIntoLines(
        ".............\n.L.L.#.#.#.#.\n............."
      );
      const map = getLineOfSightMap(input);
      const none = [];
      const noneLine = Array.from({ length: 13 }, () => none);
      expect(map).toEqual([
        noneLine,
        [
          none,
          [[3, 1]],
          none,
          [
            [1, 1],
            [5, 1],
          ],
          none,
          [
            [3, 1],
            [7, 1],
          ],
          none,
          [
            [5, 1],
            [9, 1],
          ],
          none,
          [
            [7, 1],
            [11, 1],
          ],
          none,
          [[9, 1]],
          none,
        ],
        noneLine,
      ]);
      // console.log("map", JSON.stringify(map, null, 2));
    });

    it("eye of the storm", () => {
      const input = splitIntoLines(`.##.##.
#.#.#.#
##...##
...L...
##...##
#.#.#.#
.##.##.`);

      const map = getLineOfSightMap(input);
      expect(map[3][3]).toEqual([]);
    });
    it("sample", () => {
      const input = readInput(__dirname, "sample.txt");
      const res = part2(input);
      expect(res).toBe(26);
    });
    it("solution", () => {
      const input = readInput(__dirname);
      const res = part2(input);
      expect(res).toBe(2149);
    });
  });
});
