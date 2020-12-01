function search(values, target = 2020) {
	let i = 0, j = values.length - 1;
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

function part1(input, target = 2020) {
	const values = input.split("\n").map(Number);
	values.sort();

	return search(values, target);
}


function part2old(input, target = 2020) {
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

function part2(input, target = 2020) {
	const values = input.split("\n").map(Number);
	values.sort();
	
	for (let a = 0; a < input.length - 2; a++) {
		let cLimit = input.length - 1;
		for (let b = a + 1; b < input.length - 1; b++) {
			for (let c = cLimit; c > b; c--) {
				const value = values[a] + values[b] + values[c];
				if (value < target) {
					cLimit = c;
					break;
				}
				if (value === target) {
					return values[a] * values[b] * values[c];
				}
			}
		}
	}
}

function part2new(input, target = 2020) {
	const values = input.split("\n").map(Number);
	values.sort();

	for (let a = 0; a < input.length - 2; a++) {
		const valueA = values[a];
		const rest = target - valueA;

		const res = search(values.slice(a + 1), rest);
		if (res) {
			const [valueB, valueC] = res;
			return valueA * valueB * valueC;
		}
	}
}

module.exports = { part1, part2 };