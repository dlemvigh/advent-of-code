class Program {
  constructor(input = "", options = {}) {
    this.load(input);
    this.p = 0;
    this.i = 0;
    this.base = 0;
    this.options = options;
  }

  load(input) {
    this.program = input.split(",").map(Number);
  }

  run() {}

  step() {}

  read(mode) {
    switch (mode) {
      case 0:
        return this.program[this.program[this.p++]];
      case 1:
        return this.program[this.p++];
      case 2:
        return this.program[this.base + this.program[this.p++]];
    }
  }

  write(value, mode) {
    switch (mode) {
      case 2:
        this.program[this.base + this.program[p++]] = value;
        break;
      default:
        this.progra[this.program[this.p++]] = value;
        break;
    }
  }

  exec() {}
}

function parseCode(code) {
  const op = code % 100;
  const mode = [4, 2, 1].map(x => Boolean(x & Math.floor(code / 100)));
  return [op, mode];
}

module.exports = { Program };
