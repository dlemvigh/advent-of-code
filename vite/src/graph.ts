export type GraphKey = string | number;
export type GraphNode<K extends GraphKey, V = never> = {
    key: K,
    value: V,
    neighbors: Record<K, GraphNode<K, V>>;
};
export type Graph<K extends GraphKey, V> = {
    nodes: Record<K, GraphNode<K, V>>
}

export function graphFactory<K extends GraphKey, V>(): Graph<K, V> {
    return {
        nodes: {} as Record<K, GraphNode<K, V>>
    }
}

export function addNode<K extends GraphKey, V>(graph: Graph<K, V>, node: GraphNode<K, V>): GraphNode<K,V> {
    graph.nodes[node.key] = node;
    return node;
}

export function nodeFactory<K extends GraphKey, V>(key: K, value: V, neighbors: GraphNode<K>[] = []): GraphNode<K, V> {
    const node: GraphNode<K, V> = {
        key,
        value,
        neighbors: {} as Record<K, GraphNode<K>>
    }

    neighbors.forEach(neighbor => {
        node.neighbors[neighbor.key] = neighbor;
    })

    return node;
}

export function addEdge<K extends GraphKey, V>(from: GraphNode<K, V>, to: GraphNode<K, V>) {
    from.neighbors[to.key] = to;
}

export function addEdgeBi<K extends GraphKey, V>(from: GraphNode<K, V>, to: GraphNode<K, V>) {
    addEdge(from, to);
    addEdge(to, from);
}

// type Candidate<K extends GraphKey,V> = { node: GraphNode<K, V>, gScore: number, hScore: number }
export function dijkstra<K extends GraphKey, V>(
    graph: Graph<K, V>, 
    start: K, 
    end: K, 
) {
    // const startNode = graph.nodes[start] 
    // const endNode = graph.nodes[end];

    const openSet: K[] = [start];
    const prev = new Map<K,K>();
    const dist = new Map<K,number>([[start, 0]]);

    while (openSet.length > 0) {
        const current = openSet.shift()!;
        const currentNode = graph.nodes[current];
        const neighbors = Object.values<GraphNode<K,V>>(currentNode.neighbors);
        for (const nextNode of neighbors) {
            const next = nextNode.key
            const currentBest = dist.get(next) ?? Infinity;
            const newBest = dist.get(current)! + 1;
            if (currentBest == null || newBest < currentBest) {
                prev.set(next, current);
                dist.set(next, newBest);
                openSet.push(next);
                // if (next === end) {
                //     break;
                // }
            }
        }
    }
    return { prev, dist }
}