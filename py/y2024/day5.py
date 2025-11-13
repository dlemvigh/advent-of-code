import sys

def parse(input: str):
    rules, pages = input.split("\n\n")
    rules = list(parseRules(rules))
    pages = list(parsePages(pages))
    print("rules", rules)
    print("pages", pages)

def parseRules(input: str):
    for line in input.split("\n"):
        yield list(map(int, line.split("|")))

def parsePages(input: str):
    for line in input.split("\n"):
        yield list(map(int, line.split(",")))

def part1():
    pass

if __name__ == "__main__":
    input = sys.stdin.read()
    print("Day 5")
    parse(input)