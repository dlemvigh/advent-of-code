import { describe, it, expect } from "vitest";
import { getAdjacent, getOrtogonallyAdjacent } from "./adjacency";

describe("get orthogonally adjacent", () => {
    type TestCase = [[number, number, number, number],[number, number][]];
    const testCases: TestCase[] = [
        [[0,0,10,10],[[0,1],[1,0]]],
        [[1,1,10,10],[[0,1],[1,0],[1,2],[2,1]]],
        [[0,1,10,10],[[0,0],[0,2],[1,1]]],
        [[1,0,10,10],[[0,0],[1,1],[2,0]]],
        [[0,0,1,1],[]],
        [[9,9,10,10],[[8,9],[9,8]]],
        [[9,5,10,10],[[8,5],[9,4],[9,6]]],
        [[5,9,10,10],[[4,9],[5,8],[6,9]]]
    ]

    testCases.forEach(([[row, col, width, height],expected], index) => {
        it(`Test case #${index + 1}`, ()=>{
            expect(getOrtogonallyAdjacent(row, col, width, height)).toEqual(expected);
        })
    })
})

describe("get adjacent", () => {
    type TestCase = [[number, number, number, number],[number, number][]];
    const testCases: TestCase[] = [
        [[0,0,10,10],[[0,1],[1,0],[1,1]]],
        [[1,1,10,10],[[0,0],[0,1],[0,2],[1,0],[1,2],[2,0],[2,1],[2,2]]],
        [[0,1,10,10],[[0,0],[0,2],[1,0],[1,1],[1,2]]],
        [[1,0,10,10],[[0,0],[0,1],[1,1],[2,0],[2,1]]],
        [[0,0,1,1],[]],
        [[9,9,10,10],[[8,8],[8,9],[9,8]]],
        [[9,5,10,10],[[8,4],[8,5],[8,6],[9,4],[9,6]]],
        [[5,9,10,10],[[4,8],[4,9],[5,8],[6,8],[6,9]]]
    ]

    testCases.forEach(([[row, col, width, height],expected], index) => {
        it(`Test case #${index + 1}`, ()=>{
            expect(getAdjacent(row, col, width, height)).toEqual(expected);
        })
    })
})