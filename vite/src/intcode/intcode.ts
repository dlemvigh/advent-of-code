export enum Op {
    Add = 1,
    Multiply = 2,
    Input = 3,
    Output = 4,
    JumpNonZero = 5,
    JumpZero = 6,
    LessThan = 7,
    Equal = 8,
    SetRelBase = 9,
    Halt = 99
}

export enum Mode {
    Position = 0,
    Immediate = 1,
    Relative = 2   
}

export type Program = number[];
export type Input = number[];
export type Output = number[];
export type State = {
    program: Program,
    ip: number,
    relBase: number,
    isPendingInput?: boolean,
    isHalted?: true,
    input: Input,
    output: Output
}

export function stateFactory(program: Program, state: Partial<Omit<State, "program">> = {}): State {
    return {
        ip: 0,
        relBase: 0,
        input: [],
        output: [],
        ...state,
        program: [...program],
    }
}

export function executeInstruction(state: State): State {
    const instruction = state.program[state.ip++];
    const [op, ...modes] = parseInstruction(instruction);

    switch (op) {
        case Op.Add: 
            const a = read(state, modes[0])
            const b = read(state, modes[1])
            const c = a + b;
            write(state, c, modes[2])
            break;
        case Op.Multiply: {
            const a = read(state, modes[0])
            const b = read(state, modes[1])
            const c = a * b;
            write(state, c, modes[2])
            break;
        }
        case Op.Input: {
            if (state.input && state.input.length > 0) {
                const value = state.input.shift();
                write(state, value!, modes[0]);
            } else {
                state.isPendingInput = true;
                state.ip--;
            }
            break;
        }
        case Op.Output: {
            const value = read(state, modes[0]);
            state.output.push(value);
            break;
        }
        case Op.JumpNonZero: {
            const value = read(state, modes[0]);
            const adr = read(state, modes[1]);
            if (value != 0) {
                state.ip = adr;
            }
            break;
        }
        case Op.JumpZero: {
            const value = read(state, modes[0]);
            const adr = read(state, modes[1]);
            if (value == 0) {
                state.ip = adr;
            }
            break;
        }
        case Op.LessThan: {
            const a = read(state, modes[0])
            const b = read(state, modes[1])
            const value = +(a < b);
            write(state, value, modes[2]);
            break;
        }
        case Op.Equal: {
            const a = read(state, modes[0])
            const b = read(state, modes[1])
            const value = +(a == b);
            write(state, value, modes[2]);
            break;
        }
        case Op.SetRelBase: {
            const value = read(state, modes[0]);
            state.relBase += value;
            break;
        }
        case Op.Halt: {
            state.isHalted = true;
            break;
        }
    }
    return state;
}

export function executeTillHalt(state: State): State {
    while(!state.isHalted) {
        executeInstruction(state);
    }
    return state;
}

export function executeTillOutput(state: State): State {
    while(!state.isHalted && !state.output?.length) {
        executeInstruction(state);
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
        case Mode.Position: return state.program[adr] ?? 0;
        case Mode.Immediate: return adr
        case Mode.Relative: return state.program[adr + state.relBase] ?? 0;
        default: throw new Error(`Unknown read mode: ${mode}`)
    }
}

export function write(state: State, value: number, mode: Mode): void {
    const adr = state.program[state.ip++];
    switch(mode) {
        case Mode.Relative: 
            state.program[adr + state.relBase] = value;
            break;
        default: 
            state.program[adr] = value;
            break;
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