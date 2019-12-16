const { readInput } = require("../../util");
const { PetriNet, part2 } = require("./code");

describe("day 14", () => {
  describe("examples", () => {
    it("ORE to FUEL", () => {
      const input = readInput(__dirname, "small.txt");
      const net = new PetriNet(input);
      expect(Object.keys(net.places)).toEqual([
        "ORE",
        "A",
        "B",
        "C",
        "D",
        "E",
        "FUEL"
      ]);
      expect(net.transitions.length).toBe(6);
      expect(net.getCost()).toBe(31);
    });

    const cases = [
      [readInput(__dirname, "caseA.txt"), 165],
      [readInput(__dirname, "caseB.txt"), 13312],
      [readInput(__dirname, "caseC.txt"), 180697],
      [readInput(__dirname, "caseD.txt"), 2210736]
    ];

    cases.forEach(([input, expected], index) => {
      it(`case #${index + 1}`, () => {
        const net = new PetriNet(input);
        expect(net.getCost()).toBe(expected);
      });
    });
  });

  describe("part 1", () => {
    it("verify solution", () => {
      const input = readInput(__dirname);
      const net = new PetriNet(input);
      expect(net.getCost()).toBe(278404);
    });
  });

  describe("part 2", () => {
    it("verify solution", () => {
      expect(part2()).toBe(4436981);
    });
  });
});
