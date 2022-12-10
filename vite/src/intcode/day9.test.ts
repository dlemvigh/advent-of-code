import { describe, it, expect } from "vitest";
import { readInput, tests } from "../util";
import { executeInstruction, executeProgram, parseInput, Program, stateFactory } from "./intcode";

describe("set relative base", () => {
    tests<[Program, number],number>(([program, relBase], expected) => {
        const state = stateFactory(program, { relBase });
        executeInstruction(state);

        expect(state.relBase).toBe(expected);
    }, [
        [[[109,123],0],123],
        [[[109,123],2000],2123],
        [[[9,2,123],0],123],
        [[[9,2,123],2000],2123],
    ])
})

describe("use relative base", () => {
    tests<[Program, number],Program>(
        ([program, relBase], expected) => {
            const state = stateFactory(program, { relBase });
            executeInstruction(state);
    
            expect(state.program).toEqual(expected);    
        }, [
            [[[2201,4,5,6,111,222],0],[2201,4,5,6,111,222,333]],
            [[[22201,4,5,6,111,222],0],[22201,4,5,6,111,222,333]],
            [[[22201,3,4,5,111,222],1],[22201,3,4,5,111,222,333]],
            [[[22201,5,6,7,111,222],-1],[22201,5,6,7,111,222,333]],
        ]
    )
})

describe("day 9", ()=>{
    describe("part 1",()=>{
        describe("samples", ()=>{
            it("quine", () => {
                // arrange 
                const program = [109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99];
                const state = stateFactory(program);

                // act
                executeProgram(state);

                // assert
                expect(state.output).toEqual([109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99])
            })

            it("16 digits", ()=>{
                // arrange 
                const program = [1102,34915192,34915192,7,4,7,99,0];
                const state = stateFactory(program);

                // act
                executeProgram(state);
                const [result] = state.output;

                // assert
                expect(result.toString()).toHaveLength(16);
                expect(result).toBe(1219070632396864);
            })

            it("output middle", ()=>{
                // arrange 
                const program = [104,1125899906842624,99];
                const state = stateFactory(program);

                // act
                executeProgram(state);

                // assert
                expect(state.output).toEqual([1125899906842624])
            })
        })

        it("input",()=>{
            // arrange
            const input = readInput(__dirname, "day9.txt");
            const program = parseInput(input);
            const state = stateFactory(program);
            state.input.push(1);

            // act
            executeProgram(state);

            // assert
            expect(state.output).toEqual([3906448201])
        })
    })

    describe("part 2", ()=>{
        it("input",()=>{
            // arrange
            const input = readInput(__dirname, "day9.txt");
            const program = parseInput(input);
            const state = stateFactory(program);
            state.input.push(2);

            // act
            executeProgram(state);

            // assert
            expect(state.output).toEqual([59785])
        })

    })
})