from typing import Dict


input = """NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C"""

input = open("day14.txt", "r").read()

def parse_input(input):
	poly, pairs = input.split("\n\n")
	
	poly_dict = {}
	for i in range(len(poly)):
		pair = poly[i:i+2]
		inc_key(poly_dict, pair, 1)

	pairs_dict = {}
	for line in pairs.split("\n"):
		pair, insert = line.split(" -> ")
		pairs_dict[pair] = insert

	return poly, pairs_dict, poly_dict

def map_pair(poly, pairs, i):
	pair = poly[i:i+2]
	if pair in pairs:
		return pair[0] + pairs[pair]
	else:
		return pair[0]

def it(poly, pairs):
	return "".join(map(lambda i: map_pair(poly, pairs, i), range(len(poly))))

def it2(poly: dict, pairs: dict):
	poly2 = {}
	for key in poly.keys():
		if key in pairs:
			key1 = key[0] + pairs[key]
			key2 = pairs[key] + key[1]
			inc_key(poly2, key1, poly[key])
			inc_key(poly2, key2, poly[key])
		else:
			inc_key(poly2, key, poly[key])
	return poly2

def pair_dict_to_counts(poly_dict: dict):
	counts = {}
	for key, value in poly_dict.items():
		inc_key(counts, key[0], value)
	return counts

def inc_key(d, k, v):
	if k in d:
		d[k] += v
	else:
		d[k] = v

def it_loop(poly, pairs, count):
	for _ in range(count):
		poly = it(poly, pairs)
	return poly
def it_loop2(poly_dict, pairs, count):
	for _ in range(count):
		poly_dict = it2(poly_dict, pairs)
	return poly_dict

poly, pairs, poly_dict = parse_input(input)
poly = it_loop(poly, pairs, 10)
print(len(poly))
s = set(poly)
counts = list(map(lambda x: poly.count(x), s))
print(max(counts) - min(counts), s, max(counts), min(counts))

poly_dict = it_loop2(poly_dict, pairs, 40)
counts = pair_dict_to_counts(poly_dict)
print(counts,  poly_dict)
values = counts.values()
print(max(values) - min(values))

