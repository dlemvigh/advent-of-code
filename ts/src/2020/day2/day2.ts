export function parseLine(input: string): [number, number, string, string] {
  const regex = /(\d+)-(\d+) (\w): (\w+)/;
  const match = input.match(regex);

  if (match) {
    const [_, min, max, letter, password] = match;
    return [Number(min), Number(max), letter, password];
  }

  throw new Error("unable to parse line");
}

export function validate(
  min: number,
  max: number,
  letter: string,
  password: string
): boolean {
  const r = new RegExp(letter, "g");
  const matches = password.match(r);

  const len = matches ? matches.length : 0;
  return min <= len && len <= max;
}

function xor(a: boolean, b: boolean): boolean {
  return Boolean(Number(a) ^ Number(b));
}

export function validatePosition(
  left: number,
  right: number,
  letter: string,
  password: string
) {
  return xor(password[left - 1] === letter, password[right - 1] === letter);
}
