import { DirectedGraph as Graph } from "graphology"
import { topologicalSort } from 'graphology-dag';
import { splitIntoLines } from "../../util";

export function part1(input: string) {
    const graph = parseInput(input)
    return getPathCount(graph, "you", "out")
}

function getPathCount(graph: Graph, start: string, end: string) {
  const paths: Record<string, number> = {};
  const order = topologicalSort(graph);

  // Initialize all nodes to 0 paths
  order.forEach(node => paths[node] = 0);
  paths[start] = 1;

  // DP
  for (const node of order) {
    const count = paths[node];
    if (count === 0) continue;

    for (const next of graph.outNeighbors(node)) {
      paths[next] += count;
    }
  }

  return paths[end];
}
export function part2(input: string) {
    const graph = parseInput(input)
    
    // Path 1 : svr -> fft -> dac -> out
    const p1a = getPathCount(graph, "svr", "fft")
    const p2a = getPathCount(graph, "fft", "dac")
    const p3a = getPathCount(graph, "dac", "out")
    const p1 = p1a * p2a * p3a

    // Path 2 : svr -> dac -> fft -> out
    const p1b = getPathCount(graph, "svr", "dac")
    const p2b = getPathCount(graph, "dac", "fft")
    const p3b = getPathCount(graph, "fft", "out")
    const p2 = p1b * p2b * p3b

    return p1 + p2

    // debugger
    // const filteredPaths = paths.filter(path => path.includes("fft") && path.includes("dac"))
    // return filteredPaths.length
}



function parseInput(input: string) {
    const graph = new Graph()
    const lines = splitIntoLines(input)

    const ensureNode = (node: string) => {
        if (!graph.hasNode(node)) {
            graph.addNode(node)
        }
    }

    for (const line of lines) {
        const [src, rest] = line.split(": ")
        const dests = rest.split(" ")
        ensureNode(src)
        for (const dest of dests) {
            ensureNode(dest)
            graph.addEdge(src, dest)
        }
    }
    return graph
}