from dataclasses import dataclass
import math

def explode(value, index):
	ref = value
	for i in index[:-1]:
		ref = ref[i]
	left, right = ref[index[-1]]
	print(ref, left, right)
	return value

def split(value, index):
	return value

def split_value(value):
	return [value // 2, math.ceil(value / 2)]

value = [[[[[9,8],1],2],3],4]

explode(value, [0, 0, 0, 0])
