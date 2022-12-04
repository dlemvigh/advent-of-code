import { describe, expect, it, test } from "vitest";
import { readInput } from "../util";
import { CleanRangePair, hasOverlap, isFullyContained, parseLine, part1, part2 } from "./day4";



describe("day 4", ()=>{
    describe("parse line", ()=>{
        type TestCase = [string, CleanRangePair];
        const testCases: TestCase[] = [
            ["1-2,3-4", [[1, 2], [3, 4]]],
            ["12-34,56-78", [[12, 34], [56, 78]]],
        ]
        testCases.forEach(([input, expected]) =>{
            it(input, ()=>{
                expect(parseLine(input)).toEqual(expected)
            })
        })
    })

    describe("is fully contained",()=>{
        type TestCase = [CleanRangePair, boolean];
        const testCases: TestCase[] = [
            [[[1,2],[3,4]], false],
            [[[3,4],[1,2]], false],
            [[[1,4],[2,3]], true],
            [[[2,3],[1,4]], true],
            [[[1,1],[1,1]], true],
            [[[1,123],[1,123]], true],
            [[[12,45],[23,34]], true],
            [[[1,3],[2,4]], false],
            [[[1,3],[0,2]], false]
        ]
        testCases.forEach(([pair, expected])=>{
            it(JSON.stringify(pair),()=>{
                expect(isFullyContained(pair)).toBe(expected)
            })
        })
    })

    describe("has overlap",()=>{
        type TestCase = [CleanRangePair, boolean];
        const testCases: TestCase[] = [
            [[[1,2],[3,4]], false],
            [[[3,4],[1,2]], false],
            [[[1,4],[2,3]], true],
            [[[2,3],[1,4]], true],
            [[[1,1],[1,1]], true],
            [[[1,123],[1,123]], true],
            [[[12,45],[23,34]], true],
            [[[1,3],[2,4]], true],
            [[[1,3],[0,2]], true],

            [[[1,3],[1,1]], true],
            [[[1,3],[3,3]], true],
            [[[1,1],[1,3]], true],
            [[[3,3],[1,3]], true],
        ]
        testCases.forEach(([pair, expected])=>{
            it(JSON.stringify(pair),()=>{
                expect(hasOverlap(pair)).toBe(expected)
            })
        })
    })

    describe("part 1",()=>{
        it("sample",()=>{
            const sample = `2-4,6-8
                2-3,4-5
                5-7,7-9
                2-8,3-7
                6-6,4-6
                2-6,4-8`;
            expect(part1(sample)).toBe(2)
        });
        it("input",()=>{
            const input = readInput(__dirname, "input.txt");
            expect(part1(input)).toBe(518)
        })
    })

    describe("part 2",()=>{
        it("sample",()=>{
            const sample = `2-4,6-8
                2-3,4-5
                5-7,7-9
                2-8,3-7
                6-6,4-6
                2-6,4-8`;
            expect(part2(sample)).toBe(4)
        });
        it("input",()=>{
            const input = readInput(__dirname, "input.txt");
            expect(part2(input)).toBe(909)
        })
    })
})