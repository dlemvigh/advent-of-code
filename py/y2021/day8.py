input = """be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce"""

# input = """acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf"""

input = open("day8.txt", "r").read()

lines = input.split("\n")

def parse_line(line):
	return [
		["".join(sorted(word)) for word in part.split(" ")]
		for part in line.split(" | ")
	]


def part1(lines):
	unique_lengths = [2, 4, 3, 7]
	unique_count = 0

	for line in lines:
		signals, outputs = parse_line(line)
		for output in outputs:
			if len(output)  in unique_lengths:
				unique_count += 1

	return unique_count

def part2(lines):
	total = 0
	for line in lines:
		signals, outputs = parse_line(line)

		lookup = build_lookup(signals)
		res = int("".join([str(lookup[key]) for key in outputs]))
		print(res)
		total += res
	return total

def build_lookup(signals):
	lookup = {}

	# find 1
	key = find_one_by_length(signals, 2)
	add_lookup(lookup, key, 1)
	# find 7
	key = find_one_by_length(signals, 3)
	add_lookup(lookup, key, 7)
	# find 4
	key = find_one_by_length(signals, 4)
	add_lookup(lookup, key, 4)
	# find 8
	key = find_one_by_length(signals, 7)
	add_lookup(lookup, key, 8)

	fives = [x for x in signals if len(x) == 5]
	sixes = [x for x in signals if len(x) == 6]	

	# find 3
	key = find_one_by_overlap(fives, lookup[7])
	add_lookup(lookup, key, 3)
	fives.remove(key)

	# find 9
	key = find_one_by_overlap(sixes, lookup[3])
	add_lookup(lookup, key, 9)
	sixes.remove(key)

	# find 0
	key = find_one_by_overlap(sixes, lookup[7])
	add_lookup(lookup, key, 0)
	sixes.remove(key)

	# find 6
	add_lookup(lookup, sixes[0], 6)

	# find 5
	key = find_one_by_is_overlapped(fives, lookup[6])
	add_lookup(lookup, key, 5)
	fives.remove(key)

	# find 2
	add_lookup(lookup, fives[0], 2)

	return lookup

def add_lookup(lookup, key, value):
	lookup[key] = value
	lookup[value] = key

def find_one_by_length(list, length):
	return next(x for x in list if len(x) == length)

def find_one_by_overlap(list, value):
	return next(x for x in list if overlaps(value, x))

def find_one_by_is_overlapped(list, value):
	return next(x for x in list if overlaps(x, value))

def overlaps(a, b):
	return len(set(a) & set(b)) == len(a)

# print("unique count", part1(lines))
print("total", part2(lines))