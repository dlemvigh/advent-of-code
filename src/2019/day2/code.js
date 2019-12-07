const fs = require("fs");
const path = require("path");

const filename = path.join(__dirname, "./input.txt");
const file = fs.readFileSync(filename);
const input = file
  .toString()
  .split(",")
  .map(Number);

const OP_CODES = {
  1: (a, b) => a + b,
  2: (a, b) => a * b
};

function runProgram(input, noun = 12, verb = 2) {
  let index = 0;
  const program = [...input];
  program[1] = noun;
  program[2] = verb;

  while (program[index] !== 99) {
    const instr = program.slice(index, index + 4);
    // console.log("instr", instr);
    const [opCode, ai, bi, ci] = instr;
    const op = OP_CODES[opCode];
    const a = program[ai];
    const b = program[bi];
    const c = op(a, b);
    program[ci] = c;

    index += 4;
  }

  return program[0];
}

// part 1

// const result = runProgram(input);
// console.log("result", result);

// part 2

const target = 19690720;

function bruteForce() {
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      const result = runProgram(input, noun, verb);
      if (result === target) {
        return 100 * noun + verb;
      }
    }
  }
}

const times = [];
for (let i = 0; i < 50; i++) {
  const before = new Date();
  const result = bruteForce();
  const after = new Date();
  console.log("result", result);
  times.push(after - before);
}

// console.log(`timer ${after - before}ms`);
const sum = times.reduce((sum, val) => sum + val);
const avg = sum / times.length;
const stdD = Math.sqrt(
  times.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / times.length
);
console.log(`times avg=${avg.toFixed(0)}ms stdD=${stdD.toFixed(1)}ms`);
