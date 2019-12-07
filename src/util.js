const fs = require("fs");
const path = require("path");

exports.readInput = (folder, filename) =>
  fs.readFileSync(path.join(folder, filename)).toString();
