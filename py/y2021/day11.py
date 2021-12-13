# input = open("day11.txt", "r").read()

input = """5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526"""

input = """2138862165
2726378448
3235172758
6281242643
4256223158
1112268142
1162836182
1543525861
1882656326
8844263151"""

# input = """11111
# 19991
# 19191
# 19991
# 11111"""

HEIGHT = 10
WIDTH = 10

def parse_input(input):
	return list(map(int, input.replace("\n", "")))

def print_map(values):
	for i in range(0, WIDTH * HEIGHT, WIDTH):
		print("".join(map(str, values[i:i + WIDTH])))

def get_near(i):
	y = i // WIDTH
	x = i % WIDTH
	for dy in range(max(0, y - 1), min(y + 2, HEIGHT)):
		for dx in range(max(0, x - 1), min(x + 2, WIDTH)):
			if dx == x and dy == y:
				continue
			yield dy * WIDTH + dx

def it(values):
	# increment all values by one
	next = list(map(inc, values))

	# note all flashes	
	flashed = dict()
	queue = []
	for i, v in enumerate(next):
		if v > 9:
			queue.append(i)

	while len(queue) > 0:
		i = queue.pop()
		if not i in flashed:
			flashed[i] = True
			for n in get_near(i):
				next[n] += 1
				if (next[n] > 9):
					queue.append(n)

	next = list(map(lambda x: x <= 9 and x or 0, next))
	return next, len(flashed.keys())

def inc(x):
	return x + 1

def loop_it(values, count):
	total = 0
	for i in range(count):
		values, flashes = it(values)
		total += flashes
	return total

def loop_till_sync(values, count = 200):
	for i in range(count):
		values, flashes = it(values)
		if (flashes == WIDTH * HEIGHT):
			return i + 1

values = parse_input(input)
res = loop_it(values, 100)
print("part1", res)
res = loop_till_sync(values, 1000)
print("part2", res)