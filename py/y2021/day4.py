input = open("day4sample.txt", "r").read()
input = open("day4.txt", "r").read()
blocks = input.split("\n\n")

def parseNumbers(text):
	return list(reversed([int(x) for x in text.split(",")]))

def parsePlates(text):
	return [
		[
			[int(x) for x in line.split()]
			for line 
			in block.split("\n")
		]
		for block 
		in text
	]

def printPlates(plates):
	for plate in plates:
		printPlate(plate)
		print("")

def printPlate(plate):
	for row in plate:
		print("".join(str(n).rjust(3) for n in row))


numbers = parseNumbers(blocks[0])
plates = parsePlates(blocks[1:])

def drawNumber(plates, number):
	return [
		[
			[n == number and "." or n  for n in row]
			for row in plate
		]
		for plate in plates
	]

def anyHasBingo(plates):
	for plate in plates:
		if plateHasBingo(plate):
			return True
	return False

def allHasBingo(plates):
	for plate in plates:
		if not plateHasBingo(plate):
			return False
	return True

def plateHasBingo(plate):
	for row in plate:
		if row.count(".") == 5:
			return True
	for i in range(5):
		column = [row[i] for row in plate]
		if column.count(".") == 5:
			return True

	return False

def drawNumbers(plates, numbers):
	for number in numbers:
		plates = drawNumber(plates, number)
	return plates

def drawNumberTillBingo(plates, numbers):
	while not anyHasBingo(plates) and len(numbers) > 0:
		number = numbers.pop()
		plates = drawNumber(plates, number)
	return plates, number


def drawNumberTillAllBingo(plates, numbers):
	while not allHasBingo(plates) and len(numbers) > 0:
		number = numbers.pop()
		plates = drawNumber(plates, number)
		platesWithoutBingo = list(filter(lambda plate: not plateHasBingo(plate), plates))
		if (len(platesWithoutBingo) > 0):
			plates = platesWithoutBingo
	return plates, number

def getWinningScore(plates):
	for plate in plates:
		if plateHasBingo(plate):
			items = [x for row in plate for x in row if x != "." ]
			return sum(items)

print(numbers)
printPlates(plates)

# plates, winning_number = drawNumberTillBingo(plates, numbers)
plates, winning_number = drawNumberTillAllBingo(plates, numbers)

printPlates(plates)
winning_score = getWinningScore(plates)
print(winning_number, winning_score, winning_number * winning_score)
