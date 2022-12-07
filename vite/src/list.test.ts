import { describe, expect, it } from "vitest";
import { quicksort } from "./list";

describe("quicksort", ()=> {
    type TestCase = [number[], number[]];
    const test_cases: TestCase[] = [
        [[3,2,1,6,5,4], [1,2,3,4,5,6]]
    ]

    test_cases.forEach(([list, expected]) => {
        it(`sort [${list.join(", ")}}`, ()=>{
            expect(quicksort(list)).toEqual(expected);
        })
    })
})
