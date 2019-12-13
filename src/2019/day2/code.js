const { readInput } = require("../../util");
const { Program } = require("../intcode2");

if (require.main === module) {
  console.log("part1", part1());
  console.log("part2", part2());
}

function part1() {
  const input = readInput(__dirname);
  const program = new Program(input);
  program.program[1] = 12;
  program.program[2] = 2;
  program.run();
  return program.program[0];
}

function part2() {
  const input = readInput(__dirname);
  const target = 19690720;

  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      const program = new Program(input);
      program.program[1] = noun;
      program.program[2] = verb;
      program.run();
      if (program.program[0] === target) {
        return 100 * noun + verb;
      }
    }
  }
}

module.exports = { part1, part2 };
