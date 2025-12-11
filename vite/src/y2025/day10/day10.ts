import { DirectedGraph as Graph } from "graphology";
import { dijkstra } from "graphology-shortest-path"
import { solve, type Model, type Constraint } from "yalps";
import { splitIntoLines } from "../../util";

export function part1(input: string) {
    const lines = splitIntoLines(input)
    const subparts = lines.map(part1subpart)
    const sum = subparts.reduce((a, b) => a + b, 0);
    return sum
}

function part1subpart(input: string) {
    const { lights, buttons } = parseInput(input);
    const graph = generateGraph(lights, buttons);

    const from = Array.from({ length: lights.length }, () => ".").join("");
    const to = lights

    const path = dijkstra.bidirectional(graph, from, to)

    return path.length - 1;
}

export function part2(input: string) {
    const lines = splitIntoLines(input)
    const subparts = lines.map(part2subpart)
    const sum = subparts.reduce((a, b) => a + b, 0);
    return sum

}

function part2subpart(input: string): number {
    const { vectors, target } = parseInput2(input);
    const dist = ilpSolve(vectors, target)
    return dist
}

function parseInput(input: string) {
    const match = input.match(/\[(.*)\] (\(.*\)) \{(.*)\}/)
    if (!match) throw new Error("Invalid input format");
    const lights = parseLights(match[1]);
    const buttons = parseButtons(match[2]);
    const target = parseTarget(match[3]);
    return { lights, buttons, target };
}

function parseInput2(input: string) {
    const match = input.match(/\[(.*)\] (\(.*\)) \{(.*)\}/)
    if (!match) throw new Error("Invalid input format");

    const buttons = parseButtons(match[2]);
    const target = parseTarget(match[3]);

    const origin = target.map(() => 0)
    const vectors = buttons.map(button => target.map((_, index) => button.includes(index) ? 1 : 0));

    return { origin, vectors, target };
}


function parseLights(input: string) {
    return input;
}

function fromLightString(input: string) {
    return input.split("").map(parseLight)
}

function toLightString(lights: boolean[]) {
    return lights.map(light => light ? "#" : ".").join("");
}

function parseLight(input: string) {
    switch (input) {
        case ".": return false;
        case "#": return true;
        default: throw new Error("Invalid light character");
    }
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


function generateGraph(lights: string, buttons: number[][]) {
    const graph = new Graph()

    // generate all possible light configurations
    const lightConfigs = getAllPossibleLightConfigurations(lights.length);

    // Add all configurations as nodes
    for (const config of lightConfigs) {
        graph.addNode(config);
    }

    // Add edges for each button press
    for (const from of lightConfigs) {
        for (const button of buttons) {
            const to = applyButton(from, button);
            graph.addEdge(from, to);
        }
    }

    return graph;
}

function getAllPossibleLightConfigurations(length: number): string[] {
    if (length <= 0) return [];
    if (length === 1) return [".", "#"];

    const smallerConfigs = getAllPossibleLightConfigurations(length - 1);

    return [
        ...smallerConfigs.map(config => "." + config),
        ...smallerConfigs.map(config => "#" + config)
    ]
}

function applyButton(lights: string, button: number[]): string {
    const lightArray = fromLightString(lights);
    for (const index of button) {
        lightArray[index] = !lightArray[index];
    }
    const newLights = toLightString(lightArray);
    return newLights;
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
