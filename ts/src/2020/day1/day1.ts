export function search(values: number[], target = 2020) {
  let i = 0,
    j = values.length - 1;
  while (true) {
    // loop
    if (i === j) {
      //break
      return;
    }
    const value = values[i] + values[j];
    if (value === target) {
      return [values[i], values[j], values[i] * values[j]];
    }
    if (value < target) {
      i++;
    } else {
      j--;
    }
  }
}

export function part1(input: string, target = 2020) {
  const values = input.split("\n").map(Number);
  values.sort();

  return search(values, target);
}

function part2old(input: string, target = 2020) {
  const values = input.split("\n").map(Number);
  values.sort();
  for (let a = 0; a < input.length - 2; a++) {
    for (let b = a + 1; b < input.length - 1; b++) {
      for (let c = input.length - 1; c > b; c--) {
        const value = values[a] + values[b] + values[c];
        if (value < target) {
          break;
        }
        if (value === target) {
          return values[a] * values[b] * values[c];
        }
      }
    }
  }
}

export function part2(input: string, target = 2020) {
  const values = input.split("\n").map(Number);
  values.sort();

  for (let a = 0; a < input.length - 2; a++) {
    let cLimit = input.length - 1;
    for (let b = a + 1; b < input.length - 1; b++) {
      for (let c = cLimit; c > b; c--) {
        const value = values[a] + values[b] + values[c];
        if (value < target) {
          cLimit = c;
          break;
        }
        if (value === target) {
          return values[a] * values[b] * values[c];
        }
      }
    }
  }
}

export default { part1, part2 };
