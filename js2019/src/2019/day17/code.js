const { readInput } = require("../../util");
const { Program } = require("../intcode2");

if (require.main === module) {
  const input = readInput(__dirname);
  part1(input);
}

async function part1(input) {
  const program = new Program(input, { debug: true });
  const pointer = program.run();
  while (!program.done) {
    const code = await program.inputStream.take();
  }
}
