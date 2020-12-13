export function part1(now: number, list: (number | null)[]): number {
  const nextArrival = list.map((id) => {
    if (id === null) return Number.MAX_VALUE;
    const earliest = now + id - (now % id);
    const wait = earliest - now;
    return wait;
  });

  const index = nextArrival.indexOf(Math.min(...nextArrival));

  return list[index] * nextArrival[index];
}

export function part2(list: (number | null)[]): number {
  const product = list.reduce((acc, val) => acc * (val || 1), 1);
  const parts = list.map((value, index) => {
    if (value == null) return 0;
    const factor = product / value;
    const target = (((value - index) % value) + value) % value;

    for (let i = 0; i <= value; i++) {
      if ((factor * i) % value === target) {
        // console.log(`f: ${value} - i: ${index} - [${i}*${factor}]`);
        return (factor * i) % product;
      }
    }
  });
  //   console.log(parts);

  const sum = parts.reduce((sum, val) => (sum + val) % product);
  return sum;
}
