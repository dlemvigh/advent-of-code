import { splitIntoGroups } from "../../util";

export function part1(input: string) {
    const { ranges, ids } = parseInput(input)
    let validCount = 0
    for (const id of ids) {
        const valid = ranges.some(([start, end]) => start <= id && id <= end)
        if (valid){
            validCount++
        }
    }
    return validCount
}

export function part2(input: string) {

}

function parseInput(input: string) {
    const [rangesStr, idsStr] = splitIntoGroups(input)

    const ranges = rangesStr.map(line => {
        const [startStr, endStr] = line.split("-")
        const start = Number(startStr)
        const end = Number(endStr)
        return [start, end]
    })

    const ids = idsStr.map(line => Number(line))

    return { ranges, ids }
}