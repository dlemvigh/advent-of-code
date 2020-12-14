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
				// console.log(addr, value, mask1, mask0, calced);
				
			}
			memory[addr] = calcMaskedValue(value, mask1, mask0);
		}
	})
	const sum = Object.values(memory).reduce((sum, val) => sum + val, 0);
	return sum;
}

export function part2(input: string): number {
	const memory: {[addr: number]: number} = {};
	let mask: string;
	const lines = splitIntoLines(input);
	lines.forEach(line => {
		if (rMask.test(line)) {
			mask = line;
			// console.log("mask", mask)
		} else {
			const mAssign = line.match(rAssign);
			const addr = Number(mAssign[1])
			const value = Number(mAssign[2])
			const addrs = maskAddr(mask, addr)
			addrs.forEach(x => memory[x] = value);
		}

	})
	const sum = Object.values(memory).reduce((sum, val) => sum + val, 0);
	return sum;
}

export function maskAddr(mask: string, addr: number): number[] {
	const result = [];
	const bits = addr.toString(2);
	
	const getBit = index => bits[bits.length - 1 - index] || "0";

	for (let i = 0; i < mask.length; i++) {
		const m = mask[mask.length - 1 - i];
		
		if (m === "0") result[i] = getBit(i);
		else result[i] = m;
		// console.log("it", i, m, getBit(i), "=", result[i]);
	}
	const resultMask = result.reverse().join("");

	let addrs = [0]
	for (let i = 0; i < resultMask.length; i++) {
		const bit = resultMask[resultMask.length - 1 - i];
		if (bit === "1") {
			addrs = addrs.map(addr => addr + Math.pow(2, i))
		}
		if (bit === "X") {
			addrs = [
				...addrs,
				...addrs.map(addr => addr + Math.pow(2, i))
			];
		}
	}
	return addrs;
}



