import { splitIntoLines } from "../../util";
import { sub, and, or} from "bignum";

export function applyMask(mask: string, value: number) {
	const [mask1, mask0] = parseMask(mask);
	
	return calcMaskedValue(value, mask1, mask0)
}

function calcMaskedValue(value: number, mask1: number, mask0: number){
	return sub(or(value, mask1), and(value, mask0)).toNumber();
}

export function parseMask(mask: string): [number, number] {
	const mask1 = mask.replace(/[^1]/g, "0");
	const mask0 = mask.replace(/./g, s => s === "0" ? "1" : "0")
	return [parseInt(mask1, 2), parseInt(mask0, 2)]
}

const rMask = /^mask = ([01X]+)$/;
const rAssign = /^mem\[(\d+)] = (\d+)$/;

export function part1(input: string): number {
	const memory: {[addr: number]: number} = {};

	const lines = splitIntoLines(input);
	let mask0, mask1;
	lines.forEach(line => {
		const mMask = line.match(rMask);
		if(mMask) {
			[mask1, mask0] = parseMask(mMask[1]);
			// console.log("masks", mask1, mask0)
		}
		const mAssign = line.match(rAssign);
		if (mAssign) {
			const addr = Number(mAssign[1])
			const value = Number(mAssign[2])
			// console.log("assign", addr, value);
			const calced = calcMaskedValue(value, mask1, mask0)
			if (addr === 34) {
				console.log(addr, value, mask1, mask0, calced);
				
			}
			memory[addr] = calcMaskedValue(value, mask1, mask0);
		}
	})
	const sum = Object.values(memory).reduce((sum, val) => sum + val, 0);
	return sum;
}