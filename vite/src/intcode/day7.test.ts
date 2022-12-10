import { describe, it, expect } from "vitest"
import { getPermutations, readInput, tests } from "../util";
import { executeTillOutput, parseInput, Program, stateFactory } from "./intcode";

type PhaseSetting = number[];

function execute5amp(program: Program, phase: PhaseSetting, init: number) {
    const amps = phase.map(p => stateFactory(program, { input: [p] }))

    let arg = init
    amps.forEach((amp) => {
        amp.input.push(arg);
        executeTillOutput(amp)
        arg = amp.output.pop()!;
    })
    return arg;
}

function executeLOOPamp(program: Program, phase: PhaseSetting, init: number) {
    const amps = phase.map(p => stateFactory(program, { input: [p] }))

    let arg = init
    for (let i = 0; true; i++) {
        const amp = amps[i % 5]
        amp.input.push(arg);
        executeTillOutput(amp)
        if (amp.isHalted) {
            break;
        }
        arg = amp.output.pop()!;
    }
    return arg
}

function findMaxPhase(program: Program, init: number) {
    let max = -Infinity;
    let maxPhase: PhaseSetting = [];
    const permutations = getPermutations([0, 1, 2, 3, 4]);
    permutations.forEach(p => {
        const value = execute5amp(program, p, init);
        if (value > max) {
            max = value;
            maxPhase = p;
        }
    })
    return [max, maxPhase];
}

function findMaxPhaseLoop(program: Program, init: number) {
    let max = -Infinity;
    let maxPhase: PhaseSetting = [];
    const permutations = getPermutations([5,6,7,8,9]);
    permutations.forEach(p => {
        const value = executeLOOPamp(program, p, init);
        if (value > max) {
            max = value;
            maxPhase = p;
        }
    })
    return [max, maxPhase];
}

describe("Day 7", () => {

    describe("find max phase", () => {
        tests<Program, [number, PhaseSetting]>(
            (program, [expectedMax, expectedPhase]) => {
                const [max, maxPhase] = findMaxPhase(program, 0);
                expect(max).toBe(expectedMax);
                expect(maxPhase).toEqual(expectedPhase);
            }, [
                [
                    [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0],
                    [43210,[4,3,2,1,0]]
                ], [
                    [3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0],
                    [54321,[0,1,2,3,4]]
                ], [
                    [3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0],
                    [65210,[1,0,4,3,2]]
                ]
            ]
        )
    })

    it("part 1", ()=> {
        const input = readInput(__dirname, "day7.txt");
        const program = parseInput(input);
        const [max] = findMaxPhase(program, 0);
        expect(max).toBe(79723);
    })

    describe("find max phase loop", ()=>{
        tests<Program, [number, PhaseSetting]>(
            (program, [expectedMax, expectedPhase]) => {
                const [max, maxPhase] = findMaxPhaseLoop(program, 0);
                expect(max).toBe(expectedMax);
                expect(maxPhase).toEqual(expectedPhase);
            }, [
                [
                    [3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,
                        27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5],
                    [139629729,[9,8,7,6,5]]
                ], [
                    [3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,
                        -5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,
                        53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10],
                        [18216,[9,7,8,5,6]]
                ]
            ]
        )
      
    })


    it("part 2", ()=> {
        const input = readInput(__dirname, "day7.txt");
        const program = parseInput(input);
        const [max] = findMaxPhaseLoop(program, 0);
        expect(max).toBe(70602018);
    })
})