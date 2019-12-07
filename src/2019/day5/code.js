const { readInput } = require("../../util");

const input = readInput(__dirname, "input.txt");
// const input = "1002,4,3,4,33";
const program = input.split(",").map(Number);

runProgram(program, 1);

function runProgram(program, input) {
  let p = 0;
  let output;
  const readDirect = () => program[p++];
  const readIndirect = () => program[program[p++]];
  const read = direct => {
    console.log("  read", p, direct);
    const value = direct ? readDirect() : readIndirect();
    console.log("  =", value);
    return value;
  };

  const write = value => {
    console.log("  write", p, value);
    program[program[p++]] = value;
  };
  const parseOp = code => {
    const op = code % 100;
    const mode = [4, 2, 1].map(x => Boolean(x & Math.floor(code / 100)));
    return [op, mode];
  };

  const op_codes = {
    1: modes => {
      const a = read(modes[2]);
      const b = read(modes[1]);
      write(a + b);
    },
    2: modes => {
      const a = read(modes[2]);
      const b = read(modes[1]);
      write(a * b);
    },
    3: () => {
      write(input);
    },
    4: () => {
      output = readIndirect();
      console.log(`=== output: ${output} ===`);
    }
  };

  while (true) {
    const [op, mode] = parseOp(readDirect());
    console.log("op", op, mode);
    if (op === 99) {
      return output;
    }
    op_codes[op](mode);
  }
}
