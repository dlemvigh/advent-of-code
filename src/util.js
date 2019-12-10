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

module.exports = { readInput, permutations };
