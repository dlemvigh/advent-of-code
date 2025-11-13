import sys
import re
import collections

def parse(input: str):
    lines = input.split("\n")
    lines2 = [re.split(r'\s+', line) for line in lines]
    return lines2


def part1(input: str):
    lines = parse(input)
    left = sorted(int(line[0]) for line in lines)
    right = sorted(int(line[1]) for line in lines)

    sum = 0
    for l,r in zip(left, right):
        diff = abs(l - r)
        sum += diff

    return sum

def part2(input: str):
    lines = parse(input)
    left = (int(line[0]) for line in lines)
    right = (int(line[1]) for line in lines)

    occurences = collections.Counter(right)
    print(occurences)

    sum = 0
    for l in left:
        occ = occurences.get(l, 0)
        val = l * occurences.get(l, 0)
        sum += val

    return sum

if __name__ == "__main__":
    input = sys.stdin.read()
    result = part2(input)
    print("diff", result)