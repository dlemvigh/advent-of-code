import { splitIntoLines } from "../../util";

export function part1(input: string): number {
	let acc = 0;
	let i = 0;
	const visited = [];
	const instructions = {
		nop: () => i++,
		acc: (val: number) => {
			acc += val;
			i++;
		},
		jmp: (val: number) => {
			i += val;
		}
	}

	function step() {
		visited[i] = true;
		const [op, value] = lines[i];
		instructions[op](value);
	}

	const lines = splitIntoLines(input).map(parseLine)

	while(visited[i] !== true) {
		step();
	}
	// console.log(visited.filter((x, i) => x && lines[i][0] !== "acc" ).length)
	
	return acc;
}

function parseLine(input: string): [string, number] {
	const [op, val] = input.split(" ")
	return [op, Number(val)];
}

export function part2(input: string): number {
	let acc = 0;
	let i = 0;
	const visited = [];
	const instructions = {
		nop: () => i++,
		acc: (val: number) => {
			acc += val;
			i++;
		},
		jmp: (val: number) => {
			i += val;
		}
	}

	function step() {
		visited[i] = true;
		const [op, value] = lines[i];
		instructions[op](value);
	}

	const lines = splitIntoLines(input).map(parseLine)

	while(visited[i] !== true) {
		step();
	}
	const candidates = visited.map((x, i) => x && lines[i][0] !== "acc" )

	for (const c in candidates) {
		const res = part2run(lines, Number(c));
		if (res !== null) {
			return res;
		}
	}
	// TODO change candidates
	// TODO run
}

export function part2run(lines: [string, number][], inverted: number): number | null {
	// console.log("try", inverted)
	let acc = 0;
	let i = 0;
	const visited = [];
	const instructions = {
		nop: () => i++,
		acc: (val: number) => {
			acc += val;
			i++;
		},
		jmp: (val: number) => {
			i += val;
		}
	}

	function step() {
		visited[i] = true;		
		let [op, value] = lines[i];
		if (i === inverted) {
			if (op === "nop") op = "jmp";
			else if (op === "jmp") op = "nop";
		}
		instructions[op](value);
	}

	while(visited[i] !== true) {
		if (i === lines.length) {
			return acc;
		}
		step();
	}
	
	return null;
}
