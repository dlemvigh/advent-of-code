function part1(input: number[], nth: number = 2020) {
  const lastSeenDict: { [value: number]: number[] } = {};
  const addSeen = (value, turn) => {
    const seens = lastSeenDict[value] || [];
    lastSeenDict[value] = [...seens, turn];
  };
  // let output = [...input];
  let prev: number;
  const texts = [];
  for (let turn = 1; turn <= nth; turn++) {
    if (turn <= input.length) {
      prev = input[turn - 1];
      addSeen(prev, turn);
    } else {
      const lastSeen = lastSeenDict[prev];
      let next =
        lastSeen && lastSeen.length >= 2
          ? lastSeen[lastSeen.length - 1] - lastSeen[lastSeen.length - 2]
          : 0;
      const text = `Turn ${turn}. Last number spoken ${prev}, on turn ${
        lastSeen || "never"
      }, which was ${next} turns ago.`;
      texts.push(text);
      addSeen(next, turn);
      prev = next;
      // output.push(next);
    }
  }
  // console.log(texts.join("\n"));
  // console.log("out", output.slice(2000));
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

  cases.forEach(([input, expected]) => {
    it(`${input.join(",")}`, () => {
      const res = part1(input, 2020);
      expect(res).toBe(expected);
    });
  });
});

describe.skip("part 2", () => {
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

  cases.forEach(([input, expected]) => {
    it(`${input.join(",")}`, () => {
      const res = part1(input, 2020);
      expect(res).toBe(expected);
    });
  });
});
