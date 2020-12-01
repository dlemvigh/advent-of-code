import { Intcode, parseProgram} from "../intcode";

describe("day 2", () => {
	describe("part 1", () => {
		it("sample 1", () => {
			const program = parseProgram("1,9,10,3,2,3,11,0,99,30,40,50");
			const intcode = new Intcode(program);
			intcode.step();
			console.log(intcode.program, intcode.isHalted)
			intcode.step();
			console.log(intcode.program, intcode.isHalted)
			intcode.step();
			console.log(intcode.program, intcode.isHalted)
		})
	})
})