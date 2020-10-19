const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "./input.txt")).toString();
run(input);

function run(input) {
  const edges = input.split("\r\n").map(line => line.split(")"));
  const nodes = getNodes(edges);
  // nodes.forEach(x => console.log(x, getNear(x, edges)));
  const depths = getDepth("COM", nodes, edges);
  // console.log("d", depths);
  const result = Object.values(depths).reduce((a, b) => a + b);
  console.log("result", result);
  const depths2 = getDepth("YOU", nodes, edges);
  console.log("res2", depths2["SAN"] - 2);
}

function getNodes(orbits) {
  const nodes = {};
  for (const [from, to] of orbits) {
    nodes[from] = true;
    nodes[to] = true;
  }
  return Object.keys(nodes);
}

function getNear(node, edges) {
  const near = [];
  edges.forEach(([from, to]) => {
    if (from === node) near.push(to);
    if (to === node) near.push(from);
  });
  return near;
}

function getDepth(root, nodes, edges) {
  const depth = { [root]: 0 };
  const queue = [root];
  while (queue.length > 0) {
    const from = queue.pop();
    const near = getNear(from, edges);
    for (const to of near) {
      if (depth[to] == null) {
        depth[to] = depth[from] + 1;
        queue.push(to);
      }
    }
  }
  return depth;
}
