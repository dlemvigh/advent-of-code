import { cpuUsage } from "process";
import {
  array2circle,
  findListItem,
  insertNext,
  list2array,
  ListItem,
  listLength,
  spliceNext,
} from "../linked-list/linked-list";

export function part1(input: string, rounds: number): number {
  const cups = parseInput(input);
  const array = list2array(cups);
  let current = cups;

  function move() {
    const picked = spliceNext(current, 3);
    // console.log("pick up:", list2array(picked));

    let target = lower(current.value);
    while (findListItem(picked, target)) {
      target = lower(target);
    }
    // console.log("destination:", target);

    const next = findListItem(current, target);
    insertNext(next, picked);
    current = current.next;
  }

  function printCups() {
    console.log(
      "cups:",
      array.map((val) => (val === current.value ? `(${val})` : val)).join(" ")
    );
  }

  function lower(value: number): number {
    const next = (value - 1 + input.length - 1) % input.length;
    return next + 1;
  }

  for (let i = 0; i < rounds; i++) {
    move();
  }
  //   printCups();

  return calculate(cups);
}

function parseInput(input: string): ListItem<number> {
  const array = input.split("").map(Number);
  const list = array2circle(array);
  return list;
}

function calculate(cups: ListItem<number>): number {
  const list = findListItem(cups, 1);
  const array = list2array(list);
  const string = array.slice(1).join("");
  return Number(string);
}
