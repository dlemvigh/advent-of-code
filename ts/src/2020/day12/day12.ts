import { splitIntoLines } from "../../util";

export function part1(input: string): number {
  const lines = splitIntoLines(input);
  let ew = 0,
    ns = 0;
  let angle = 0;

  const move = (dist: number) => {
    if (angle === 0) {
      return (ew += dist);
    }
    if (angle === 90) {
      return (ns += dist);
    }
    if (angle === 180) {
      return (ew -= dist);
    }
    if (angle === 270) {
      return (ns -= dist);
    }
  };

  const moves = [];
  lines.forEach((line) => {
    const text = `so far (e/w: ${ew} n/s: ${ns}, angle: ${angle}) -> ${line}`;
    moves.push(text);
    let value = Number(line.substr(1));
    switch (line[0]) {
      case "N":
        return (ns += value);
      case "S":
        return (ns -= value);
      case "E":
        return (ew += value);
      case "W":
        return (ew -= value);
      case "L":
        return (angle = (angle + value) % 360);
      case "R":
        return (angle = (angle - value + 360) % 360);
      case "F":
        return move(value);
    }
  });

  //   console.log(moves.join("\n"));

  return Math.abs(ew) + Math.abs(ns);
}

export function part2(input: string): number {
  let shipX = 0,
    shipY = 0;
  let wayX = 10,
    wayY = 1;

  const calcDelta = () => {
    const dx = wayX - shipX;
    const dy = wayY - shipY;
    return [dx, dy];
  };
  const rotateVector = (
    angle: number,
    x: number,
    y: number
  ): [number, number] => {
    if (angle === 0) return [x, y];
    if (angle === 90) return [-y, x];
    if (angle === 180) return [-x, -y];
    if (angle === 270) return [y, -x];
    throw new Error(`Unknown angle: ${angle}`);
  };
  const rotate = (angle: number) => {
    const [rx, ry] = rotateVector(angle, wayX, wayY);
    wayX = rx;
    wayY = ry;
  };

  const op: { [op: string]: (value: number) => void } = {
    N: (y) => (wayY += y),
    S: (y) => (wayY -= y),
    E: (x) => (wayX += x),
    W: (x) => (wayX -= x),
    F: (value) => {
      shipX += wayX * value;
      shipY += wayY * value;
    },
    L: (angle) => rotate(angle),
    R: (angle) => rotate(360 - angle),
  };

  const moves = [];
  const lines = splitIntoLines(input);
  lines.forEach((line) => {
    // const text = `ship (${shipX},${shipY}), way (${wayX}, ${wayY})-> ${line}`;
    // moves.push(text);
    let value = Number(line.substr(1));
    op[line[0]](value);
  });

  //   console.log(moves.join("\n"));
  return Math.abs(shipX) + Math.abs(shipY);
}
