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
		// console.log(i, j, value);
		if(value === target) {
			return [values[i], values[j], values[i] * values[j]];
		}
		if (value < target) {
			i++;
		} else {
			j--;
		}
// } while(true);
	}
}

module.exports = { part1 };