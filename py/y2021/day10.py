input = """[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]"""
input = open("day10.txt", "r").read()

lines = input.split("\n")

parens_dict = dict({'(': ')', "[": "]", "{": "}", "<": ">"})
def parse_line(line):
	stack = []

	for p in line:
		if p in parens_dict:
			stack.append(p)
		elif (parens_dict[stack[-1]] == p):
			stack.pop()
		else:
			print("corrupt: expected", parens_dict[stack[-1]], "was", p)
			return ("corrupt", p)

	if len(stack) > 0:
		print("incomplete", stack)
		return ("incomplete", stack)
	return ("valid", None)


scores_corrupt = { ")": 3, "]": 57, "}": 1197, ">": 25137 }
counts_corrupt = { ")": 0, "]": 0, "}": 0, ">": 0 }
scores_auto = { "(": 1, "[": 2, "{": 3, "<": 4 }

def calc_incomplete_score(stack):
	score = 0
	for p in stack[::-1]:
		score *= 5
		score += scores_auto[p]
	print("score", stack, score)
	return score


scores_incomplete = []
for line in lines:
	error, payload = parse_line(line)
	if error == "corrupt":
		counts_corrupt[payload] += 1
	if error == "incomplete":
		scores_incomplete.append(calc_incomplete_score(payload))

score_corrupt = 0
for key, count in counts_corrupt.items():
	score_corrupt += scores_corrupt[key] * count

print("corrupt score", score_corrupt)
print("incomplete score", scores_incomplete)
scores_incomplete.sort()
score_incomplete = scores_incomplete[len(scores_incomplete) // 2]
print("incomplete score", score_incomplete)
