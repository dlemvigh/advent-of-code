import { sumBy } from "../math";
import { splitAndMapIntoLines } from "../util";

export type TreeMap = number[][];
export type VisibilityMap = boolean[][];

export function parseInput(input: string): TreeMap {
  const treeMap = splitAndMapIntoLines(input, (line) => line.split("").map(Number));
  Object.freeze(treeMap);
  treeMap.map((row) => Object.freeze(row));
  return treeMap;
}

export function getVisibilityFromLeft(trees: TreeMap): VisibilityMap {
  return trees.map((row) => {
    let tallestTree = -1;
    return row.map((tree) => {
      const isVisible = tree > tallestTree;
      tallestTree = Math.max(tree, tallestTree);
      return isVisible;
    });
  });
}
export function getVisibilityFromTop(trees: TreeMap): VisibilityMap {
  let tallestTree = Array.from(trees[0], () => -1);
  return trees.map((row) => {
    return row.map((tree, index) => {
      const isVisible = tree > tallestTree[index];
      tallestTree[index] = Math.max(tree, tallestTree[index]);
      return isVisible;
    });
  });
}
export function getVisibilityFromRight(trees: TreeMap): VisibilityMap {
  return trees.map((row) => {
    let tallestTree = -1;
    return row
      .slice()
      .reverse()
      .map((tree) => {
        const isVisible = tree > tallestTree;
        tallestTree = Math.max(tree, tallestTree);
        return isVisible;
      })
      .slice()
      .reverse();
  });
}
export function getVisibilityFromBottom(trees: TreeMap): VisibilityMap {
  let tallestTree = Array.from(trees[0], () => -1);
  return trees
    .slice()
    .reverse()
    .map((row) => {
      return row.map((tree, index) => {
        const isVisible = tree > tallestTree[index];
        tallestTree[index] = Math.max(tree, tallestTree[index]);
        return isVisible;
      });
    })
    .slice()
    .reverse();
}

export function getVisibility(trees: TreeMap): VisibilityMap {
  const top = getVisibilityFromTop(trees);
  const right = getVisibilityFromRight(trees);
  const bottom = getVisibilityFromBottom(trees);
  const left = getVisibilityFromLeft(trees);

  const visibility = compbineVisibility(top, right, bottom, left);
  return visibility;
}

export function countVisible(visibility: VisibilityMap): number {
  return sumBy(visibility, (row) => sumBy(row, (x) => +x));
}

export function compbineVisibility(...visibilityMaps: VisibilityMap[]): VisibilityMap {
  return visibilityMaps.reduce((prevMap, currMap) => {
    const nextMap = prevMap.map((prevRow, indexRow) => {
      const currRow = currMap[indexRow];
      return prevRow.map<boolean>((prev, index) => {
        const curr = currRow[index];
        const next = prev || curr;
        return next;
      });
    });
    return nextMap;
  });
}

export function part1(input: string) {
  const trees = parseInput(input);
  const visibility = getVisibility(trees);
  return countVisible(visibility);
}

export type Dimentions = { width: number, height: number }
export function getMapDimensions(treeMap: TreeMap): Dimentions {
    const height = treeMap.length;
    const width = treeMap[0].length
    return { width, height };
}

export type Direction = { dr: -1 | 0 | 1, dc: -1 | 0 | 1 };
export const DirLeft: Direction = { dr: 0, dc: -1 }
export const DirUp: Direction = { dr: -1, dc: 0}
export const DirRight: Direction = { dr: 0, dc: 1}
export const DirDown: Direction = { dr: 1, dc: 0}

export function getScenicScore(treeMap: TreeMap, row: number, col: number): number {
    const dim = getMapDimensions(treeMap);
    const scoreLeft = getScenicScoreDir(treeMap, row, col, DirLeft, dim);
    const scoreUp = getScenicScoreDir(treeMap, row, col, DirUp, dim);
    const scoreRight = getScenicScoreDir(treeMap, row, col, DirRight, dim);
    const scoreDown = getScenicScoreDir(treeMap, row, col, DirDown, dim);
    const score = scoreLeft * scoreUp * scoreRight * scoreDown;
    return score;
}

export function getScenicScoreDir(treeMap: TreeMap, row: number, col: number, dir: Direction, dim: Dimentions = getMapDimensions(treeMap)): number {
    let score = 0;
    const self = treeMap[row][col];
    for (
        let r = row + dir.dr, c = col + dir.dc;
        0 <= r && r < dim.height && 0 <= c && c < dim.width;
        r += dir.dr, c += dir.dc
    ) {
        const tree = treeMap[r][c];
        score += 1;
        if (tree >= self) {
            break;
        }
    }
    return score;
}

export function findMaxScenicScore(treeMap: TreeMap): number {
    const dim = getMapDimensions(treeMap);
    let maxScore = 0
    for (let row = 1; row < dim.height - 1; row++) {
        for (let col = 1; col < dim.width - 1; col++) {
            const score = getScenicScore(treeMap, row, col);
            maxScore = Math.max(score, maxScore);
        }
    }
    return maxScore;
}

export function part2(input: string) {
    const treeMap = parseInput(input);
    const score = findMaxScenicScore(treeMap);
    return score;
}
