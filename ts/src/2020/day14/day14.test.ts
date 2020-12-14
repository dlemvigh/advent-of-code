import { readInput } from "../../util";
import { applyMask, part1 } from "./day14";

describe("part 1", ()=>{
	it("example 1", ()=>{
		const mask = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X";
			expect(applyMask(mask, 11)).toBe(73)
			expect(applyMask(mask, 101)).toBe(101)
			expect(applyMask(mask, 0)).toBe(64)
	})

	it("sample", ()=>{
		const input = readInput(__dirname, "sample.txt");
		const res = part1(input);
		expect(res).toBe(165)
	})
	it("solution", ()=>{
		const input = readInput(__dirname);
		const res = part1(input);
		expect(res).toBe(165)
	})
})