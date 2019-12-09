const fs = require("fs");
const path = require("path");

function readInput(folder, filename = "input.txt") {
  return fs.readFileSync(path.join(folder, filename)).toString();
}

module.exports = { readInput };
