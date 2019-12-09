function runProgram(program, inputs) {
  let i = 0;
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
    3: async () => {
      // write input => program
      const input = inputs[i++];
      write(input);
    },
    4: () => {
      // read program => output
      output = readIndirect();
      // console.log(`=== output: ${output} ===`);
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
    if (op === 99) {
      return output;
    }
    op_codes[op](mode);
  }
}

module.exports = { runProgram };
