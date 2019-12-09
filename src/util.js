const fs = require("fs");
const path = require("path");

function readInput(folder, filename = "input.txt") {
  return fs.readFileSync(path.join(folder, filename)).toString();
}

function permutations(list) {
  if (list.length < 2) return [list];

  const result = [];
  list.forEach((value, index) => {
    const rest = list.filter((x, i) => i !== index);
    const perm = permutations(rest);
    perm.forEach(p => {
      result.push([value, ...p]);
    });
  });
  return result;
}

class Queue {
  constructor(...init = []) {
    this.queue = init;
  }

  push(value) {
    console.log("push");
    this.queue.push(value);
  }

  async pop() {
    if (this.queue.length > 0) {
      const value = this.queue.shift();
      console.log("pop", value);
      return Promise.resolve(value);
    } else {
      console.log("defer");
    }
  }
}

module.exports = { readInput, permutations, Queue };
