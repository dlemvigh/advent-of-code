import { splitIntoLines } from "../../util";
import { search } from "../day1/day1";

export function part1(input: string, len: number) {
  const lines = splitIntoLines(input).map(Number);
  return searchInvalid(lines, len);
}

function searchInvalid(values: number[], len: number) {
  for (let i = len; i < values.length; i++) {
    const res = search(
      values.slice(i - len, i).sort((a, b) => a - b),
      values[i]
    );
    if (!res) {
      return values[i];
    }
  }
}

export function part2(input: string, len: number) {
  const lines = splitIntoLines(input).map(Number);
  const value = searchInvalid(lines, len);
  const res = searchValueSeq(lines, value);
  return res;
}

function searchValueSeq(values: number[], target: number) {
  //   console.log("seq", target);
  let a = 0,
    b = 1,
    sum = values[0];
  while (sum != target) {
    if (sum < target) {
      sum += values[b++];
    }
    if (sum > target) {
      sum -= values[a++];
    }
    // console.log("it", a, b, sum);
  }
  const subset = values.slice(a, b);
  const min = Math.min(...subset);
  const max = Math.max(...subset);
  return min + max;
}
