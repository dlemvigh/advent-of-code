export function parseSeatId(input: string) {
  const row = parseRow(input.substr(0, 7));
  const column = parseColumn(input.substr(7));
  return row * 8 + column;
}

export function parseRow(input: string): number {
  return toBin(input, "F", "B");
}

export function parseColumn(input: string): number {
  return toBin(input, "L", "R");
}

function toBin(input: string, zero: string, one: string): number {
  const bin = input
    .split("")
    .map((x) => {
      switch (x) {
        case zero:
          return 0;
        case one:
          return 1;
        default:
          throw new Error(`unknown input: ${x}`);
      }
    })
    .join("");
  return parseInt(bin, 2);
}
