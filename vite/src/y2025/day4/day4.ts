import { splitAndMapIntoLines } from "../../util";

type Map = string[][]

export function part1(input: string) {
    const map = parseInput(input)

    const positions = findMoveablePositions(map)
    return Array.from(positions).length
}

export function part2(input: string) {
    const map = parseInput(input)
    let count = 0
    let moveablePositions = Array.from(findMoveablePositions(map))

    while (moveablePositions.length > 0) {
        for (const pos of moveablePositions) {
            clearPosition(pos.row, pos.col, map)
            count++
        }
        moveablePositions = Array.from(findMoveablePositions(map))
    }

    return count
}

function parseInput(input: string): Map {
    return splitAndMapIntoLines(input, line => line.split(""))
}

function* iterateMap(map: Map) {
    for (let row = 0; row < map.length; row++) {
        const line = map[row]
        for (let col = 0; col < line.length; col++) {
            yield { row, col, value: line[col] }
        }
    }
}
function* iterateNeighbors(row: number, col: number, map: Map) {
    for (let dr = -1; dr <= 1; dr++) {
        const newRow = row + dr
        if (newRow < 0 || newRow >= map.length) continue

        for (let dc = -1; dc <= 1; dc++) {
            const newCol = col + dc
            if (newCol < 0 || newCol >= map[0].length) continue

            if (dr === 0 && dc === 0) continue

            yield { row: newRow, col: newCol, value: map[newRow][newCol] }
        }
    }
}

function* findMoveablePositions(map: Map) {
    for (const { row, col, value } of iterateMap(map)) {
        if (value === ".") continue

        let count = 0
        for (const neighbor of iterateNeighbors(row, col, map)) {
            if (neighbor.value === "@") {
                count++
            }
        }
        
        if (count < 4) {
            yield { row, col }
        }
    }
}

function clearPosition(row: number, col: number, map: Map) {
    map[row][col] = "."
}