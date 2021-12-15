
import heapq
import numpy

input = """1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581"""
input = open("day15.txt", "r").read()


inf = float("inf")

def parse_input(input):
	lines = input.split("\n")
	weights = [int(x) for line in lines for x in line]
	width = len(lines[0])
	height = len(lines)
	return (weights, width, height)

def parse_input2(input, repeat = 5):
	lines = input.split("\n")
	width = len(lines[0]) * repeat
	height = len(lines) * repeat
	values = list(map_values(lines, repeat))
	return (values, width, height)

		
def map_values(lines, repeat):
	for y in range(repeat):
		for line in lines:
			for x in range(repeat):
				for v in line:
					yield (int(v) + x + y - 1) % 9 + 1

def print_map(weights, width, height):
	for h in range(height):
		# print("".join(map(str, weights[h * width: (h + 1) * width])))
		# print("".join(str(x) for x in weights[h * width: (h + 1) * width]))
		print(weights[h])

def get_near(i, width, height):
	x = i % width
	y = i // height
	if x > 0:
		yield (x - 1) + (y * width)
	if y > 0:
		yield x + (y - 1) * width
	if x + 1< width:
		yield (x + 1) + (y * width)
	if y + 1 < height:
		yield x + (y + 1) * width


def find_path(weights, width, height):
	dist = numpy.full(len(weights), inf)
	dist[0] = 0

	q = [(0, 0)]
	heapq.heapify(q)

	while len(q) > 0:
		di, i = heapq.heappop(q)
		for n in get_near(i, width, height):
			dn = di + weights[n]
			if (dn < dist[n]):
				dist[n] = dn
				heapq.heappush(q, (dn, n))
	# print_map(dist, width, height)
	return dist[width * height - 1]

def repeat_map(map, width, height):
	pass

weights, width, height = parse_input2(input)
# print(weights)
# print_map(weights, width, height)
best = find_path(weights, width, height)
print(best)
