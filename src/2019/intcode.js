const leftPad = require("left-pad");

function* runProgram(program, inputs = [], options) {
  const { debug } = options;
  program = [...program];
  let i = 0;
  let p = 0;
  let base = 0;
  let output;

  const readImmediate = () => program[p++] || 0;
  const readPosition = () => program[program[p++]] || 0;
  const readRelative = () => program[base + program[p++]] || 0;
  const read = mode => {
    switch (mode) {
      case "0":
        return readPosition();
      case "1":
        return readImmediate();
      case "2":
        return readRelative();
    }
  };
  const write = (value, mode) => {
    if (mode === "2") {
      program[base + program[p++]] = value;
    } else {
      program[program[p++]] = value;
    }
  };

  const op_codes = {
    1: mode => {
      // add
      const a = read(mode[2]);
      const b = read(mode[1]);
      write(a + b, mode[0]);
    },
    2: mode => {
      // multiply
      const a = read(mode[2]);
      const b = read(mode[1]);
      write(a * b, mode[0]);
    },
    3: mode => {
      // write input => program
      const input = inputs[i++];
      write(input, mode[2]);
    },
    4: mode => {
      // read program => output
      output = read(mode[2]);
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
      write(c, mode[0]);
    },
    8: mode => {
      // equals
      const a = read(mode[2]);
      const b = read(mode[1]);
      const c = Number(a === b);
      write(c, mode[0]);
    },
    9: mode => {
      // set relative base
      const a = read(mode[2]);
      base += a;
    }
  };

  while (true) {
    const [op, mode] = parseOp(readImmediate());
    if (debug) {
      printDebug(program, p - 1, op, mode);
    }
    if (op === 99) {
      return output;
    }
    if (op === 3) {
      const inp = yield;
      if (Array.isArray(inp)) {
        inputs.push(...inp);
      } else {
        inputs.push(inp);
      }
    }
    op_codes[op](mode);
    if (op === 4) {
      yield output;
    }
  }
}

/**
 * parse input string to a number array program
 * @param {string} input
 */
function parseProgram(input) {
  return input.split(",").map(Number);
}

function parseOp(code) {
  const op = code % 100;
  const mode = leftPad(Math.floor(code / 100), 3, "0");

  return [op, mode];
}

const CODES = {
  1: { name: "Add", len: 4 },
  2: { name: "Mult", len: 4 },
  3: { name: "SetInputAt", len: 2 },
  4: { name: "Print", len: 2 },
  5: { name: "JumpIfTrue", len: 3 },
  6: { name: "JumpifFalse", len: 3 },
  7: { name: "LessThan", len: 4 },
  8: { name: "Equals", len: 4 },
  9: { name: "SetRelBase", len: 2 },
  99: { name: "Kill", len: 1 }
};

const MODE = {
  0: "Position",
  1: "Immediate",
  2: "Relative"
};

function printDebug(program, p, op, mode, base) {
  const { name, len } = CODES[op] || { name: `raw ${program[p]}`, len: 1 };
  const args = program.slice(p + 1, p + len);

  console.log(`[${p}]: ${name} ${printArgs(args, mode, base)}`);

  function printArgs(args, mode) {
    if (args == null || mode == null || args.length === 0) return "";

    return args
      .map(
        (arg, index) =>
          `(${MODE[mode[2 - index]]} ${arg} = ${peek(mode[index], arg)})`
      )
      .join(" ");
  }

  function peek(mode, arg) {
    switch (mode) {
      case "0":
        return program[arg];
      case "1":
        return program[program[arg]];
      case "2":
        return program[base + arg];
    }
  }
}

module.exports = { runProgram, parseProgram, parseOp };
