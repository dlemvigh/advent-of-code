import { readInput, splitIntoGroups } from "../../util";

describe("part 1", () => {
  it("solution", () => {
    const input = readInput(__dirname);
    const groups = splitIntoGroups(input);
    // console.log("groups", groups);
    const counts = groups.map((group) => {
      const keys: { [key: string]: boolean } = {};
      const answers = group.join("").split("");
      answers.forEach((x) => (keys[x] = true));
      const count = Object.keys(keys).length;

      return count;
    });
    const count = counts.reduce((a, b) => a + b);

    expect(count).toBe(6387);
  });
});
//12771 too high

describe("part 2", () => {
  it("solution", () => {
    const input = readInput(__dirname);
    const groups = splitIntoGroups(input);
    // console.log("groups", groups);
    const counts = groups.map((group) => {
      const keys: { [key: string]: number } = {};
      const answers = group.join("").split("");
      answers.forEach((x) => (keys[x] = (keys[x] || 0) + 1));
      const count = Object.keys(keys).filter((x) => keys[x] === group.length)
        .length;
      return count;
    });
    const count = counts.reduce((a, b) => a + b);

    expect(count).toBe(6387);
  });
});
