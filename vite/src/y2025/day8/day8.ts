import { UndirectedGraph as Graph } from "graphology"
import { connectedComponents } from 'graphology-components';
import { splitAndMapIntoLines } from "../../util"

export function part1(input: string, size: number) {
    const graph = parseInput(input)
    keepOnlyNShortestEdges(graph, size)

    const components = connectedComponents(graph)
    components.sort((a, b) => b.length - a.length)

    const top3components = components.slice(0, 3)
    const top3sizes = top3components.map(c => c.length)
    const result = top3sizes.reduce((a, b) => a * b, 1)
    return result
}

export function part2(input: string) {

}

interface Node {
    x: number,
    y: number,
    z: number

}

interface Edge {
    weight: number
}

function parseInput(input: string): Graph<Node, Edge> {
    const lines = splitAndMapIntoLines(input, line => line.split(",").map(Number))

    const graph = new Graph<Node, Edge>()

    // Add all nodes
    for (const line of lines) {
        const [x, y, z] = line
        const nodeId = `${x},${y},${z}`
        graph.addNode(nodeId, { x, y, z })
    }

    // Add all edges
    const nodes = Array.from(graph.nodeEntries())
    for (const from of nodes) {
        for (const to of nodes) {
            if (from === to) continue
            if (graph.hasEdge(from.node, to.node)) continue

            const dx = from.attributes.x - to.attributes.x
            const dy = from.attributes.y - to.attributes.y
            const dz = from.attributes.z - to.attributes.z
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
            graph.addEdge(from.node, to.node, { weight: dist } )
        }
    }

    return graph
}

function keepOnlyNShortestEdges(graph: Graph<Node, Edge>, n: number) {
    const edges = Array.from(graph.edgeEntries())

    // Sort edges by weight
    edges.sort((a, b) => a.attributes.weight - b.attributes.weight)

    // Keep only the n shortest edges
    // const edgesToKeep = edges.slice(0, n)
    const edgesToRemove = edges.slice(n)

    for (const edge of edgesToRemove) {
        graph.dropEdge(edge.edge)
    }
}


