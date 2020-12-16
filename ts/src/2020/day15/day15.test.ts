function part1(input: number[], nth: number = 2020) {
  const lastSeenDict = new Map<Number, number>();

  for (let i = 0; i < input.length - 1; i++) {
    const value = input[i];
    lastSeenDict.set(value, i + 1);
  }

  let prev = input[input.length - 1];
  for (let turn = input.length + 1; turn <= nth; turn++) {
    const lastSeen = lastSeenDict.get(prev);
    const next = lastSeen >= 0 ? turn - lastSeen - 1 : 0;
    lastSeenDict.set(prev, turn - 1);
    prev = next;
  }

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
    [[0, 3, 6], 175594],
    [[1, 3, 2], 2578],
    [[2, 1, 3], 3544142],
    [[1, 2, 3], 261214],
    [[2, 3, 1], 6895259],
    [[3, 2, 1], 18],
    [[3, 1, 2], 362],
  ];

  cases.forEach(([input, expected]) => {
    it.skip(`${input.join(",")}`, () => {
      const res = part1(input, 30000000);
      expect(res).toBe(expected);
    });
  });

  it(`solution`, () => {
    const input = [14, 1, 17, 0, 3, 20];
    const res = part1(input, 30000000);
    expect(res).toBe(6428);
  });
});
