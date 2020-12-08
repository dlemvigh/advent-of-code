import { readInput } from "../../util"
import { part1, part2 } from "./day8";

describe("part 1", () => {
	it("sample", () => {
		const input = readInput(__dirname, "sample.txt");
		const result = part1(input);
		expect(result).toBe(5)
	})

	it("solution", () => {
		const input = readInput(__dirname);
		const result = part1(input);
		expect(result).toBe(1867)
	})
})

describe("part 1", () => {
	it("sample", () => {
		const input = readInput(__dirname, "sample.txt");
		const result = part2(input);
		expect(result).toBe(8)
	})

	it("solution", () => {
		const input = readInput(__dirname);
		const result = part2(input);
		expect(result).toBe(1303)
	})
})