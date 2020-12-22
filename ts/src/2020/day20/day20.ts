import { match } from "assert";
import { splitIntoGroups } from "../../util";

interface Tile {
  id: number;
  img: string[];
  edges: string[];
  reverseEdges: string[];
}

export function parseInput(input: string): Tile[] {
  const groups = splitIntoGroups(input);
  const tiles = groups.map<Tile>((group) => {
    const id = Number(group[0].substr(5, 4));
    const img = group.slice(1);
    const edges = calcEdges(img);
    const reverseEdges = edges.map(reverse);

    return { id, img, edges, reverseEdges };
  });

  return tiles;
}

function sum(list: number[]): number {
  return list.reduce((a, b) => a + b, 0);
}

function calcEdges(tile: string[]): string[] {
  const edges = [
    getTopEdge(tile),
    getRightEdge(tile),
    getBottomEdge(tile),
    getLeftEdge(tile),
  ];
  return edges;
}

function getTopEdge(img: string[]): string {
  return img[0];
}

function getBottomEdge(img: string[]): string {
  const edge = img[img.length - 1];
  return reverse(edge);
}

function getRightEdge(img: string[]): string {
  const edge = img.map((line) => line[line.length - 1]);
  return edge.join("");
}

function getLeftEdge(img: string[]): string {
  const edge = img.map((line) => line[0]);
  edge.reverse();
  return edge.join("");
}

function flip(tile: Tile): Tile {
  const { id, img } = tile;
  const edges = tile.reverseEdges;
  const reverseEdges = tile.edges;
  return { id, img, edges, reverseEdges };
}

function reverse(input: string): string {
  return input.split("").reverse().join("");
}

function tilesHaveMatchingEdge(a: Tile, b: Tile) {
  return a.edges.some((edgeA) =>
    b.reverseEdges.some((edgeB) => edgeA === edgeB)
  );
}

function tilesHaveMatchingEdgeOrFlippedEdge(a: Tile, b: Tile) {
  return a.edges.some(
    (edgeA) =>
      b.edges.some((edgeB) => edgeA === edgeB) ||
      b.reverseEdges.some((edgeB) => edgeA === edgeB)
  );
}

function calcMatchMatrix(tiles: Tile[]) {
  const matrix = Array.from({ length: tiles.length }, () =>
    Array.from({ length: tiles.length }, () => false)
  );

  for (let i = 0; i < tiles.length - 1; i++) {
    for (let j = i + 1; j < tiles.length; j++) {
      const match = tilesHaveMatchingEdgeOrFlippedEdge(tiles[i], tiles[j]);
      matrix[i][j] = match;
      matrix[j][i] = match;
    }
  }

  return matrix;
}

function calcMatchCount(tiles: Tile[]) {
  const matrix = calcMatchMatrix(tiles);
  return matrix.map((row) => sum(row.map(Number)));
}

function calcGrouped(matchCount: number[]) {
  const grouped: { [matches: number]: number } = {};
  matchCount.forEach((x) => {
    grouped[x] = 1 + (grouped[x] || 0);
  });
  return grouped;
}

function printProgres(tiles: Tile[]) {
  const matchCount = calcMatchCount(tiles);
  const matchSum = sum(matchCount);
  const grouped = calcGrouped(matchCount);
  console.log("sum", matchSum, "groups", grouped);
}

function printMatrix(matrix: boolean[][]) {
  console.log(
    matrix
      .map((row, index) => {
        const matches = row.map((x) => Number(x)).join(", ");
        const count = sum(row.map(Number));
        return `${index}: ${matches} = ${count}`;
      })
      .join("\n")
  );
}

export function part1(tiles: Tile[]) {
  const counts = calcMatchCount(tiles);
  const cornerTiles = tiles
    .filter((_, index) => counts[index] === 2)
    .map((tile) => tile.id);
  const res = cornerTiles.reduce((acc, val) => acc * val);
  return res;
}
