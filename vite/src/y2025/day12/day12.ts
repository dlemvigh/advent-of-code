import { Model, Constraint, solve } from "yalps";
import { parseInput } from "./parse-input";
import { getAllDistincePieceOrientations } from "./piece-utils";
import { Piece, TestCase } from "./types";

export function part1(input: string) {
    const { pieces, testCases } = parseInput(input);
    const pieceOrientations = getAllDistincePieceOrientations(pieces);

    // Debug: print piece 4 info
    console.log("Piece 4 original:");
    printPiece(pieces[4]);
    console.log(`Piece 4 has ${pieceOrientations[4].length} distinct orientations`);
    pieceOrientations[4].forEach((p, i) => {
        console.log(`Orientation ${i}:`);
        printPiece(p);
    });

    let validTestCases = 0
    for (const testCase of testCases) {
        if (isTestCaseValid(testCase, pieceOrientations)) {
            validTestCases++
        }
    }
    return validTestCases
}

function printPiece(piece: Piece) {
    piece.forEach(row => console.log(row.map(c => c ? '#' : '.').join('')));
}

export function part2(input: string) {

}

function isTestCaseValid(testCase: TestCase, pieces: Piece[][]) {
    const model = getILPModel(testCase, pieces);
    console.log(`\nTesting ${testCase.width}x${testCase.height} with pieces:`, testCase.pieceCounts);
    console.log(`Model has ${Object.keys(model.variables).length} variables and ${Object.keys(model.constraints).length} constraints`);

    // Debug first test case in detail
    if (testCase.width === 4 && testCase.height === 4) {
        console.log("Variables:", Object.keys(model.variables));
        console.log("Piece count constraint:", model.constraints.piece_4_count);
        console.log("Cell r0_c0 constraint:", model.constraints.cell_r0_c0);

        // Count how many cell constraints we have
        const cellConstraints = Object.keys(model.constraints).filter(k => k.startsWith('cell_'));
        console.log(`We have ${cellConstraints.length} cell constraints for a ${testCase.width}x${testCase.height} grid`);

        // Are there any cells without constraints?
        for (let r = 0; r < testCase.height; r++) {
            for (let c = 0; c < testCase.width; c++) {
                if (!model.constraints[`cell_r${r}_c${c}`]) {
                    console.log(`WARNING: No constraint for cell (${r},${c})`);
                }
            }
        }
    }

    const solution = solve(model);
    console.log(`Solution status: ${solution.status}`);

    // If we found an optimal or feasible solution, the test case is valid
    return solution.status === "optimal" || solution.status === "feasible";
}


function getILPModel(testCase: TestCase, pieces: Piece[][]): Model {

    // get all possible placements of pieces in the grid
    // get all constraints
        // piece count constraints
        // no overlap constraints


    const variables = Array.from(getAllVariables(testCase, pieces));

    // For a feasibility problem, we just need a dummy objective
    const modelVariables: Record<string, Record<string, number>> = {};
    for (const v of variables) {
        const varName = getVariableName(v);
        modelVariables[varName] = { obj: 1 };
    }

    const modelConstraints = getConstraints(testCase, pieces, variables);

    const model: Model = {
        direction: "maximize",
        objective: "obj",
        binaries: true,
        variables: modelVariables,
        constraints: modelConstraints
    }

    return model
}

type Variable = { pieceIndex: number, orientationIndex: number, row: number, col: number }

function* getAllVariables(testCase: TestCase, pieces: Piece[][]): Generator<Variable> {
    for (const pieceIndex in pieces) {
        if (testCase.pieceCounts[pieceIndex] === 0) continue;
        for (const orientationIndex in pieces[pieceIndex]) {
            const piece = pieces[pieceIndex][orientationIndex];
            const pieceHeight = piece.length;
            const pieceWidth = piece[0].length;
            for (let row = 0; row <= testCase.height - pieceHeight; row++) {
                for (let col = 0; col <= testCase.width - pieceWidth; col++) {
                    yield { 
                        pieceIndex: Number(pieceIndex), 
                        orientationIndex: Number(orientationIndex), 
                        row, 
                        col 
                    }
                }
            }
        }
    }
}

function getVariableName(variable: Variable): string {
    return `Z_p${variable.pieceIndex}_o${variable.orientationIndex}_r${variable.row}_c${variable.col}`;
}

function getConstraints(testCase: TestCase, pieces: Piece[][], variables: Variable[]): Record<string, Constraint> {
    return {
        ...getPieceCountConstraints(testCase, pieces, variables),
        ...getConstraintOverlappingCells(testCase, pieces, variables)
    }
}

function getPieceCountConstraints(testCase: TestCase, pieces: Piece[][], variables: Variable[]): Record<string, Constraint> {
    const constraints: Record<string, Constraint> = {};
    
    for (let pieceIndex = 0; pieceIndex < pieces.length; pieceIndex++) {
        const maxCount = testCase.pieceCounts[pieceIndex];
        if (maxCount === 0) continue;
        
        const pieceConstraint: Record<string, number> = {};
        
        // Find all variables that use this piece (any orientation, position)
        for (const variable of variables) {
            if (variable.pieceIndex === pieceIndex) {
                pieceConstraint[getVariableName(variable)] = 1;
            }
        }
        
        // Total placements of this piece must equal maxCount
        if (Object.keys(pieceConstraint).length > 0) {
            constraints[`piece_${pieceIndex}_count`] = { ...pieceConstraint, equal: maxCount };
        }
    }
    
    return constraints;
}

function getConstraintOverlappingCells(testCase: TestCase, pieces: Piece[][], variables: Variable[]): Record<string, Constraint> {
    const constraints: Record<string, Constraint> = {};
    
    for (let r = 0; r < testCase.height; r++) {
        for (let c = 0; c < testCase.width; c++) {
            const cellConstraint: Record<string, number> = {};
            
            // Find all variables that would place a piece covering this cell
            for (const variable of variables) {
                const piece = pieces[variable.pieceIndex][variable.orientationIndex];
                const pieceHeight = piece.length;
                const pieceWidth = piece[0].length;
                
                // Check if this variable's placement covers cell (r, c)
                const relativeRow = r - variable.row;
                const relativeCol = c - variable.col;
                
                if (relativeRow >= 0 && relativeRow < pieceHeight && 
                    relativeCol >= 0 && relativeCol < pieceWidth &&
                    piece[relativeRow][relativeCol]) {
                    // This piece placement covers this cell
                    cellConstraint[getVariableName(variable)] = 1;
                }
            }
            
            // Each cell can be covered by at most 1 piece
            if (Object.keys(cellConstraint).length > 0) {
                constraints[`cell_r${r}_c${c}`] = { ...cellConstraint, max: 1 };
            }
        }
    }
    
    return constraints;
}