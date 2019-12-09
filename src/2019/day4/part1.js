const input = "246540-787419";
const [from, to] = input.split("-").map(Number);

(function run() {
  let count = 0;
  for (let cand = from; cand <= to; cand++) {
    if (validate(cand)) {
      count++;
    }
  }
  console.log(`Count: ${count}`);
})();

function validate(value) {
  let hasAdjacent = false;
  var str = String(value);
  let groupLengths = [];
  let groupLen = 1;
  for (let i = 1; i < str.length; i++) {
    const prev = str[i - 1];
    const curr = str[i];
    if (prev === curr) {
      hasAdjacent = true;
      groupLen++;
    } else {
      groupLengths.push(groupLen);
      groupLen = 1;
    }
    if (prev > curr) {
      return false;
    }
  }
  groupLengths.push(groupLen);
  const has2group = groupLengths.indexOf(2) !== -1;
  return hasAdjacent && has2group;
}
