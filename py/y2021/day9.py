from functools import reduce

input = """2199943210
3987894921
9856789892
8767896789
9899965678"""
# input = open("day9.txt", "r").read()

values = [list(map(int, line)) for line in input.split("\n")]
height = len(values)
width = len(values[0])


def get_near(x, y, width, height):
	if x > 0:
		yield (x - 1, y)
	if y > 0:
		yield (x, y - 1)
	if x < width - 1:
		yield (x + 1, y)
	if y < height - 1:
		yield (x, y + 1)
def is_low_point(x, y, width, height, values):
	value = values[y][x]
	for dx, dy in get_near(x, y, width, height):
		if values[dy][dx] <= value:
			return False
	return True

def get_low_points(values):
	low_points = [];
	height = len(values)
	for y in range(height):
		width = len(values[y])
		for x in range(width):
			if is_low_point(x, y, width, height, values):
				low_points.append((x, y, values[y][x]))
	return low_points

def get_risk_level(low_points):
	return sum(value + 1 for (y, x, value) in low_points)

# too high 1910
low_points = get_low_points(values)
# print(low_points)
# print(get_risk_level(low_points))

def get_basin(x, y, label, values, basins, count = 0):
	basins[y][x] = label
	count += 1
	for dx, dy in get_near(x, y, width, height):
		if basins[dy][dx] == "." and values[dy][dx] < 9:
			count += get_basin(dx, dy, label, values, basins)
	return count

def get_basins(low_points, values):
	basins = [list(map(lambda _: ".", line)) for line in values]
	sizes = []
	for label, (x, y, _) in enumerate(low_points[:]):
		count = get_basin(x, y, label, values, basins)
		sizes.append(count)
	basin_map = "\n".join("".join(map(str, line)) for line in basins)

	sizes.sort()
	result = reduce(lambda acc, val: acc * val, sizes[-3:])
	return (basin_map, sizes, result)

basin_map, sizes, result = get_basins(low_points, values)
print(basin_map)
print(result)

