input = """00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010"""
input = open("day3.txt", "r").read()

lines = input.split("\n")

length = len(lines[0])

def mostCommonBit(lines, index):
	zeroes = len([line[index] for line in lines if line[index] == "0"])
	ones = len([line[index] for line in lines if line[index] == "1"])
	if zeroes > ones:
		return "0"
	else:
		return "1"
def leastCommonBit(lines, index):
	zeroes = len([line[index] for line in lines if line[index] == "0"])
	ones = len([line[index] for line in lines if line[index] == "1"])
	if zeroes > ones:
		return "1"
	else:
		return "0"


gamma = "".join([mostCommonBit(lines, index) for index in range(length)])
epsilon = "".join([leastCommonBit(lines, index) for index in range(length)])

gv = int("".join(gamma), 2)
ev = int("".join(epsilon), 2)

print(gamma, epsilon)
print(gv, ev, gv * ev)

def filterPattern(lines, fn):
	length = len(lines[0])
	for index in range(length):
		bit = fn(lines, index)
		lines = filter(lambda line: line[index] == bit, lines)
		# print("it", index, len(lines), lines)
		if len(lines) == 1:
			return lines[0]

o2 = filterPattern(lines, mostCommonBit)
co2 = filterPattern(lines, leastCommonBit)
o2v = int(o2, 2)
co2v = int(co2, 2)

print(o2v, co2v, o2v * co2v)