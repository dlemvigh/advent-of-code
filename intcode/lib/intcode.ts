export enum Opcode {
  Add = 1,
  Multiply = 2,
  Input = 3,
  Output = 4,
  JumpIfTrue = 5,
  JumpIfFalse = 6,
  LessThan = 7,
  Equals = 8,
  AdjustRelativeBase = 9,
  Halt = 99,
}

export enum Mode {
  Position = 0,
  Immediate = 1,
  Relative = 2,
}

export function getOpLength(opcode: Opcode): number {
  switch (opcode) {
    case Opcode.Add:
    case Opcode.Multiply:
      return 3;
    case Opcode.Input:
    case Opcode.Output:
      return 1;
    case Opcode.JumpIfTrue:
    case Opcode.JumpIfFalse:
      return 2;
    case Opcode.LessThan:
    case Opcode.Equals:
      return 3;
    case Opcode.AdjustRelativeBase:
      return 1;
    case Opcode.Halt:
    default:
      return 0;
  }
}
