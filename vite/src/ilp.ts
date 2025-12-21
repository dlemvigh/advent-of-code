import { lessEq, Model, solve } from "yalps"

type Shape = {
    width: number
    height: number
    price: number
}

type Board = {
    width: number
    height: number
}

type VariableDefinition = {
    price: number
    [constraint: string]: number
}

export function simpleILP() {
    const model = {
        direction: "maximize" as const,
        objective: "profit",
        constraints: {
            wood: { max: 300 },
            labor: { max: 110 }, // labor should be <= 110
            storage: lessEq(400), // you can use the helper functions instead
        },
        variables: {
            table: { wood: 30, labor: 5, profit: 1200, storage: 30 },
            dresser: { wood: 20, labor: 10, profit: 1600, storage: 50 },
        },
        integers: ["table", "dresser"], // these variables must have an integer value in the solution
    }

    const solution = solve(model)

    return solution.result
}

export function simpleILP1D() {
    const model: Model = {
        variables: {
            z1: { size: 4, price: 9 },
            z2: { size: 2, price: 5 },
            z3: { size: 1, price: 4 },
            z4: { size: 3, price: 6 },
        },
        constraints: {
            size: { max: 9 }
        },
        binaries: true,
        objective: "price",
        direction: "maximize"
    }

    const solution = solve(model)
    return solution.result
}

function createCellConstraints(board: Board) {
    const constraints: Record<string, { max: number }> = {}
    for (let cy = 0; cy < board.height; cy++) {
        for (let cx = 0; cx < board.width; cx++) {
            constraints[`cell_${cx}_${cy}`] = { max: 1 }
        }
    }
    return constraints
}

function createShapeConstraints(shapes: Shape[]) {
    const constraints: Record<string, { max: number }> = {}
    shapes.forEach((_, shapeIdx) => {
        constraints[`shape_${shapeIdx}`] = { max: 1 }
    })
    return constraints
}

function createVariables(shapes: Shape[], board: Board) {
    const variables: Record<string, VariableDefinition> = {}
    
    shapes.forEach((shape, shapeIdx) => {
        for (let y = 0; y <= board.height - shape.height; y++) {
            for (let x = 0; x <= board.width - shape.width; x++) {
                const varName = `z${shapeIdx}_x${x}_y${y}`
                const varDef: VariableDefinition = { 
                    price: shape.price,
                    [`shape_${shapeIdx}`]: 1
                }
                
                // Add this variable to the constraint for each cell it covers
                for (let dy = 0; dy < shape.height; dy++) {
                    for (let dx = 0; dx < shape.width; dx++) {
                        const cellX = x + dx
                        const cellY = y + dy
                        varDef[`cell_${cellX}_${cellY}`] = 1
                    }
                }
                
                variables[varName] = varDef
            }
        }
    })
    
    return variables
}

export function simpleILP2D() {
    const shapes = [
        { width: 1, height: 1, price: 1 },
        { width: 1, height: 2, price: 2 },
        { width: 2, height: 3, price: 6 },
        { width: 2, height: 2, price: 12 }
    ]
    const board = { width: 3, height: 4 }

    const variables = createVariables(shapes, board)
    const constraints = {
        ...createCellConstraints(board),
        ...createShapeConstraints(shapes)
    }
    
    const model: Model<any, any> = {
        variables,
        constraints,
        binaries: true,
        objective: "price",
        direction: "maximize"
    }

    const solution = solve(model)
    return solution.result
}
