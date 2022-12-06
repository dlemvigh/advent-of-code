import { describe, expect, it } from "vitest";
import { readInput } from "../util";
import { indexOfUniqueSubstring, isUnique, part1, part2 } from "./day6";

describe("Day 6",() => {
    describe("is unique",()=>{
        type TestCase = [string, boolean];
        const testCases: TestCase[] = [
            ["a", true],
            ["aa", false],
            ["abc", true],
            ["abca", false],
            ["abcdefghijklmnopqrstuvwxyz", true]
        ]

        testCases.forEach(([input, expected])=>{
            it(input, ()=>{
                expect(isUnique(input)).toBe(expected);
            })
        })
    })

    describe("index of unique substring", ()=>{
        type TestCase = [string, number, number] // input, length, expectedIndex
        const testCases: TestCase[] = [
            ["", 0, 0],
            ["abc", 0, 0],
            ["a", 1, 0],
            ["abc", 1, 0],
            ["aa", 2, -1],
            ["abc", 2, 0],
            ["aabbcc", 2, 1],
            ["abc", 3, 0],
            ["aabbcc", 3, -1],
            ["aabbccde", 3, 5],
            ["abcdefghijklmnopqrstuvwxyz", 25, 0],
            ["abcdefghijklmnopqrstuvwxyz", 26, 0],
            ["abcdefghijklmnopqrstuvwxyz", 27, -1]
        ]

        testCases.forEach(([input, length, expected])=>{
            it(input, ()=>{
                expect(indexOfUniqueSubstring(input, length)).toBe(expected);
            })
        })
    })

    describe("part 1",()=>{
        describe("samples",()=>{
            type TestCase = [string, number]
            const testCases: TestCase[] = [
                ["mjqjpqmgbljsphdztnvjfqwrcgsmlb", 7],
                ["bvwbjplbgvbhsrlpgdmjqwftvncz", 5],
                ["nppdvjthqldpwncqszvftbrmjlhg", 6],
                ["nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 10],
                ["zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 11]
            ]

            testCases.forEach(([input, expected])=>{
                it(input, ()=>{
                    expect(part1(input)).toBe(expected);
                })
            })
        })
        it("input",()=>{
            // arrange
            const sample = readInput(__dirname, "input.txt");
            // act
            const result = part1(sample);
            // assert
            expect(result).toBe(1287);
        })
    })

    describe("part 2",()=>{
        describe("samples",()=>{
            type TestCase = [string, number]
            const testCases: TestCase[] = [
                ["mjqjpqmgbljsphdztnvjfqwrcgsmlb", 19],
                ["bvwbjplbgvbhsrlpgdmjqwftvncz", 23],
                ["nppdvjthqldpwncqszvftbrmjlhg", 23],
                ["nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 29],
                ["zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 26]
            ]

            testCases.forEach(([input, expected])=>{
                it(input, ()=>{
                    expect(part2(input)).toBe(expected);
                })
            })
        })
        it("input",()=>{
            // arrange
            const sample = readInput(__dirname, "input.txt");
            // act
            const result = part2(sample);
            // assert
            expect(result).toBe(3716);
        })
    })
})