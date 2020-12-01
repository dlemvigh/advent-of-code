const {
  dealIntoNewStack,
  cut,
  dealWithIncrement,
  range,
  part1
} = require("./code");
const { readInput } = require("../../util");

describe("day 22", () => {
  describe("deal into new stack", () => {
    it("empty list", () => {
      const list = [];
      expect(dealIntoNewStack(list)).toEqual([]);
    });

    it("range 10", () => {
      const list = range(10);
      expect(dealIntoNewStack(list)).toEqual([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
    });

    it("range 10007 does not crash", () => {
      const list = range(10007);
      expect(dealIntoNewStack(list)).toHaveLength(10007);
    });
  });

  describe("cut", () => {
    it("cut 10 by 3", () => {
      const list = range(10);
      expect(cut(list, 3)).toEqual([3, 4, 5, 6, 7, 8, 9, 0, 1, 2]);
    });

    it("cut 10 by -4", () => {
      const list = range(10);
      expect(cut(list, -4)).toEqual([6, 7, 8, 9, 0, 1, 2, 3, 4, 5]);
    });

    it("cut range 10007 does not crash", () => {
      const list = range(10007);
      expect(cut(list, 5000)).toHaveLength(10007);
    });
  });

  describe("deal with increment", () => {
    it("deal 10 increment 3", () => {
      const list = range(10);
      expect(dealWithIncrement(list, 3)).toEqual([
        0,
        7,
        4,
        1,
        8,
        5,
        2,
        9,
        6,
        3
      ]);
    });

    it("deal 10007 increment 3 performance", () => {
      const list = range(10007);
      expect(dealWithIncrement(list, 3)).toHaveLength(10007);
    });

    it("deal 10007 increment 5000 performance", () => {
      const list = range(10007);
      expect(dealWithIncrement(list, 5000)).toHaveLength(10007);
    });
  });

  describe("part 1", () => {
    const cases = [
      [3, "deal into new stack", [2, 1, 0]],
      [3, "cut 1", [1, 2, 0]],
      [3, "deal with increment 2", [0, 2, 1]],
      [3, "cut 1\ndeal into new stack", [0, 2, 1]],
      [
        10,
        "deal with increment 7\ndeal into new stack\ndeal into new stack",
        [0, 3, 6, 9, 2, 5, 8, 1, 4, 7]
      ],
      [
        10,
        "cut 6\ndeal with increment 7\ndeal into new stack",
        [3, 0, 7, 4, 1, 8, 5, 2, 9, 6]
      ],
      [
        10,
        "deal with increment 7\ndeal with increment 9\ncut -2",
        [6, 3, 0, 7, 4, 1, 8, 5, 2, 9]
      ],
      [
        10,
        "deal into new stack\ncut -2\ndeal with increment 7\ncut 8\ncut -4\ndeal with increment 7\ncut 3\ndeal with increment 9\ndeal with increment 3\ncut -1",
        [9, 2, 5, 8, 1, 4, 7, 0, 3, 6]
      ]
    ];

    cases.forEach(([N, input, expected], index) => {
      it(`Case #${index + 1}`, () => {
        const list = part1(N, input);
        expect(list).toEqual(expected);
      });
    });

    it("verify solution", () => {
      const input = readInput(__dirname);
      const list = part1(10007, input);
      expect(list).toHaveLength(10007);
      expect(list.indexOf(2019)).toBe(2939);
    });
  });
});
