export function part1(input: string): number {
    const ranges = parseInput(input)
        
    let duplicateSum = 0;
    for (const num of rangeIterator(ranges)) {
        if (checkForTwiceDuplicates(num)) {
            duplicateSum += num;
        }
    }

    return duplicateSum;
}

export function part2(input: string) {
    const ranges = parseInput(input)
        
    let duplicateSum = 0;
    for (const num of rangeIterator(ranges)) {
        if (checkForAnyDuplicates(num)) {
            duplicateSum += num;
        }
    }

    return duplicateSum;

}


type Range = [number, number]

function parseInput(input: string): Range[] {
    return input.split(',').map(range => 
        range.split('-').map(Number) as Range
    )
}

function checkForTwiceDuplicates(number: number) {
    const regex = /^(.+)\1$/;
    return regex.test(number.toString());
}

function checkForAnyDuplicates(number: number) {
    const regex = /^(.+)\1+$/;
    return regex.test(number.toString());
}



function* rangeIterator(ranges: Range[]): Generator<number> {
    for (const [start, end] of ranges) {
        for (let i = start; i <= end; i++) {
            yield i;
        }
    }
}