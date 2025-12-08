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
    const graph = parseInput(input)
    addShortestEdgesTillFullyConnected(graph)

    const components = connectedComponents(graph)
    
    const edges = Array.from(graph.edgeEntries())
    const lastEdge = edges[edges.length - 1]

    const result = lastEdge.sourceAttributes.x * lastEdge.targetAttributes.x
    return result
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

function getAllPossibleEdges(graph: Graph<Node, Edge>) {
    const nodes = Array.from(graph.nodeEntries())

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

    edges.sort((a, b) => a.weight - b.weight)
    return edges
}

function addShortestEdges(graph: Graph<Node, Edge>, maxEdges: number) {
    const edges = getAllPossibleEdges(graph)


    // Sort by weight and keep only the N shortest edges
    edges.sort((a, b) => a.weight - b.weight)
    const edgesToAdd = edges.slice(0, maxEdges)
    
    // Add only the shortest edges to the graph
    for (const edge of edgesToAdd) {
        graph.addEdge(edge.from, edge.to, { weight: edge.weight })
    }    
}

function addShortestEdgesTillFullyConnected(graph: Graph<Node, Edge>) {
    const unconnectedNodes = new Set(graph.nodes())
    const edges = getAllPossibleEdges(graph)

    for (const edge of edges) {
        graph.addEdge(edge.from, edge.to, { weight: edge.weight })

        unconnectedNodes.delete(edge.from)
        unconnectedNodes.delete(edge.to)

        if (unconnectedNodes.size === 0) {
            break
        }
    }
}


