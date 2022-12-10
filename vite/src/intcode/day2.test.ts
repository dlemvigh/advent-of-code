import { describe, it, expect } from "vitest";
import { readInput } from "../util";
import { executeInstruction, executeProgram, Mode, Op, parseInput, parseInstruction, Program, State, stateFactory } from "./intcode";

describe("Day 2", () => {

    describe("parse instruction", () => {
        type TestCase = [number, Op, Mode[]] | [number, Op]
        const testCases: TestCase[] = [
            [99, Op.Halt],
            [1, Op.Add],
            [2, Op.Multiply],
            [3, Op.Input],
            [4, Op.Output],
            [5, Op.JumpZero],
            [6, Op.JumpNonZero],
            [7, Op.JumpLess],
            [8, Op.JumpEqual],
            [9, Op.SetRelBase],
            [0x001, Op.Add, [Mode.Position, Mode.Position, Mode.Position]],
            [11101, Op.Add, [Mode.Immediate, Mode.Immediate, Mode.Immediate]],
            [22201, Op.Add, [Mode.Relative, Mode.Relative, Mode.Relative]],
            [21001, Op.Add, [Mode.Position, Mode.Immediate, Mode.Relative]]
        ]

        testCases.forEach(([instruction, expectedOp, expectedModes], index) => {
            it(`Test case #${index + 1}`, () => {
                // act
                const [op, ...modes] = parseInstruction(instruction);

                // assert
                expect(op).toBe(expectedOp);
                if (expectedModes) {
                    expect(modes).toEqual(expectedModes)
                }
            })
        })
    })

    describe("add", () => {
        type TestCase = [Program, Program]
        const testCases: TestCase[] = [
            [[1101, 111, 222, 0], [333, 111, 222, 0]],
            [[1101, 111, 222, 1], [1101, 333, 222, 1]],
            [[1101, 111, 222, 2], [1101, 111, 333, 2]],
            [[1101, 111, 222, 3], [1101, 111, 222, 333]],
            [[1, 4, 5, 6, 111, 222], [1, 4, 5, 6, 111, 222, 333]],
            [[101, 111, 4, 5, 222], [101, 111, 4, 5, 222, 333]],
            [[1001, 4, 222, 5, 111], [1001, 4, 222, 5, 111, 333]]
        ]

        testCases.forEach(([program, expected], index) => {
            it(`Test case #${index + 1}`, () => {
                // arrange
                const state: State = stateFactory(program)

                // act
                executeInstruction(state);

                // assert
                expect(state.program).toEqual(expected);
                expect(state.ip).toBe(4);
            })
        })
    })

    describe("multiply", () => {
        type TestCase = [Program, Program]
        const testCases: TestCase[] = [
            [[1102, 111, 222, 0], [24642, 111, 222, 0]],
            [[1102, 111, 222, 1], [1102, 24642, 222, 1]],
            [[1102, 111, 222, 2], [1102, 111, 24642, 2]],
            [[1102, 111, 222, 3], [1102, 111, 222, 24642]],
            [[2, 4, 5, 6, 111, 222], [2, 4, 5, 6, 111, 222, 24642]],
            [[102, 111, 4, 5, 222], [102, 111, 4, 5, 222, 24642]],
            [[1002, 4, 222, 5, 111], [1002, 4, 222, 5, 111, 24642]]
        ]

        testCases.forEach(([program, expected], index) => {
            it(`Test case #${index + 1}`, () => {
                // arrange
                const state: State = stateFactory(program)

                // act
                executeInstruction(state);

                // assert
                expect(state.program).toEqual(expected);
                expect(state.ip).toBe(4);
            })
        })
    })

    describe("sample programs", () => {
        type TestCase = [string, string];
        const testCases: TestCase[] = [
            ["1,9,10,3,2,3,11,0,99,30,40,50", "3500,9,10,70,2,3,11,0,99,30,40,50"],
            ["1,0,0,0,99", "2,0,0,0,99"],
            ["2,3,0,3,99", "2,3,0,6,99"],
            ["2,4,4,5,99,0", "2,4,4,5,99,9801"],
            ["1,1,1,4,99,5,6,0,99", "30,1,1,4,2,5,6,0,99"],
        ]

        testCases.forEach(([inputProgram, expectedProgram],index) => {
            it(`Test case #${index + 1}`,()=>{
                const program = parseInput(inputProgram);
                const state = stateFactory(program);
                const expected = parseInput(expectedProgram);
                executeProgram(state);
                expect(state.program).toEqual(expected);
            })
        })
    })

    it("part 1", () => {
        const input = readInput(__dirname, "day2.txt");
        const program = parseInput(input);
        program[1] = 12;
        program[2] = 2
        const state = stateFactory(program);
        executeProgram(state);
        expect(state.program[0]).toEqual(3562672);
    })

    function part2(input: string) {
        const target = 19690720;
        for (let noun = 0; noun < 100; noun++) {
            for (let verb = 0; verb < 100; verb++) {
                const program = parseInput(input);
                program[1] = noun;
                program[2] = verb;
                const state = stateFactory(program);
                executeProgram(state);
                if (state.program[0] === target) {
                    return 100 * noun + verb;
                }
            }
        }

    }

    it("part 2", () => {
        const input = readInput(__dirname, "day2.txt");
        const result = part2(input);
        expect(result).toBe(8250)
    })
})