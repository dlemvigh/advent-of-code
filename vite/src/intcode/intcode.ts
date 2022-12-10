export enum Op {
    Add = 1,
    Multiply = 2,
    Input = 3,
    Output = 4,
    JumpZero = 5,
    JumpNonZero = 6,
    JumpLess = 7,
    JumpEqual = 8,
    SetRelBase = 9,
    Halt = 99
}

export enum Mode {
    Position = 0,
    Immediate = 1,
    Relative = 2   
}

export type Program = number[];
export type State = {
    program: Program,
    ip: number,
    relBase: 0,
    isHalted?: true
}

export function stateFactory(program: Program): State {
    return {
        program,
        ip: 0,
        relBase: 0,
    }
}

export function executeInstruction(state: State): State {
    const instruction = state.program[state.ip++];
    const [op, ...modes] = parseInstruction(instruction);

    switch (op) {
        case Op.Add: {
            const a = read(state, modes[0])
            const b = read(state, modes[1])
            const c = a + b;
            write(state, c, modes[2])
            break;
        }
        case Op.Multiply: {
            const a = read(state, modes[0])
            const b = read(state, modes[1])
            const c = a * b;
            write(state, c, modes[2])
            break;
        }
        case Op.Halt: {
            state.isHalted = true;
            break;
        }
    }
    return state;
}

export function executeProgram(state: State): State {
    while(!state.isHalted) {
        executeInstruction(state);
    }
    return state;
}

export function read(state: State, mode: Mode): number {
    const adr = state.program[state.ip++];
    switch(mode) {
        case Mode.Position: return state.program[adr];
        case Mode.Immediate: return adr
        case Mode.Relative: return state.program[adr + state.relBase];
        default: throw new Error(`Unknown read mode: ${mode}`)
    }
}

export function write(state: State, value: number, mode: Mode): void {
    switch(mode) {
        case Mode.Relative: state.program[state.program[state.ip++] + state.relBase] = value;
        default: state.program[state.program[state.ip++]] = value;
    }
}

export function parseInstruction(instruction: number): [Op, ...Mode[]] {
    const op: Op = instruction % 100;

    const modes: Mode[] = [
        Math.floor(instruction / 100) % 10,
        Math.floor(instruction / 1000) % 10,
        Math.floor(instruction / 10000) % 10
    ];

    return [op, ...modes];
}

export function parseInput(input: string): number[] {
    return input.split(",").map(Number)
}