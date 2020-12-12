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
  const [height, width] = getSize(lines);

  const getNear = (lines: string[], x: number, y: number) =>
    NEAR.map<Pos>(([dx, dy]) => [x + dx, y + dy])
      .filter(([x, y]) => x >= 0 && x < width && y >= 0 && y < height)
      .map(([x, y]) => lines[y][x]);

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
    console.log("it", it);
    return lines;
  };

  const final = generateTillStale(lines);
  //   console.log("final");
  //   console.log(final.join("\n"));
  return final.join("").match(/#/g).length;
}

function getSize(lines: string[]): [number, number] {
  const height = lines.length;
  const width = lines[0].length;
  return [height, width];
}

export function part2(input: string) {
  let lines = splitIntoLines(input);
  const [height, width] = getSize(lines);

  const nearMemo = {};
  const getNear = (lines: string[], x: number, y: number) => {
    const id = y * width + x;
    if (!(id in nearMemo)) {
    }
  };
}
