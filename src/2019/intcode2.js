const leftPad = require("left-pad");

class Program {
  constructor(input = "", options = {}) {
    this.load(input);
    this.p = 0;
    this.i = 0;
    this.base = 0;
    this.options = options;
    this.done = false;
    this.inputStream = new Stream();
    this.outputStream = new Stream();
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
      case 3: {
        const a = this.inputStream.take();
        this.write(a, mode[2]);
        break;
      }
      case 4: {
        const output = this.read(mode[2]);
        this.outputStream.put(output);
        break;
      }
      case 5: {
        // jump if true
        const value = this.read(mode[2]);
        const jump = this.read(mode[1]);
        const cond = value !== 0;
        if (cond) {
          this.p = jump;
        }
        break;
      }
      case 6: {
        // jump if false
        const value = this.read(mode[2]);
        const jump = this.read(mode[1]);
        const cond = value === 0;
        if (cond) {
          this.p = jump;
        }
        break;
      }
      case 7: {
        // equals
        const a = this.read(mode[2]);
        const b = this.read(mode[1]);
        const c = Number(a < b);
        this.write(c, mode[0]);
        break;
      }
      case 8: {
        // equals
        const a = this.read(mode[2]);
        const b = this.read(mode[1]);
        const c = Number(a === b);
        this.write(c, mode[0]);
        break;
      }
      case 99:
        this.done = true;
        break;
      default:
        throw "unknown command";
    }
    // 9: mode => {
    // 	// set relative base
    // 	const a = read(mode[2]);
    // 	base += a;
    // }
  }
}

class Stream {
  constructor(values = []) {
    this.values = values;
    this.index = 0;
  }

  put(value) {
    this.values.push(value);
  }

  take() {
    return this.values[this.index++];
  }

  last() {
    return this.values[this.values.length - 1];
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

module.exports = { Program, Stream };
