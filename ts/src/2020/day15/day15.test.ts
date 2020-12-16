function part1(input: number[], nth: number = 2020) {
  const lastSeenDict: { [value: number]: number } = {};
  const texts = [];
  // const output = [...input];

  for (let i = 0; i < input.length - 1; i++) {
    const value = input[i];
    lastSeenDict[value] = i + 1;
  }

  let prev = input[input.length - 1];
  for (let turn = input.length + 1; turn <= nth; turn++) {
    const lastSeen = lastSeenDict[prev];
    const next = lastSeen >= 0 ? turn - lastSeen - 1 : 0;
    // const text = `Turn ${turn}. Last number spoken ${prev}, on turn ${
    //   lastSeen || "never"
    // }, which was ${next} turns ago.`;
    // texts.push(text);
    lastSeenDict[prev] = turn - 1;
    prev = next;
    // output.push(prev);
    // output.push(next);
  }
  // console.log(texts.join("\n"));
  // console.log(output.join(","));
  return prev;
}

describe("part 1", () => {
  const cases: [number[], number][] = [
    [[0, 3, 6], 436],
    [[1, 3, 2], 1],
    [[2, 1, 3], 10],
    [[1, 2, 3], 27],
    [[2, 3, 1], 78],
    [[3, 2, 1], 438],
    [[3, 1, 2], 1836],
    [[14, 1, 17, 0, 3, 20], 387],
  ];

  cases.slice(1, 2).forEach(([input, expected]) => {
    it(`${input.join(",")}`, () => {
      const res = part1(input, 2020);
      expect(res).toBe(expected);
    });
  });
});

describe("part 2 (very slow)", () => {
  const cases: [number[], number][] = [
    // [[0, 3, 6], 175594],
    // [[1, 3, 2], 1],
    // [[2, 1, 3], 10],
    // [[1, 2, 3], 27],
    // [[2, 3, 1], 78],
    // [[3, 2, 1], 438],
    // [[3, 1, 2], 1836],
    [[14, 1, 17, 0, 3, 20], 6428],
  ];

  cases.forEach(([input, expected]) => {
    it.skip(`${input.join(",")}`, () => {
      const res = part1(input, 30000000);
      expect(res).toBe(expected);
    });
  });
});
