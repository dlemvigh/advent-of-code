const { Moon, calcAcc } = require("./code");

describe("day 12", () => {
  describe("calc accelration", () => {
    const init = [
      [-1, 0, 2],
      [2, -10, -7],
      [4, -8, 8],
      [3, 5, -1]
    ];

    const moons = init.map(pos => new Moon(...pos));

    const expectedAcc = [
      [3, -1, -1],
      [1, 3, 3],
      [-3, 1, -3],
      [-1, -3, 1]
    ];

    expectedAcc.forEach((expected, index) => {
      it(`calc acc case #${index + 1}`, () => {
        const moon = moons[index];
        const acc = calcAcc(moon, moons);
        expect(acc).toEqual(expected);
        expect(moon.pos).toEqual(init[index]);
        expect(moon.vel).toEqual([0, 0, 0]);
      });
    });

    const expectedPos = [
      [2, -1, 1],
      [3, -7, -4],
      [1, -7, 5],
      [2, 2, 0]
    ];

    expectedPos.forEach((expected, index) => {
      it(`apply acc case #${index + 1}`, () => {
        const moon = moons[index];
        const acc = expectedAcc[index];
        moon.applyAcc(acc);
        expect(moon.pos).toEqual(expected);
        expect(moon.vel).toEqual(acc);
      });
    });
  });
});
