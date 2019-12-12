const fs = require("fs");
const path = require("path");

const filename = path.join(__dirname, "./input.txt");

const file = fs.readFileSync(filename);

const input = file
  .toString()
  .split("\r\n")
  .map(Number);

const getInput = () => input;

const calcFuelCost = mass => Math.floor(mass / 3) - 2;
const calcFuelCostRec = mass => {
  let totalFuel = 0;
  while (mass >= 9) {
    const fuel = calcFuelCost(mass);
    totalFuel += fuel;
    mass = fuel;
  }
  return totalFuel;
};

// console.log(input);
// const result = input.map(calcFuelCost).reduce((sum, val) => sum + val, 0);
if (require.main === module) {
  const result = input.map(calcFuelCostRec).reduce((sum, val) => sum + val, 0);
  console.log("result", result);
}

module.exports = {
  calcFuelCost,
  part1: calcFuelCost,
  part2: calcFuelCostRec,
  getInput
};
