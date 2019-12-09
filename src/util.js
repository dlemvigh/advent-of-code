const fs = require("fs");
const path = require("path");

exports.readInput = (folder, filename = "input.txt") =>
  fs.readFileSync(path.join(folder, filename)).toString();
