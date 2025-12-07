import { splitIntoGroups } from "../../util";

type Range = [number, number]
    
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
    const { ranges } = parseInput(input)
    const validCount = ranges.map(([start, end]) => end - start + 1).reduce((a, b) => a + b)

    return validCount
}

function parseInput(input: string) {
    const [rangesStr, idsStr] = splitIntoGroups(input)

    const ranges = rangesStr.map(line => {
        const [startStr, endStr] = line.split("-")
        const start = Number(startStr)
        const end = Number(endStr)
        return [start, end] as Range
    })

    const ids = idsStr.map(line => Number(line))

    const mergedRanges = mergeOverlappingRanges(ranges)

    return { ranges: mergedRanges, ids }
}

function mergeOverlappingRanges(ranges: Range[]): Range[] {
    if (ranges.length <= 1) return ranges
    
    // Sort ranges by start position
    const sorted = [...ranges].sort((a, b) => a[0] - b[0])
    
    let merged = [sorted[0]]
    
    for (let i = 1; i < sorted.length; i++) {
        const current = sorted[i]
        const last = merged[merged.length - 1]
        
        // Check if current range overlaps with last merged range
        // Ranges overlap if current start <= last end + 1 (handles adjacent ranges too)
        if (current[0] <= last[1] + 1) {
            // Merge by extending the last range's end to the max of both ends
            last[1] = Math.max(last[1], current[1])
        } else {
            // No overlap, add as new range
            merged.push(current)
        }
    }
    
    return merged
}