const { readInput } = require("../../util");
const { runProgram, parseProgram } = require("../intcode");

if (require.main === module) {
  const input = readInput(__dirname);
  const output = part1(input, 1, { debug: true });
  console.log(output);
}

// function part1(input, args = []) {
function part1(input, arg, options) {
  const program = parseProgram(input);
  const generator = runProgram(program, [], options);
  const result = [];
  let value, done;
  for (let i = 0; true; i++) {
    ({ value, done } = generator.next(arg));
    if (done) {
      break;
    }
    if (value != null) {
      result.push(value);
    }
  }
  return result;
}

module.exports = { part1 };
