from typing import List


sample1 = """..X...
.SAMX.
.A..A.
XMAS.S
.X...."""

sample2 = """MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX"""

sample3 = """....XXMAS.
.SAMXMS...
...S..A...
..A.A.MS.X
XMASAMX.MM
X.....XA.A
S.S.S.S.SS
.A.A.A.A.A
..M.M.M.MM
.X.X.XMASX"""

def find_xmas(input: str):
    # count "xmas" in each line
    rows = input.split("\n")
    columns = ["".join([row[i] for row in rows]) for i in range(len(rows[0]))]

    count = 0
    for row in rows:
        count += row.count("XMAS")
        count += row.count("SAMX")
    for col in columns:
        count += col.count("XMAS")
        count += col.count("SAMX")

    return count

def part1(input: str):
    print(find_xmas(input))

if __name__ == "__main__":
    part1(sample1)