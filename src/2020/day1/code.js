function part1(input, target = 2020) {
	const values = input.split("\n").map(Number);
	values.sort();
	// console.log(values);
	let i = 0, j = values.length - 1;
	// do {
	while(true) {
		// loop
		if (i === j) { 
			//break 
		}
		const value = values[i] + values[j];
		if(value === target) {
			return [values[i], values[j], values[i] * values[j]];
		}
		if (value < target) {
			i++;
		} else {
			j--;
		}
	}
}

function part2(input, target = 2020) {
	const values = input.split("\n").map(Number);
	values.sort();
	for (let a = 0; a < input.length - 2; a++) {
		for (let b = a + 1; b < input.length - 1; b++) {
			for (let c = input.length - 1; c > b; c--) {
				const value = values[a] + values[b] + values[c];
				if (value < target) {
					break;
				}
				if (value === target) {
					return values[a] * values[b] * values[c];
				}
			}
		}
	}
}

module.exports = { part1, part2 };