export const calcFuelCost = (mass: number): number => {
	return Math.max(Math.floor(mass / 3) - 2, 0);
}

export const calcFuelCostRec = (mass: number): number => {
	let totalFuel = 0;
	while (mass > 0) {
		const fuel = calcFuelCost(mass);
		totalFuel += fuel;
		mass = fuel;
	}
	return totalFuel;
}