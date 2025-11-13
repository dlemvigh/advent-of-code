import sys

def is_valid(line):
    increments = False
    decrements = False
    for i in range(1, len(line)):
        diff = abs(line[i - 1] - line[i])
        if (diff > 3) or (diff == 0):
            print("invalid", line, diff)
            return False
        if line[i - 1] < line[i]:
            increments |= True
        elif line[i - 1] > line[i]:
            decrements |= True

    if increments and decrements:
        return False

    return True

def part1(input: str):
    parsed = parse(input)
    count = 0
    for line in parsed:
        if is_valid(line):
            count += 1

    print("day1", count)

def part2():
    pass

def parse(input: str):
    return [list(map(int, line.split(" "))) for line in input.split("\n")] 

if __name__ == "__main__":
    input = sys.stdin.read()
    part1(input)