import { splitIntoLines } from "../../util";

type Pos = [number, number];

const NEAR: Pos[] = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

export function part1(input: string) {
  let lines = splitIntoLines(input);

  const generation = (lines: string[]): string[] =>
    lines.map((line, y) =>
      line
        .split("")
        .map((seat, x) => {
          if (seat === ".") return seat;
          if (seat === "L") {
            if (getNear(lines, x, y).filter((n) => n === "#").length === 0) {
              return "#";
            } else {
              return "L";
            }
          }
          if (seat === "#") {
            if (getNear(lines, x, y).filter((n) => n === "#").length >= 4) {
              return "L";
            } else {
              return "#";
            }
          }
        })
        .join("")
    );

  const generateTillStale = (lines: string[]) => {
    let it = 0;
    while (true) {
      it++;
      const prev = lines.join("");
      lines = generation(lines);
      const next = lines.join("");
      if (prev === next) break;
    }
    return lines;
  };

  const final = generateTillStale(lines);
  return final.join("").match(/#/g).length;
}

function getSize(lines: string[]): [number, number] {
  const height = lines.length;
  const width = lines[0].length;
  return [height, width];
}

function getNear(lines: string[], x: number, y: number) {
  const [height, width] = getSize(lines);
  return NEAR.map<Pos>(([dx, dy]) => [x + dx, y + dy])
    .filter(([x, y]) => x >= 0 && x < width && y >= 0 && y < height)
    .map(([x, y]) => lines[y][x]);
}

export function getLineOfSightMap(lines: string[]): Pos[][][] {
  const [height, width] = getSize(lines);
  const none = [];
  const map = lines.map((line, y) => {
    return line.split("").map<Pos[]>((char, x) => {
      if (char === ".") return none;
      return NEAR.map(([dx, dy]) => {
        let ix = x,
          iy = y;
        while (true) {
          ix += dx;
          iy += dy;
          if (ix < 0 || ix >= width || iy < 0 || iy >= height) return null;
          // if (x === 0 && y === 0) {
          //   console.log("sight", x, y, ix, iy, lines[iy][ix]);
          // }
          if (lines[iy][ix] !== ".") return [ix, iy];
        }
      }).filter((x) => x !== null);
    });
  });
  return map;
}

export function part2(input: string) {
  let lines = splitIntoLines(input);
  const map = getLineOfSightMap(lines);

  const generation = (lines: string[]): string[] =>
    lines.map((line, y) =>
      line
        .split("")
        .map((seat, x) => {
          if (seat === ".") return seat;
          const near = map[y][x].map(([nx, ny]) => lines[ny][nx]);
          if (seat === "L") {
            if (near.filter((n) => n === "#").length === 0) {
              return "#";
            } else {
              return "L";
            }
          }
          if (seat === "#") {
            if (near.filter((n) => n === "#").length >= 5) {
              return "L";
            } else {
              return "#";
            }
          }
        })
        .join("")
    );

  const generateTillStale = (lines: string[]) => {
    let it = 0;
    while (true) {
      // console.log("generation", it);
      // console.log(lines.join("\n"));

      it++;
      const prev = lines.join("");
      lines = generation(lines);
      const next = lines.join("");
      if (prev === next) break;
    }
    return lines;
  };

  const final = generateTillStale(lines);
  return final.join("").match(/#/g).length;
}
