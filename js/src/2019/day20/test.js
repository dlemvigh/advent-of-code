const { readInput } = require("../../util");
const { Graph, Map, part1 } = require("./code");

describe("day 20", () => {
  describe("find portals", () => {
    const input = readInput(__dirname, "small.txt");
    const map = new Map(input);
    const portals = map.findPortals();

    [
      ["AA", 1],
      ["ZZ", 1],
      ["BC", 2],
      ["DE", 2],
      ["FG", 2]
    ].forEach(([name, count]) => {
      it(`correct number of portals: ${name} = ${count}`, () => {
        expect(portals.filter(x => x.name === name)).toHaveLength(count);
      });
    });

    [
      ["AA", { x: 9, y: 2 }],
      ["ZZ", { x: 13, y: 16 }]
    ].map(([name, coords]) => {
      it(`correct portal entrance: ${name}`, () => {
        expect(portals.find(x => x.name === name)).toEqual({
          name,
          coords
        });
      });
    });
  });

  describe("part 1", () => {
    it("small", () => {
      const input = readInput(__dirname, "small.txt");
      const result = part1(input);
      expect(result).toBe(23);
    });

    it("medium", () => {
      const input = readInput(__dirname, "medium.txt");
      const result = part1(input);
      expect(result).toBe(58);
    });

    it("verify solution", () => {
      const input = readInput(__dirname);
      const result = part1(input);
      expect(result).toBe(644);
    });
  });
});
