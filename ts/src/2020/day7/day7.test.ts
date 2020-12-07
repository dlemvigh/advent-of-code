import { readInput } from "../../util";
import {
  parseInput,
  traverseBack,
  getBags,
  traverseBagCountWithMemo,
} from "./day7";

describe("part 1", () => {
  it("sample", () => {
    const input = readInput(__dirname, "sample.txt");
    const graph = parseInput(input);
    const bags = traverseBack(graph, "shiny gold");
    expect(bags.size).toBe(4);
  });

  it("solution", () => {
    const input = readInput(__dirname);
    const graph = parseInput(input);
    const bags = traverseBack(graph, "shiny gold");
    expect(bags.size).toBe(287);
    // answer > 108
    // answer > 109
  });
  it("parse", () => {
    const input =
      "mirrored magenta bags contain 4 shiny turquoise bags, 2 bright gold bags, 4 plaid fuchsia bags, 4 wavy lime bags.";
    const [color, bags] = getBags(input);
    expect(color).toBe("mirrored magenta");
    expect(bags).toEqual([
      [4, "shiny turquoise"],
      [2, "bright gold"],
      [4, "plaid fuchsia"],
      [4, "wavy lime"],
    ]);
  });
});

describe("part 2", () => {
  it("sample", () => {
    const input = readInput(__dirname, "sample.txt");
    const graph = parseInput(input);
    const count = traverseBagCountWithMemo(graph) - 1;
    expect(count).toBe(48160);
  });

  it("sample 2", () => {
    const input = readInput(__dirname, "sample2.txt");
    const graph = parseInput(input);
    const count = traverseBagCountWithMemo(graph) - 1;
    expect(count).toBe(126);
  });

  it("solution", () => {
    const input = readInput(__dirname, "input.txt");
    const graph = parseInput(input);
    const count = traverseBagCountWithMemo(graph) - 1;
    expect(count).toBe(32);
  });
});
