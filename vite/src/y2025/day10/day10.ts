import { DirectedGraph as Graph } from "graphology";
import { dijkstra } from "graphology-shortest-path"
import { splitIntoLines } from "../../util";

export function part1(input: string) {
    const lines = splitIntoLines(input)
    const subparts = lines.map(part1subpart1)
    const sum = subparts.reduce((a, b) => a + b, 0);
    return sum
}

function part1subpart1(input: string) {
    const { lights, buttons } = parseInput(input);
    const graph = generateGraph(lights, buttons);

    const from = Array.from({ length: lights.length }, () => ".").join("");
    const to = lights

    const path = dijkstra.bidirectional(graph, from, to)

    return path.length - 1;
}

export function part2(input: string) {

}

function parseInput(input: string) {
    const match = input.match(/\[(.*)\] (\(.*\)) \{(.*)\}/)
    if (!match) throw new Error("Invalid input format");
    const lights = parseLights(match[1]);
    const buttons = parseButtons(match[2]);
    return { lights, buttons };
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
