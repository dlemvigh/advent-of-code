input = "3,4,3,1,2"
input = open("day6.txt", "r").read()
values = [int(x) for x in input.split(",")]

TIMER = 7

def countLaternFish(age: int, timer: int, maxAge: int, memo: dict):
	if age + timer >= maxAge:
		return 1
	
	nextBirth = age + timer
	if nextBirth in memo:
		return memo[nextBirth]

	if timer == 0:
		return (
			countLaternFish(age + 1, TIMER - 1, maxAge, memo) + 
			countLaternFish(age + 1, TIMER + 1, maxAge, memo)
		)
	
	res = countLaternFish(age + timer, 0, maxAge, memo)
	memo[nextBirth] = res
	return res

def countAllLaternFish(list, maxAge):
	memo = dict()
	count = 0
	for fish in list:
		count += countLaternFish(0, fish, maxAge, memo)
	return count

print(countAllLaternFish(values, 18))
print(countAllLaternFish(values, 80))
print(countAllLaternFish(values, 256))
