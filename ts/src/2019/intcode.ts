const leftPad = require("left-pad");

const DEBUG = true;

export enum Mode {
	Position = "0",
	Immediate = "1",
	Relative = "2"
}

export enum Op {
	Add = 1,
	Multiply,
	Input,
	Output,
	JumpIfTrue,
	JumpIfFalse,
	LessThan,
	Equals,
	SetBase,
	Halt = 99
}

export class Intcode {
	private p = 0;
	private i = 0;
	private o = 0;
	private base = 0;
	private outputs: number[] = [];
	public isWaiting = false;
	public isHalted = false;

	constructor(public program: number[] = [], public inputs = []) {
	}

	read(mode: Mode) {
		switch(mode) {
			case Mode.Position:
				return this.readPosition()
			case Mode.Immediate:
				return this.readImmediate();
			case Mode.Relative:
				return this.readRelative();
		}
	}
	readImmediate() {
		return this.program[this.p++] || 0;
	}
	readPosition() {
		return this.program[this.program[this.p++]] || 0;
	}
	readRelative() {
		return this.program[this.base + this.program[this.p]] || 0;
	}
	peek() {
		return this.program[this.p];
	}

	write(value: number, mode: Mode) {
		if (mode === Mode.Relative) {
			this.writeRelative(value);
		} else {
			this.writePosition(value);
		}
	}
	writeRelative(value: number) {
		this.program[this.base + this.program[this.p++]] = value;
	}
	writePosition(value: number) {
		this.program[this.program[this.p++]] = value;
	}

	exec(op: Op, mode: Mode[]){
		switch(op) {
			case Op.Add: {
				const a = this.read(mode[2])
				const b = this.read(mode[1]);
				this.write(a + b, mode[0]);
				if (DEBUG) { console.log("add", a, b)}
				break;
			}
			case Op.Multiply: {
				const a = this.read(mode[2])
				const b = this.read(mode[1]);
				this.write(a * b, mode[0]);
				if (DEBUG) { console.log("multi", a, b)}
				break;
			}
			case Op.Input: {
				const input = this.inputs[this.i++];
				if (DEBUG) { console.log("input", input)}
				this.write(input, mode[2]);
			}
			case Op.Output: {
				const output = this.read(mode[2]);
				if (DEBUG) { console.log("output", output)}
				this.outputs.push(output);
			}
			case Op.JumpIfTrue: {
				const value = this.read(mode[2]);
				const jump = this.read(mode[1]);
				const cond = value !== 0;
				if (cond) {
					this.p = jump;
				}	
				if (DEBUG) { console.log("jump-if-true", value, jump)}
			}
			case Op.JumpIfFalse: {
				const value = this.read(mode[2]);
				const jump = this.read(mode[1]);
				const cond = value === 0;
				if (cond) {
					this.p = jump;
				}	
				if (DEBUG) { console.log("jump-if-false", value, jump)}
			}
			case Op.LessThan: {
				const a = this.read(mode[2]);
				const b = this.read(mode[1]);
				const c = Number(a < b);
				this.write(c, mode[0]);	
				if (DEBUG) { console.log("less-than", a, b)}
			}
			case Op.Equals: {
				const a = this.read(mode[2]);
				const b = this.read(mode[1]);
				const c = Number(a === b);
				this.write(c, mode[0]);	
				if (DEBUG) { console.log("equals", a, b)}
			}
			case Op.SetBase: {
				const rel = this.read(mode[2]);
				this.base += rel;
				if (DEBUG) { console.log("set-base", rel)}
			}
			case Op.Halt: {
				if (DEBUG) { console.log("halt")}
				this.isHalted = true;
			}
		}
	}

	step() {
		const instruction = this.readImmediate();
		const [op, mode] = parseInstruction(instruction);
		this.exec(op, mode);
	}

	runTillHalted() {
		while(!this.isHalted) {
			this.step();
		}
	}

	runTillWaiting() {
		while(!this.isWaiting || !this.isHalted) {
			this.step()
		}
	}
}

export function parseProgram(input: string) {
	return input.split(",").map(Number);
}

export function parseInstruction(code): [Op, Mode[]] {
  const op = code % 100;
  const mode = leftPad(Math.floor(code / 100), 3, "0");

  return [op, mode];
}
