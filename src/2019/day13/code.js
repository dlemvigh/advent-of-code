const { readInput } = require("../../util");
const { Program } = require("../intcode2");

class Screen {
  constructor() {
    this.rows = [];
    this.score = 0;
  }

  draw(x, y, tile) {
    // console.log("draw", x, y, tile);
    const row = this.rows[y] || [];
    row[x] = tile;
    this.rows[y] = row;
  }

  print() {
    return (
      this.rows.map(row => row.map(tile => TILES[tile]).join("")).join("\n") +
      `\nScore: ${this.score}`
    );
  }

  count(tile) {
    return this.rows.reduce(
      (sum, row) => sum + row.filter(x => x === tile).length,
      0
    );
  }
}

const TILES = {
  0: " ",
  1: "#",
  2: ".",
  3: "=",
  4: "o"
};

async function part1() {
  const input = readInput(__dirname);
  const program = new Program(input, { debug: false });
  const screen = new Screen();

  program.run();
  program.program[0] = 2;

  try {
    while (!program.done) {
      const x = await program.outputStream.take();
      const y = await program.outputStream.take();
      const tile = await program.outputStream.take();
      screen.draw(x, y, tile);
      if (x === -1) {
        console.log("=score=", tile);
        program.options.debug = true;
      }
    }
  } catch (err) {
    console.log(screen.print());
  }
}

if (require.main === module) {
  part1();
}
