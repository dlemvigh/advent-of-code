const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(path.join(__dirname, "./input.txt"))
  .toString()
  .split("\n");
// const input = "+3, +3, +4, -2, -4".split(", ");
// const input = "-6, +3, +8, +5, -6".split(", ");
// const input = "+7, +7, -2, -7, -4".split(", ");
let value = 0;
let count = { 0: 1 };
try {
  const run = () => {
    input.forEach(token => {
      value = eval(value + token);
      count[value] = (count[value] || 0) + 1;
      if (value === 437) console.log("437");
      if (count[value] === 2) {
        console.log("done", value, count[value], token);
        throw value;
      }
      //   console.log("loop", value, count[value], token);
    });
  };
  for (let i = 0; true; i++) {
    console.log("i", i);
    run();
  }
} catch (e) {}
// const val = eval(str);
// console.log("input", val);
