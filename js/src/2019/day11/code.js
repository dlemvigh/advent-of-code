const { readInput } = require("../../util");
const { Program } = require("../intcode2");

class Robot {
  constructor() {
    this.pos = { x: 0, y: 0 };
    this.dir = "UP";
  }

  exec(cmd) {
    const dir = cmd === 0 ? -1 : 1;
    this.dir = turn(this.dir, dir);
    this.pos = move(this.pos, this.dir);
  }
}

class Map {
  constructor(init = 0) {
    this.map = [[init]];
    this.count = 0;
  }

  get(pos) {
    this.map[pos.y] = this.map[pos.y] || [];
    return this.map[pos.y][pos.x] || 0;
  }

  set(pos, color) {
    if (this.map[pos.y][pos.x] == null) {
      this.count++;
      // console.log("count", this.count);
    }
    this.map[pos.y][pos.x] = color;
  }

  print() {
    const rows = Object.keys(this.map).map(Number);
    const min = Math.min(
      ...rows.map(y => Math.min(...Object.keys(this.map[y])))
    );
    const max = Math.max(
      ...rows.map(y => Math.max(...Object.keys(this.map[y])))
    );
    return rows
      .map(y => {
        return Array.from({ length: max - min + 1 }, (_, x) =>
          this.map[y][x] ? "#" : " "
        ).join("");
      })
      .join("\n");
  }
}

const DIR_NAME = ["UP", "RIGHT", "DOWN", "LEFT"];
const DIR_DELTA = {
  UP: { x: 0, y: -1 },
  RIGHT: { x: 1, y: 0 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 }
};

function turn(dir, delta) {
  const index = DIR_NAME.indexOf(dir);
  return DIR_NAME[(index + DIR_NAME.length + delta) % DIR_NAME.length];
}

function move(pos, dir) {
  const delta = DIR_DELTA[dir];
  return { x: pos.x + delta.x, y: pos.y + delta.y };
}

if (require.main === module) {
  const input = readInput(__dirname);
  const program = new Program(input, { debug: false });
  const robot = new Robot();
  const map = new Map(1);
  (async () => {
    program.run();
    try {
      while (!program.done) {
        const current = map.get(robot.pos);
        program.inputStream.put(current);
        if (program.done) {
          break;
        }

        const next = await program.outputStream.take();
        map.set(robot.pos, next);

        const dir = await program.outputStream.take();
        robot.exec(dir);

        // hack
        if (map.count === 248) {
          console.log(map.print());
        }
      }
    } catch (e) {
      console.log("catch");
    }
    console.log("painted");
  })();
}
