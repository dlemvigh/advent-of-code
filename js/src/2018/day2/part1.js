const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(path.join(__dirname, "./input.txt"))
  .toString()
  .split("\n");

console.log(input.length);
function countOccurences(str) {
  const count = {};
  for (const chr of str) {
    count[chr] = (count[chr] || 0) + 1;
  }
  return count;
}

function count23() {
  let two = 0;
  let three = 0;
  input.forEach(str => {
    const count = Object.values(countOccurences(str));
    const hasTwo = count.indexOf(2) !== -1;
    const hasThree = count.indexOf(3) !== -1;
    two += Number(hasTwo);
    three += Number(hasThree);
  });
  console.log(two * three, two, three);
}

count23();
