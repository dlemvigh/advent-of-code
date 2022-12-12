import { getOrtogonallyAdjacent } from "../adjacency";
import { addEdgeBi, addNode, dijkstra, Graph, graphFactory, GraphNode, nodeFactory } from "../graph";
import { splitAndMapIntoGrid } from "../util";

type Meta = {
    width: number, 
    height: number,
    start: GraphNode<string, GraphValue>,
    end: GraphNode<string, GraphValue>
}

type GraphType = Graph<string, GraphValue>;

type GraphValue = {
    row: number,
    col: number,
    char: string,
    height: number
  }
  
const A = 'a'.charCodeAt(0);
const Z = 'z'.charCodeAt(0)

export function charToHeight(char: string): number {
    if (char === "S") return 0;
    if (char === "E") return Z - A + 2;
    return char.charCodeAt(0) - A + 1;
}

export function nodeToKey(value: GraphValue): string {
    return coordsToKey(value.row, value.col);
}

export function coordsToKey(row: number, col: number): string {
    return `(${row}x${col})`;
}

export function parseNode(value: string, row: number, col: number): GraphValue {
    return {
        row,
        col,
        char: value,
        height: charToHeight(value)
    }
}

export function parseInput(input: string): [GraphType, Meta] {
    const graph = graphFactory<string, GraphValue>();
    let start: GraphNode<string, GraphValue>, 
        end: GraphNode<string, GraphValue>;
    const grid = splitAndMapIntoGrid(input, (value, row, col) => {
        const nodeKey = coordsToKey(row, col);
        const nodeValue = parseNode(value, row, col);
        const node = nodeFactory(nodeKey, nodeValue)
        if (node.value.char === "S") { start = node };
        if (node.value.char === "E") { end = node };
        return addNode(graph, node);
    });
    const height = grid.length;
    const width = grid[0].length;
    
    return [graph, { width, height, start: start!, end: end! }];
}

function addNeighbors(graph: Graph<string, GraphValue>, meta: Meta) {
    Object.values(graph.nodes).forEach(from => {
        const neighbors = getOrtogonallyAdjacent(from.value.row, from.value.col, meta.width, meta.height)
        neighbors.forEach(([row, col]) => {
            const key = coordsToKey(row, col);
            const to = graph.nodes[key];
            const heightDiff = Math.abs(to.value.height - from.value.height);
            if (heightDiff <= 1) {
                addEdgeBi(from, to);
            }
        })
    })
}

export function part1(input: string) {
    const [graph, meta] = parseInput(input);
    addNeighbors(graph, meta);
    const result = dijkstra(graph, meta.start.key, meta.end.key);
    // console.log("res", result);
    // console.log("S", meta.start)
    // console.log("E", meta.end)
    console.log(result.dist)
    for (let row = 0; row < meta.height; row++) {
        const distRow = [];
        for (let col = 0; col < meta.width; col++) {
            const key = coordsToKey(row, col);
            const d = result.dist.get(key);
            let str = d?.toString();
            // if (d == null) str = "";
            // if (d??0 < 10) str = " " + str;
            // if (d??0 < 100) str = " " + str;
            distRow.push(str);
        }
        console.log(distRow.join(","))
    }
    return result.dist.get(meta.end.key);
}

export function part2(input: string) {

}