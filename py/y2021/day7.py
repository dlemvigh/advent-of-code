from statistics import mean

input = "16,1,2,0,4,2,7,1,2,14"
input = open("day7.txt", "r").read()
values = [int(x) for x in input.split(",")]

def calcFuelCost(list, pos):
	return sum(abs(val - pos) for val in list)

def calcFuelCost2(list, pos):
	return sum(tri(abs(val - pos)) for val in list)
	
def findMinFuelCost(list, costFn = calcFuelCost):
	candidates = range(min(list), max(list))
	best = max(list)
	bestCost = costFn(list, best)
	for cand in candidates:
		cost = costFn(list, cand)
		if cost < bestCost:
			best = cand
			bestCost = cost

	return (best, bestCost)

def tri(n):
	return n * (n + 1) / 2



print(values, mean(values))

# print(2, calcFuelCost(values, 2))
# print(3, calcFuelCost(values, 3))
# print(4, calcFuelCost(values, 4))
(best, cost) = findMinFuelCost(values)
(best, cost) = findMinFuelCost(values, calcFuelCost2)
print(best, cost)
