const ORTHOGONAL = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0]
]
const ADJACENT = [
    [-1,-1],
    [-1,0],
    [-1,1],
    [0,-1],
    [0,1],
    [1,-1],
    [1,0],
    [1,1]
]

export function getOrtogonallyAdjacent(row: number, col: number, width: number, height: number): [number, number][] {
    return ORTHOGONAL
        .map<[number, number]>(([dr, dc]) => [row + dr, col + dc])
        .filter(([row, col]) =>
            0 <= row && row < height &&
            0 <= col && col < width 
        )
}

export function getAdjacent(row: number, col: number, width: number, height: number): [number, number][] {
    return ADJACENT
        .map<[number, number]>(([dr, dc]) => [row + dr, col + dc])
        .filter(([row, col]) =>
            0 <= row && row < height &&
            0 <= col && col < width 
        )
}