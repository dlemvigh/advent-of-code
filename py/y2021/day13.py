import numpy
import re

input = """6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5"""
input = open("day13.txt", "r").read()

# parse input
input_dots, input_folds = input.split("\n\n")
# print(input_dots)
# print(input_folds)

def print_paper(paper):
	for line in paper:
		print(" ".join(val and "#" or "." for val in line))

def apply_folds(paper, folds):
	for fold in re.findall("fold along (\w)=(\d+)", folds):
		axis, value = fold
		value = int(value)
		print("axis", axis, "value", value)
		if axis == "y":
			paper = fold_up(paper, value)
		if axis == "x":
			paper = fold_left(paper, value)

	return paper

def fold_up(paper, value):
	top = paper[:value]
	bottom = paper[:value:-1]

	# print("top")
	# print_paper(top)
	# print("bottom")
	# print_paper(bottom)

	top_height = len(top)
	bottom_height = len(bottom)
	height = max(top_height, bottom_height)
	width = len(paper[0])

	return (list(reversed([
		[
			(h < top_height and top[-1-h][w]) or (h < bottom_height and bottom[-1-h][w])
			for w in range(width)
		]
		for h in range(height)
	])))

def fold_left(paper, value):
	left = [line[:value] for line in paper]
	right = [line[:value:-1] for line in paper]

	# print("left")
	# print_paper(left)
	# print("right")
	# print_paper(right)

	left_width = len(left[0])
	right_width = len(right[0])
	width = max(left_width, right_width)
	height = len(paper)

	return ([
		list(reversed([
			(w < left_width and left[h][-1-w]) or (w < right_width and right[h][-1-w])
			for w in range(width)
		]))
		for h in range(height)
	])

# get dots
dots = [(map(int, line.split(","))) for line in input_dots.split("\n") ]

# get dimentions
width = max(x for x, y in dots) + 1
height = max(y for x, y in dots) + 1

# get empty paper
paper = numpy.full((height, width), False)

# put dots on paper
for x, y in dots:
	paper[y][x] = True

paper = apply_folds(paper, input_folds)
print_paper(paper)
print(sum(x for line in paper for x in line))