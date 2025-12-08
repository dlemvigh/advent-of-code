import { UndirectedGraph as Graph } from "graphology"
import { connectedComponents } from 'graphology-components';
import { splitAndMapIntoLines } from "../../util"

export function part1(input: string, size: number) {
    const graph = parseInput(input)
    addShortestEdges(graph, size)

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

    return graph
}

function addShortestEdges(graph: Graph<Node, Edge>, maxEdges: number) {
        const nodes = Array.from(graph.nodeEntries())

    // Calculate all possible edges with their weights
    const edges: Array<{ from: string, to: string, weight: number }> = []
    for (let i = 0; i < nodes.length; i++) {
        const from = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
            const to = nodes[j]
            
            const dx = from.attributes.x - to.attributes.x
            const dy = from.attributes.y - to.attributes.y
            const dz = from.attributes.z - to.attributes.z
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
            
            edges.push({ from: from.node, to: to.node, weight: dist })
        }
    }

    // Sort by weight and keep only the N shortest edges
    edges.sort((a, b) => a.weight - b.weight)
    const edgesToAdd = edges.slice(0, maxEdges)
    
    // Add only the shortest edges to the graph
    for (const edge of edgesToAdd) {
        graph.addEdge(edge.from, edge.to, { weight: edge.weight })
    }    
}


