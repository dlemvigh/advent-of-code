import { describe, expect, it } from "vitest";
import {
  splitIntoLines,
  splitAndMapIntoLines,
  splitIntoGroups,
  splitAndMapIntoGroups,
  chunk,
} from "./util";

describe("map into lines", () => {
  it("simple text lines", () => {
    // arrange
    const input = "  aaa  \n  bbb  \r\n  ccc  ";

    // act
    const actual = splitIntoLines(input);

    // assert
    expect(actual).toEqual(["aaa", "bbb", "ccc"]);
  });

  it("text to numbers", () => {
    // arrange
    const input = "  0  \n  111  \n  222  \r\n  333  ";

    // act
    const actual = splitAndMapIntoLines(input, Number);

    // assert
    expect(actual).toEqual([0, 111, 222, 333]);
  });
});

describe("map into groups", () => {
  it("simple text", () => {
    // arrange
    const input = "a1 \n a2 \n\n b1 \n b2";

    // act
    const actual = splitIntoGroups(input);

    // assert
    expect(actual).toEqual([
      ["a1", "a2"],
      ["b1", "b2"],
    ]);
  });

  it("text to numbers", () => {
    // arrange
    const input = "-1 \n -2 \n\n -3.3 \n 4.4";

    // act
    const actual = splitAndMapIntoGroups(input, Number);

    // assert
    expect(actual).toEqual([
      [-1, -2],
      [-3.3, 4.4],
    ]);
  });
});

describe("chunk", ()=>{
  const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  type TestCase = [number, number[][]];
  const test_cases: TestCase[] = [
    [1, [[1],[2],[3],[4],[5],[6],[7],[8],[9],[10]]],
    [2,[[1,2],[3,4],[5,6],[7,8],[9,10]]],
    [3,[[1,2,3],[4,5,6],[7,8,9],[10]]],
    [4,[[1,2,3,4],[5,6,7,8],[9,10]]],
    [5,[[1,2,3,4,5],[6,7,8,9,10]]],
    [20, [[1,2,3,4,5,6,7,8,9,10]]]
  ];
  test_cases.forEach(([chunkSize, expected])=>{
    it(`chunk size ${chunkSize}`,()=>{
      expect(chunk(input, chunkSize)).toEqual(expected)
    })
  })
})