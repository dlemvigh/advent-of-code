import { solve, type Model, type Constraint } from "yalps";

export function solveLine(input: string): number {
    const { vectors, target } = parseInput(input);
    const dist = ilpSolve(vectors, target)
    return dist
}

function parseInput(input: string) {
    const match = input.match(/\[(.*)\] (\(.*\)) \{(.*)\}/)
    if (!match) throw new Error("Invalid input format");

    const buttons = parseButtons(match[2]);
    const target = parseTarget(match[3]);

    const origin = target.map(() => 0)
    const vectors = buttons.map(button => target.map((_, index) => button.includes(index) ? 1 : 0));

    return { origin, vectors, target };
}

function parseButtons(input: string) {
    return input.split(" ").map(parseButton)
}

function parseButton(input: string) {
    return input.slice(1, -1).split(",").map(Number)
}

function parseTarget(input: string) {
    return input.split(",").map(Number);
}

function ilpSolve(vectors: number[][], target: number[]) {
    // Build constraints - each dimension must equal target value
    const constraints: Record<string, Constraint> = {};
    for (let dimIndex = 0; dimIndex < target.length; dimIndex++) {
        constraints[`d${dimIndex}`] = { equal: target[dimIndex] };
    }

    // Build variables - each vector has a coefficient for each dimension
    const variables: Record<string, Record<string, number>> = {};
    for (let vecIndex = 0; vecIndex < vectors.length; vecIndex++) {
        const varName = `v${vecIndex}`;
        variables[varName] = { coeff: 1 }; // objective coefficient
        
        // Add coefficients for each constraint/dimension
        for (let dimIndex = 0; dimIndex < target.length; dimIndex++) {
            variables[varName][`d${dimIndex}`] = vectors[vecIndex][dimIndex];
        }
    }

    // Build model
    const model: Model = {
        direction: "minimize",
        objective: "coeff",
        constraints,
        variables,
        integers: vectors.map((_, i) => `v${i}`), // all variables must be integers
    };

    // Solve
    const solution = solve(model);
    
    if (solution.status !== "optimal") {
        throw new Error(`No solution found: ${solution.status}`);
    }

    return solution.result;
}
