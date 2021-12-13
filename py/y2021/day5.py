import re

input = """0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2"""
# input = open("day5.txt", "r").read()

prog = re.compile('(\d+),(\d+) -> (\d+),(\d+)')
lines = [[int(x) for x in line] for line in prog.findall(input)]

orthogonal = list(filter(lambda line: line[0] == line[2] or line[1] == line[3], lines))

xs = [x for line in lines for x in [line[0], line[2]]]
ys = [x for line in lines for x in [line[1], line[3]]]
minx = min(xs)
maxx = max(xs)
miny= min(ys)
maxy = max(ys)
# print(minx, maxx, miny, maxy)


def overlaps(line, coord):
	x1, y1, x2, y2 = line
	x, y = coord

	return (x1 <= x and x <= x2 or x1 >= x and x >= x2) and (y1 <= y and y <= y2 or y1 >= y and y >= y2)

def overlaps2(lines, coord):
	count = 0
	for line in lines:
		if overlaps(line, coord):
			count += 1
		if count >= 2:
			print("overlap2", coord)
			return True
	return False

def countOverlap2(lines):
	count = 0
	for y in range(miny, maxy + 1):
		for x in range(minx, maxx + 1):
			# print(x, y, overlaps(lines[0], [x, y]))
			if overlaps2(lines, [x, y]):
				count += 1
	return count

def tableOverlap(lines):
	xs = [x for line in lines for x in [line[0], line[2]]]
	ys = [x for line in lines for x in [line[1], line[3]]]
	minx = 0
	maxx = max(xs)
	miny= 0
	maxy = max(ys)

	table = []
	for y in range(miny, maxy + 1):
		row = []
		table.append(row)
		for x in range(minx, maxx + 1):
			row.append(0)
	for line in lines:
		x1, y1, x2, y2 = line
		if x1 == x2:
			for y in range(min(y1, y2), max(y1, y2) + 1):
				table[y][x1] += 1
		elif y1 == y2:
			for x in range(min(x1, x2), max(x1, x2) + 1):
				# print("t", x1, y1, x2, y2)
				# print("dim", minx, maxx, miny, maxy)
				table[y1][x] += 1
	return table

def tableOverlap2(lines):
	xs = [x for line in lines for x in [line[0], line[2]]]
	ys = [x for line in lines for x in [line[1], line[3]]]
	minx = 0
	maxx = max(xs)
	miny= 0
	maxy = max(ys)

	table = []
	for y in range(miny, maxy + 1):
		row = []
		table.append(row)
		for x in range(minx, maxx + 1):
			row.append(0)
	for line in lines:
		x1, y1, x2, y2 = line
		if x1 == x2:
			for y in range(min(y1, y2), max(y1, y2) + 1):
				table[y][x1] += 1
		elif y1 == y2:
			for x in range(min(x1, x2), max(x1, x2) + 1):
				# print("t", x1, y1, x2, y2)
				# print("dim", minx, maxx, miny, maxy)
				table[y1][x] += 1
		else:
			# print("line", line)
			x = x1
			y = y1
			dx = x2 > x1 and 1 or -1
			dy = y2 > y1 and 1 or -1
			# print("diff", dx, dy)
			count = max(x1, x2) - min(x1, x2) + 1
			for i in range(count):
				y = dy * i + y1
				x = dx * i + x1
				# print(" - ", x, y)
				table[y][x] += 1
	return table


def printTable(table):
	return "\n".join(
		"".join(x and str(x) or "." for x in line)
		for line 
		in table
	)
def countTableOverlaps(table):
	return sum(count >= 2 for line in table for count in line)
			
# print(countOverlap2(orthogonal))
table = tableOverlap2(lines)
overlaps = countTableOverlaps(table)
print(printTable(table))
print("table count", countTableOverlaps(table))