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
  constructor(init = []) {
    this.queue = [...init];
    this.popPromise = null;
  }

  push(value) {
    if (this.pending) {
      this.pending(value);
    }
    this.queue.push(value);
  }

  async pop() {
    if (this.queue.length > 0) {
      return Promise.resolve(this.queue.shift());
    } else {
      return new Promise(resolve => {
        this.popPromise = resolve;
      });
    }
  }
}

module.exports = { readInput, permutations, Queue };
