const { readInput } = require("../../util");

class Moon {
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} z
   */
  constructor(x, y, z) {
    /** @type {[number, number, number]} */
    this.pos = [x, y, z];
    /** @type {[number, number, number]} */
    this.vel = [0, 0, 0];
  }

  applyAcc(acc) {
    acc.forEach((a, i) => {
      this.vel[i] += a;
      this.pos[i] += this.vel[i];
    });
  }

  pot() {
    return absoluteSum(this.pos);
  }

  kin() {
    return absoluteSum(this.vel);
  }
}

/**
 * @param {Moon} self
 * @param {Moon[]} all
 */
function calcAcc(self, all) {
  const acc = self.pos.map((val, idx) => {
    const less = all.filter(other => other.pos[idx] < val);
    const more = all.filter(other => other.pos[idx] > val);
    // console.log("idx", idx, less.length, more.length);
    return more.length - less.length;
  });

  return acc;
}

/**
 * calculate the total energy in the system.
 * sum of total energy for each moon, which is potential engery times kinetic energy.
 * @param {Moon[]} moons
 */
function calcTotalEnergy(moons) {
  const energy = moons.map(moon => moon.pot() * moon.kin());
  return energy.reduce((a, b) => a + b);
}

function absoluteSum(values) {
  return values.reduce((sum, value) => sum + Math.abs(value), 0);
}

if (require.main === module) {
  const input = readInput(__dirname, "input.txt");
  part1(input, 1000);
}

/**
 * solution to part 1
 * @param {string} input
 */
function part1(input, steps) {
  const moons = parseInput(input);

  for (let step = 1; step <= steps; step++) {
    simulateStep(moons);
    // console.log(`After ${step} step`);
    // console.log(moons);
  }
  const energy = calcTotalEnergy(moons);
  console.log("result", energy);
}

/**
 * simulate physics for 1 step
 * calculates acceleration for all moons, before applying velocity and position changes
 * @param {Moon[]} moons
 */
function simulateStep(moons) {
  const accAll = moons.map(moon => calcAcc(moon, moons));
  moons.forEach((moon, idx) => {
    const acc = accAll[idx];
    moon.applyAcc(acc);
  });
}

function parseInput(input) {
  return input.split("\r\n").map(line => {
    const match = line.match(/x=(-?\d+), y=(-?\d+), z=(-?\d+)/);
    const pos = match.slice(1).map(Number);
    return new Moon(...pos);
  });
}

module.exports = { Moon, calcAcc };
