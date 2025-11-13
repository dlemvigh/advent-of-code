export function part1(input: string) {
    const matches = input.matchAll(/mul\((\d+),(\d+)\)/g)
    let sum = 0;
    for (const match of matches ?? []) {
        const a = Number(match[1])
        const b = Number(match[2])
        sum += a * b
    }
    return sum
}

export function part2(input: string) {
    const replaced = input.replaceAll(/don't\(\)(.*?)do\(\)/g, "don't()do()")
    return part1(replaced)
}