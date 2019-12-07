const { readInput } = require("../../util");

const input = readInput(__dirname, "input.txt");
const value = 5;
// const input = "3,9,8,9,10,9,4,9,99,-1,8";
// const input = "3,9,7,9,10,9,4,9,99,-1,8";
// const input = "3,3,1108,-1,8,3,4,3,99";
// const input = "3,3,1107,-1,8,3,4,3,99";
const program = input.split(",").map(Number);

runProgram(program, value);

function runProgram(program, input) {
  let p = 0;
  let output;
  const readDirect = () => program[p++];
  const readIndirect = () => program[program[p++]];
  const read = direct => {
    // console.log("  read", p, direct);
    const value = direct ? readDirect() : readIndirect();
    // console.log("  =", value);
    return value;
  };

  const write = value => {
    // console.log("  write", p, value);
    program[program[p++]] = value;
  };
  const parseOp = code => {
    const op = code % 100;
    const mode = [4, 2, 1].map(x => Boolean(x & Math.floor(code / 100)));
    return [op, mode];
  };

  const op_codes = {
    1: mode => {
      // add
      const a = read(mode[2]);
      const b = read(mode[1]);
      write(a + b);
    },
    2: mode => {
      // multiply
      const a = read(mode[2]);
      const b = read(mode[1]);
      write(a * b);
    },
    3: () => {
      // write input => program
      write(input);
    },
    4: () => {
      // read program => output
      output = readIndirect();
      console.log(`=== output: ${output} ===`);
    },
    5: mode => {
      // jump if true
      const value = read(mode[2]);
      const jump = read(mode[1]);
      const cond = value !== 0;
      if (cond) {
        p = jump;
      }
    },
    6: mode => {
      // jump if false
      const value = read(mode[2]);
      const jump = read(mode[1]);
      const cond = value === 0;
      if (cond) {
        p = jump;
      }
    },
    7: mode => {
      // equals
      const a = read(mode[2]);
      const b = read(mode[1]);
      const c = Number(a < b);
      write(c);
    },
    8: mode => {
      // equals
      const a = read(mode[2]);
      const b = read(mode[1]);
      const c = Number(a === b);
      write(c);
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
