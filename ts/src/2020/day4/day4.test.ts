import { validateLine, validateAll, validateFile, ALL_KEYS, range, validateFileWithRules, rules, Keys } from "./day4";
import { readInput } from "../../util";
import { ALL } from "dns";

describe("part 1", () => {
	describe("validates lines", () => {
		type Case= [string, boolean];		
		const cases: Case[] = [
			["", false],
			["foo:1", false],
			["bar:2", false],
			["foo:1 bar:2", true],
			["foo:1 bar:2 baz:3", true]
		];
		const req_keys = ["foo", "bar"]
		cases.forEach(([input, expected]) => {
			it(`${input || "(empty)"} should be ${expected}`, () => {
				expect(validateLine(input, req_keys)).toBe(expected);
			})
		});

	})
	it("validate all", () => {
		const input = `
foo:1
bar:2
foo:1 bar:2
foo:1 bar:2 baz:3
`;
		const req_keys = ["foo", "bar"]

		expect(validateAll(input, req_keys)).toBe(2);
	})

	it("solution", () => {
		const input = readInput(__dirname);
		expect(validateFile(input, ALL_KEYS)).toBe(226);
	});

})

describe("part 2", () => {
	describe("rules", () => {
		describe("range", ()=> {
			type Case = [string, number, number, boolean];
			const cases: Case[] = [
				["42", 40, 50, true],
				["0", 40, 50, false],
				["100", 40, 50, false],
				["40", 40, 50, true],
				["50", 40, 50, true],
			];
			cases.forEach(([input, min, max, expected]) => {
				it(`${min} <= ${input} <= ${max}`, () => {
					expect(range(input, min, max)).toBe(expected);
				})
			})
		})

		describe("birth year", () => {
			const cases: [string, boolean][] = [["1910", false], ["1920", true], ["1950", true], ["2002", true], ["2020", false]];
			cases.forEach(([input, expected]) => {
				it(`${input} should be ${expected ? "valid" : "invalid"}`, () => {
					expect(rules[Keys.BirthYear](input)).toBe(expected);
				})
			});
		});

		describe("height", () => {
			const cases: [string, boolean][] = [
				["149cm", false],
				["150cm", true],
				["175cm", true],
				["193cm", true],
				["194cm", false],
				["58in", false],
				["59in", true],
				["69in", true],
				["76in", true],
				["77in", false]
			];

			cases.forEach(([input, expected]) => {
				it(`${input} should be ${expected ? "valid" : "invalid"}`, () => {
					expect(rules[Keys.Height](input)).toBe(expected)
				})
			})
		})

		describe("eye color", () => {
			const valid: string[] = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth", "amb\r", "  blu", "brn   ", "\ngrn\n"]
			const invalid: string[] = ["ambb", "bl", "xasdf"];

			valid.forEach(x => {
				it(x, () => {
					expect(rules[Keys.EyeColor](x)).toBe(true)
				})
			});

			invalid.forEach(x => {
				it(x, () => {
					expect(rules[Keys.EyeColor](x)).toBe(false)
				})
			});
		})
	
		describe("passport", () => {
			const valid = ["123456789", "000000000", "000000001"];
			const invalid = ["1234567890", "0123456789", ""];

			valid.forEach(x => {
				it(x, () => expect(rules[Keys.PassportID](x)).toBe(true))
			})
			invalid.forEach(x => {
				it(x, () => expect(rules[Keys.PassportID](x)).toBe(false))
			})
		})
	})

	it("invalid samples", ()=> {
		const input = readInput(__dirname, "invalid.txt");
		expect(validateFileWithRules(input)).toBe(0);
	})

	it("valid samples", ()=> {
		const input = readInput(__dirname, "valid.txt");
		expect(validateFileWithRules(input)).toBe(4);
	})

	it("solution", ()=> {
		const input = readInput(__dirname);
		expect(validateFileWithRules(input)).toBe(160);
	})
	// 161 too high
})

