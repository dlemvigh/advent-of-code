export enum Keys {
	BirthYear = "byr",
	IssueYear = "iyr",
	ExpirationYear = "eyr",
	Height= "hgt",
	HairColor = "hcl",
	EyeColor = "ecl",
	PassportID = "pid",
	// CountryID = "cid"
}

type Rules = {
	[key in Keys]: (value: string) => boolean
}

export const ALL_KEYS = Object.values(Keys);

export function validateLine(line: string, required_keys: string[]): boolean {
	const pairs = line.split(" ").map(token => token.split(":"));
	return required_keys.every(req_key => 
		pairs.some(([key, _value]) => 
			req_key === key
		)
	);
}

export function validateAll(input: string, required_keys: string[]) {
	const lines = input.split("\n");
	const validCount = lines.filter(line => validateLine(line, required_keys)).length;
	return validCount;
}

export function validateFile(input: string, required_keys: string[]) {
	const lines = input.split(/\n(\r)?\n/).map(line => line.split("\n").join(" "));
	const validCount = lines.filter(line => validateLine(line, required_keys)).length;
	return validCount;
}

export function range(input: string, min: number, max: number) {
	const value = Number(input)
	return min <= value && value <= max;
}

export function height(input: string) {
	const match = input.match(/(\d+)(in|cm)/);
	if (match == null) return false;
	const [_, value, unit] = match;
	if (unit === "cm") { return range(value, 150, 193); }
	if (unit === "in") { return range(value, 59, 76); }
	return false;
}

export function oneOf(input: string, options: string[]) {
	// console.log("input", input, options)
	return options.some(x => input.trim() === x);
}

export function color(input: string) {
	return /#[0-9a-f]{6}/i.test(input);
}

export function passport(input: string) {
	return /^\d{9}$/.test(input.trim());
}

export const rules: Rules = {
	byr: x => range(x, 1920, 2002),
	iyr: x => range(x, 2010, 2020),
	eyr: x => range(x, 2020, 2030),
	hgt: height,
	hcl: color,
	ecl: x => oneOf(x, ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]),
	pid: passport
}

export function validateLineWithRules(input: string) {
	if (validateLine(input, ALL_KEYS) == false) {
		return false;
	}
	const pairs = input.split(" ").map(token => token.split(":"));
	return pairs.every(([key, value]) => {
		if (key === "cid") return true;
		const rule = rules[key];
		const isValid = rule(value)
		return isValid;
	})
}

export function validateFileWithRules(input: string) {
	const lines = input.split(/\n(\r)?\n/).map(line => line.split("\n").join(" "));
	const validCount = lines.filter(validateLineWithRules).length;
	return validCount;
}