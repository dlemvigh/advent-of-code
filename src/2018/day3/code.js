const { readInput } = require("../../util");

const input = readInput(__dirname, "input.txt");
// const input = `#1 @ 1,3: 4x4
// #2 @ 3,1: 4x4
// #3 @ 5,5: 2x2`;

const claims = parseInput(input);
const overlaps = findOverlaps(claims);
console.log(`=== result: ${overlaps} ===`);

function parseInput(input) {
  const lines = input.split("\r\n");
  const regex = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/;
  return lines.map(line => {
    const match = line.match(regex);
    const [id, left, top, width, height] = match.slice(1).map(Number);
    return { id, left, top, width, height };
  });
}

function findOverlaps(claims) {
  const good = new Set();
  //   const bad = new Set();
  const fabric = [];
  let overlaps = 0;

  const mark = (r, c, id) => {
    fabric[r] = fabric[r] || [];
    fabric[r][c] = fabric[r][c] || [];
    fabric[r][c].push(id);
  };

  claims.forEach(({ id, left, top, width, height }) => {
    // console.log("claim", left, top, width, height);
    good.add(id);
    for (let r = top; r < top + height; r++) {
      for (let c = left; c < left + width; c++) {
        mark(r, c, id);
      }
    }
  });

  fabric.forEach(row => {
    const badIds = row.filter(col => col.length >= 2);
    overlaps += badIds.length;
    badIds.forEach(col => {
      col.forEach(id => {
        good.delete(id);
      });
    });
  });
  console.log("good", good);

  return overlaps;
}
