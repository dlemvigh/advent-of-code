import { Model, Constraint, solve } from "yalps";
import { parseInput } from "./parse-input";
import { getAllDistincePieceOrientations } from "./piece-utils";
import { Piece, TestCase } from "./types";

export function part1(input: string, limit = Infinity) {
    const { pieces, testCases } = parseInput(input);
    const pieceOrientations = getAllDistincePieceOrientations(pieces);

    let validTestCases = 0
    for (const testCase of testCases.slice(0, limit)) {
        if (isTestCaseValid(testCase, pieceOrientations)) {
            validTestCases++
        }
    }
    return validTestCases
}

export function part2(input: string) {

}

function isTestCaseValid(testCase: TestCase, pieces: Piece[][]) {
    const model = getILPModel(testCase, pieces);
    const solution = solve(model);

    return solution.status === "optimal"
}


function getILPModel(testCase: TestCase, pieces: Piece[][]): Model {

    // get all possible placements of pieces in the grid
    // get all constraints
        // piece count constraints
        // no overlap constraints


    const variables = getAllVariables(testCase, pieces);

    const modelConstraints = getConstraints(testCase, pieces);

    const model: Model = {
        direction: "maximize",
        objective: "obj",
        binaries: true,
        variables,
        constraints: modelConstraints
    }

    return model
}

type Variable = Record<string, number>;
function getAllVariables(testCase: TestCase, pieces: Piece[][]): Record<string, Variable> {
    const variables: Record<string, Variable> = {};
    
    for (const pieceIndex in pieces) {
        if (testCase.pieceCounts[pieceIndex] === 0) continue;
        for (const orientationIndex in pieces[pieceIndex]) {
            const piece = pieces[pieceIndex][orientationIndex];
            const pieceHeight = piece.length;
            const pieceWidth = piece[0].length;
            for (let row = 0; row <= testCase.height - pieceHeight; row++) {
                for (let col = 0; col <= testCase.width - pieceWidth; col++) {
                    const variableName = `Z_p${pieceIndex}_o${orientationIndex}_r${row}_c${col}`;
                    const variable: Variable = {
                        obj: 1,
                        [`piece_${pieceIndex}`]: 1
                    }
                    for (let dr = 0; dr < pieceHeight; dr++) {
                        for (let dc = 0; dc < pieceWidth; dc++) {
                            if (piece[dr][dc]) {
                                const cellRow = row + dr;
                                const cellCol = col + dc;
                                const cellVarName = `cell_r${cellRow}_c${cellCol}`;
                                variable[cellVarName] = 1; // mark that this variable covers this cell
                            }
                        }
                    }
                    variables[variableName] = variable;
                }
            }
        }
    }

    return variables
}

function getConstraints(testCase: TestCase, pieces: Piece[][]): Record<string, Constraint> {
    return {
        ...getPieceCountConstraints(testCase, pieces),
        ...getConstraintOverlappingCells(testCase)
    }
}

function getPieceCountConstraints(testCase: TestCase, pieces: Piece[][]): Record<string, Constraint> {
    const constraints: Record<string, Constraint> = {};
    
    for (let pieceIndex = 0; pieceIndex < pieces.length; pieceIndex++) {
        const maxCount = testCase.pieceCounts[pieceIndex];
        if (maxCount === 0) continue;
        
        constraints[`piece_${pieceIndex}`] = { equal: maxCount };
    }
    
    return constraints;
}

function getConstraintOverlappingCells(testCase: TestCase): Record<string, Constraint> {
    const constraints: Record<string, Constraint> = {};
    
    for (let r = 0; r < testCase.height; r++) {
        for (let c = 0; c < testCase.width; c++) {
            constraints[`cell_r${r}_c${c}`] = { max: 1 };
        }
    }
    
    return constraints;
}