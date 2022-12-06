export function isUnique(input: string): boolean {
    const set = new Set(input.split(""));
    return set.size === input.length;
}

export function indexOfUniqueSubstring(input: string, length: number): number {
    if (length < 0) throw new Error("Length must be greater than zero")
    for (let index = 0; index + length <= input.length; index++) {
        const substring = input.substring(index, index + length);
        if (isUnique(substring)) {
            return index;
        }
    }
    return -1;
}

export function part1(input: string): number {
    const index = indexOfUniqueSubstring(input, 4);
    if (index === -1) throw new Error("Unable to find marker of 4 unique characters")
    return index + 4;
}

export function part2(input: string): number {
    const index = indexOfUniqueSubstring(input, 14);
    if (index === -1) throw new Error("Unable to find marker of 4 unique characters")
    return index + 14;
}