const { readInput } = require("../../util");
const { MapGraph, Map, Graph, part1 } = require("./code");

describe("day 18", () => {
  const names = ["small", "small2", "caseA", "caseB", "caseC"];
  const inputs = {};
  names.forEach((name, index) => {
    const input = readInput(__dirname, `cases/${name}.txt`);
    inputs[name] = input;
    inputs[index] = input;
  });
  describe("Map", () => {
    describe("get keys", () => {
      const cases = [
        "ab",
        "abcdef",
        "abcdefg",
        "abcdefghijklmnop",
        "abcdefghi"
      ];

      names.forEach((name, index) => {
        it(`get keys #${index + 1}`, () => {
          const map = new Map(inputs[name]);
          expect(map.keys.join("")).toEqual(cases[index]);
        });
      });
    });

    describe("find node", () => {
      const map = new Map(inputs.small);
      const cases = [
        ["@", 5, 1],
        ["a", 7, 1],
        ["b", 1, 1],
        ["A", 3, 1]
      ];
      cases.forEach(([node, x, y]) => {
        it(`find ${node} = [${x}, ${y}]`, () => {
          expect(map.findNode(node)).toEqual([x, y]);
        });
      });
    });
  });

  describe("Graph", () => {
    const cases = [
      [
        { "@": 0, a: 2, b: 4 },
        { "@": [], a: [], b: ["A"] }
      ],
      [
        { "@": 0, a: 2, b: 4, c: 6, d: 30, e: 8, f: 14 },
        {
          "@": [],
          a: [],
          b: ["A"],
          c: ["B"],
          d: ["B"],
          e: ["A", "C"],
          f: ["A", "C", "D", "E"]
        }
      ]
    ];
    cases.forEach(([dists, locks], index) => {
      const input = inputs[index];
      const map = new Map(input);
      const g = new MapGraph(map, "@");
      it("dists", () => {
        expect(g.dists).toEqual(dists);
      });
      it("locks", () => {
        expect(g.locks).toEqual(locks);
      });
    });
  });

  describe("part 1", () => {
    const cases = [
      [inputs.small, 8],
      [inputs.small2, 86],
      [inputs.caseA, 132],
      [inputs.caseB, 136],
      [inputs.caseC, 81]
    ];

    cases.forEach(([input, expected], index) => {
      it.skip(`Case #${index + 1}`, () => {
        const best = part1(input);
        expect(best).toBe(expected);
      });
    });

    it.skip("verify solution", () => {
      part1();
    });
  });
});

function zip(listA, listB) {
  return Array.from(zipGen(listA, listB));
}

function* zipGen(listA, listB) {
  for (let i = 0; i < listA.length && i < listB.length; i++) {
    yield [listA[i], listB[i]];
  }
}
