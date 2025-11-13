import sys
import re

def parse(input: str):
    return input

def part1(input: str):
    sum = 0
    for match in re.findall(r"mul\((\d+),(\d+)\)", input):
        a, b = map(int, match)
        sum += a * b
    return sum

def part2(input: str):
    # print("before: ", len(input))
    input = re.sub(r"don't\(\)(.*?)($|do\(\))", "", input, flags=re.DOTALL)
    # print("after:  ", len(input))
    print(input)
    sum = 0
    for match in re.findall(r"mul\((\d+),(\d+)\)", input):
        a, b = map(int, match)
        sum += a * b
    return sum

if __name__ == "__main__":
    input = sys.stdin.read()
    result = part2(input)
    print(result)
