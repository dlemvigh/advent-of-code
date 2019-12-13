const leftPad = require("left-pad");

class Program {
  constructor(input = "", options = {}) {
    this.load(input);
    this.p = 0;
    this.i = 0;
    this.base = 0;
    this.options = options;
    this.done = false;
  }

  load(input) {
    this.program = input.split(",").map(Number);
  }

  async run() {
    while (!this.done) {
      this.step();
    }
  }

  step() {
    const code = this.read();
    const [op, mode] = parseCode(code);
    if (this.options.debug) {
      printDebug(this.program, this.p - 1, op, mode, this.base);
    }
    this.exec(op, mode);
  }

  read(mode) {
    switch (mode) {
      case "2": // relative mode
        return this.program[this.base + this.program[this.p++]];
      case "0": // position mode
        return this.program[this.program[this.p++]];
      default:
      case "1": // immediate mode
        return this.program[this.p++];
    }
  }

  write(value, mode) {
    switch (mode) {
      case "2":
        this.program[this.base + this.program[p++]] = value;
        break;
      default:
        this.program[this.program[this.p++]] = value;
        break;
    }
  }

  exec(op, mode) {
    switch (op) {
      case 1: {
        // add
        const a = this.read(mode[2]);
        const b = this.read(mode[1]);
        this.write(a + b, mode[0]);
        break;
      }
      case 2: {
        // multiply
        const a = this.read(mode[2]);
        const b = this.read(mode[1]);
        this.write(a * b, mode[0]);
        break;
      }
      case 99:
        this.done = true;
        break;
    }
    // 3: mode => {
    // 	// write input => program
    // 	const input = inputs[i++];
    // 	write(input, mode[2]);
    // },
    // 4: mode => {
    // 	// read program => output
    // 	output = read(mode[2]);
    // 	// console.log(`=== output: ${output} ===`);
    // },
    // 5: mode => {
    // 	// jump if true
    // 	const value = read(mode[2]);
    // 	const jump = read(mode[1]);
    // 	const cond = value !== 0;
    // 	if (cond) {
    // 		p = jump;
    // 	}
    // },
    // 6: mode => {
    // 	// jump if false
    // 	const value = read(mode[2]);
    // 	const jump = read(mode[1]);
    // 	const cond = value === 0;
    // 	if (cond) {
    // 		p = jump;
    // 	}
    // },
    // 7: mode => {
    // 	// equals
    // 	const a = read(mode[2]);
    // 	const b = read(mode[1]);
    // 	const c = Number(a < b);
    // 	write(c, mode[0]);
    // },
    // 8: mode => {
    // 	// equals
    // 	const a = read(mode[2]);
    // 	const b = read(mode[1]);
    // 	const c = Number(a === b);
    // 	write(c, mode[0]);
    // },
    // 9: mode => {
    // 	// set relative base
    // 	const a = read(mode[2]);
    // 	base += a;
    // }
  }
}

function parseCode(code) {
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

module.exports = { Program };
