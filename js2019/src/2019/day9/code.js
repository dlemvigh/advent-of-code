const { readInput } = require("../../util");
const { runProgram, parseProgram } = require("../intcode");
const { Program } = require("../intcode2");

if (require.main === module) {
  // const input = readInput(__dirname);
  const input = "109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99";
  part1(input, 1, { debug: true }).then(console.log);
  // console.log(output);
}

// function part1(input, args = []) {
async function part1(input, arg = null) {
  const program = new Program(input, { debug: false });
  if (arg != null) program.inputStream.put(arg);
  await program.run();
  return program.outputStream.values;
}

function part1old(input, arg, options) {
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
