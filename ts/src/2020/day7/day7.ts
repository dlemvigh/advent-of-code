import { splitIntoLines } from "../../util";

const emptyRegex = /(\w+ \w+) bags contain no other bags./;
const nonemptyRegex = /(\w+ \w+) bags contain (?:(\d) (\w+ \w+) bags?)(?:, (?:(\d) (\w+ \w+) bags?))*\./;
const nonemptyRegex2 = /(\w+ \w+) bags contain (.*)\./;
const bagRegex = /(\d+) (\w+ \w+) bags?/;

export function getOrCreate(graph: Graph, color: string) {
  if (!(color in graph)) {
    graph[color] = {
      color,
      edges: [],
    };
  }
  return graph[color];
}

export function parseInput(input: string): Graph {
  const graph: Graph = {};
  const lines = splitIntoLines(input);
  lines.forEach((line) => {
    const emptyMatch = line.match(emptyRegex);
    if (emptyMatch) {
      // add empty node
      const color = emptyMatch[1];
      getOrCreate(graph, color);
      return;
    }

    const [color, bags] = getBags(line);
    const node: Node = getOrCreate(graph, color);
    for (let [count, otherColor] of bags) {
      const otherNode: Node = getOrCreate(graph, otherColor);
      const edge: Edge = {
        from: color,
        to: otherColor,
        count,
      };
      node.edges.push(edge);
      otherNode.edges.push(edge);
    }
  });
  return graph;
}

export function getBags(input: string): [string, [number, string][]] {
  const nonemptyRegex2 = /(\w+ \w+) bags contain (.*)\./;
  const [_, color, rest] = input.match(nonemptyRegex2);
  const tokens = rest.split(", ");
  const bags = tokens.map<[number, string]>((bag) => {
    const [_, count, color] = bag.match(bagRegex);
    return [Number(count), color];
  });
  return [color, bags];
}

interface Graph {
  [color: string]: Node;
}

interface Node {
  color: string;
  edges: Edge[];
}

interface Edge {
  from: string;
  to: string;
  count: number;
}

function isEmpty(node: Node) {
  return node.edges == null || node.edges.length === 0;
}

export function traverseBack(
  graph: Graph,
  color: string = "shiny gold"
): Set<string> {
  //   console.log("back from", color);
  const bags = new Set<string>();
  const edges = graph[color].edges.filter((x) => x.to === color);
  edges.forEach((edge) => {
    bags.add(edge.from);
    const recBags = traverseBack(graph, edge.from);
    recBags.forEach((x) => bags.add(x));
  });
  return bags;
}

export function traverseBagCountWithMemo(
  graph: Graph,
  color: string = "shiny gold"
) {
  const memo: { [color: string]: number } = {};
  function traverseBagCount(
    graph: Graph,
    color: string = "shiny gold"
  ): number {
    if (color in memo) {
      return memo[color];
    }
    // console.log("color", color);

    const edges = graph[color].edges;
    if (edges.length === 0) {
      memo[color] = 1;
    } else {
      const count = edges
        .filter((edge) => edge.from === color)
        .reduce((sum, edge) => {
          const count = traverseBagCount(graph, edge.to) * edge.count;
          return sum + count;
        }, 1);
      memo[color] = count;
    }
    // console.log("count", color, memo[color]);
    return memo[color];
  }
  return traverseBagCount(graph, color);
}
