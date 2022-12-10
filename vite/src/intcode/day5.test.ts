import { describe, it, expect } from "vitest";
import { readInput, tests } from "../util";
import { executeInstruction, executeProgram, Input, Output, parseInput, Program, State, stateFactory } from "./intcode";

describe("Day 5", () => {

    describe("input", ()=>{
        tests<[Program, Input, number], Program>(([program, input, ip], expected) => {
                // arrange
                const state: State = stateFactory(program, input)

                // act
                executeInstruction(state);

                // assert
                expect(state.program).toEqual(expected);
                expect(state.ip).toBe(ip);
                expect(state.isPendingInput).toBe(ip === 0 || undefined)
        }, [
            [[[3, 0], [123], 2], [123, 0]],
            [[[3, 1], [123], 2], [3, 123]],
            [[[3, 2], [123], 2], [3, 2, 123]],
            [[[3, 0], [], 0], [3,0]]
        ])
    })

    describe("output", ()=>{
        tests<Program, Output>((program, expected) => {
                // arrange
                const state: State = stateFactory(program)

                // act
                executeInstruction(state);

                // assert
                expect(state.program).toEqual(program);
                expect(state.ip).toBe(2);
                expect(state.output).toEqual(expected);
        }, [
            [[4,0], [4]],
            [[4,1], [1]],
            [[4,2,123], [123]],
            [[4,3], [0]],
            [[104, 0], [0]],
            [[104, 1], [1]],
            [[104,123], [123]]
        ])
    })

    it("sample I/O", () => {
        // arrange
        const program = [3,0,4,0,99];
        const input = [123];
        const state = stateFactory(program, input);

        // act
        executeProgram(state);

        // assert
        expect(state.output).toEqual([123])
        expect(state.input).toEqual([]);
        expect(state.program).toEqual([123,0,4,0,99])
    })

    it("sample multiply mode immediate/position",()=>{
        // arrange
        const program = [1002,4,3,4,33];
        const state = stateFactory(program);

        // act
        executeProgram(state);

        // assert
        expect(state.program).toEqual([1002,4,3,4,99])
    })

    it("negative numbers", ()=>{
        const program = parseInput("1101,100,-1,4,0")
        const state = stateFactory(program);

        // act
        executeProgram(state);

        // assert
        expect(state.program).toEqual([1101,100,-1,4,99])
    })

    describe("jump non-zero", () => {
        tests<Program, number>((program, expected) => {
            // arrange 
            const state = stateFactory(program);

            // act
            executeInstruction(state);

            // assert
            expect(state.ip).toBe(expected);
        }, [
            [[1105, 0, 123], 3],
            [[1105, 1, 123], 123],
            [[1105, -1, 123], 123],
            [[5,1,0], 5],
            [[5,1,1], 1],
            [[5,1,2], 2],
            [[5,3,4,0,123], 3],
            [[5,3,4,1,123], 123],
            [[5,3,4,-1,123], 123],
            [[105,0,3,123], 3],
            [[105,1,3,123], 123],
            [[105,-1,3,123], 123],
            [[1005,3,123,0],3],
            [[1005,3,123,1],123],
            [[1005,3,123,-1],123],
        ])
    })

    describe("jump zero", () => {
        tests<Program, number>((program, expected) => {
            // arrange 
            const state = stateFactory(program);

            // act
            executeInstruction(state);

            // assert
            expect(state.ip).toBe(expected);
        }, [
            [[1106, 0, 123], 123],
            [[1106, 1, 123], 3],
            [[1106, -1, 123], 3],
            [[6,3,4,0,123], 123],
            [[6,3,4,1,123], 3],
            [[6,3,4,-1,123], 3],
            [[106,0,3,123], 123],
            [[106,1,3,123], 3],
            [[106,-1,3,123], 3],
            [[1006,3,123,0], 123],
            [[1006,3,123,1], 3],
            [[1006,3,123,-1], 3],
        ])
    })

    describe("equal", () => {
        tests<Program, Program>((program, expected) => {
            // arrange 
            const state = stateFactory(program);

            // act
            executeInstruction(state);

            // assert
            expect(state.program).toEqual(expected);
        }, [
            [[1108,0,0,4],[1108,0,0,4,1]],
            [[1108,1,1,4],[1108,1,1,4,1]],
            [[1108,-1,-1,4],[1108,-1,-1,4,1]],
            [[1108,1,-1,4],[1108,1,-1,4,0]],
            [[8,4,5,6,0,0],[8,4,5,6,0,0,1]],
            [[8,4,5,6,1,1],[8,4,5,6,1,1,1]],
            [[8,4,5,6,-1,-1],[8,4,5,6,-1,-1,1]],
            [[8,4,5,6,1,-1],[8,4,5,6,1,-1,0]],
        ])
    })

    describe("jump less", () => {
        tests<Program, Program>((program, expected) => {
            // arrange 
            const state = stateFactory(program);

            // act
            executeInstruction(state);

            // assert
            expect(state.program).toEqual(expected);
        }, [
            [[1107,1,2,4],[1107,1,2,4,1]],
            [[1107,2,1,4],[1107,2,1,4,0]],

            [[7,4,5,6,1,2],[7,4,5,6,1,2,1]],
            [[7,4,5,6,2,1],[7,4,5,6,2,1,0]],
        ])
    })

  describe("part 1", () => {
    it("input", () => {
        // arrange
        const input = readInput(__dirname, "day5.txt");
        const program = parseInput(input);
        const state = stateFactory(program, [1]);

        // act
        executeProgram(state);

        // assert
        const result = state.output[state.output.length - 1];
        expect(result).toEqual(13087969)
    });
  });

  describe("part 2", () => {
    tests<[Program, number],number>(
        ([program, input], output) => {
        // arrange
        const state = stateFactory(program, [input]);

        // act
        executeProgram(state);

        // assert
        expect(state.output).toEqual([output])
        }, [
            [[[3,9,8,9,10,9,4,9,99,-1,8],7],0],
            [[[3,9,8,9,10,9,4,9,99,-1,8],8],1],
            [[[3,9,8,9,10,9,4,9,99,-1,8],9],0],
            [[[3,9,7,9,10,9,4,9,99,-1,8],7],1],
            [[[3,9,7,9,10,9,4,9,99,-1,8],8],0],
            [[[3,3,1108,-1,8,3,4,3,99],7],0],
            [[[3,3,1108,-1,8,3,4,3,99],8],1],
            [[[3,3,1108,-1,8,3,4,3,99],9],0],
            [[[3,3,1107,-1,8,3,4,3,99],7],1],
            [[[3,3,1107,-1,8,3,4,3,99],8],0],
            [[[3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9],0],0],
            [[[3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9],-1],1],
            [[[3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9],1],1],
            [[[3,3,1105,-1,9,1101,0,0,12,4,12,99,1 ],0],0],
            [[[3,3,1105,-1,9,1101,0,0,12,4,12,99,1 ],-1],1],
            [[[3,3,1105,-1,9,1101,0,0,12,4,12,99,1 ],1],1],
            [[[3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
                1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
                999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99],7],999],
                [[[3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
                    1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
                    999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99],8],1000]
            ]
    )

    it("input", () => {
        // arrange
        const input = readInput(__dirname, "day5.txt");
        const program = parseInput(input);
        const state = stateFactory(program, [5]);

        // act
        executeProgram(state);

        // assert
        const result = state.output[state.output.length - 1];
        expect(result).toEqual(14110739)
    });
  });
});
