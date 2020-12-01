const { readInput } = require("../../util");

class Map {
  constructor(map) {
    this.map = map;
    this.rows = map.split("\n");
    this.height = this.rows.length;
    this.width = this.rows[0].length;
    this.keys = this.getKeys(map);
    this.locks = this.getLocks(map);
  }

  getKeys(map) {
    return map.match(/[a-z]/g).sort();
  }

  getLocks(map) {
    return map.match(/[A-Z]/g).sort();
  }

  getTile(pos) {
    const [x, y] = pos;
    return this.rows[y][x];
  }

  isKey(tile) {
    return this.keys.indexOf(tile) !== -1;
  }

  isLock(tile) {
    return this.locks.indexOf(tile) !== -1;
  }

  findNode(node) {
    for (let y = 0; y < this.height; y++) {
      const x = this.rows[y].indexOf(node);
      if (x !== -1) {
        return [x, y];
      }
    }
  }

  toIndex(pos) {
    const [x, y] = pos;
    return y * this.width + x;
  }
}

class MapGraph {
  constructor(map, node) {
    this.map = map;
    this.dists = {
      [node]: 0
    };
    this.locks = {
      [node]: []
    };
    this.visited = [];
    this.search(node);
  }

  search(node) {
    const prev = [];
    const dists = [];
    const queue = [];

    const pos = this.map.findNode(node);
    const idx = this.map.toIndex(pos);
    prev[idx] = null;
    dists[idx] = 0;
    queue.push(pos);
    while (queue.length > 0) {
      const from = queue.shift();
      const fromIndex = this.map.toIndex(from);
      for (const to of this.getNear(from)) {
        const toIndex = this.map.toIndex(to);
        if (dists[toIndex] == null) {
          prev[toIndex] = from;
          dists[toIndex] = dists[fromIndex] + 1;
          queue.push(to);
        }
        const tile = this.map.getTile(to);
        if (this.map.isKey(tile)) {
          this.dists[tile] = dists[toIndex];
        }
      }
    }
    this.map.keys.forEach(node => {
      const locks = [];
      let pos = this.map.findNode(node);
      let idx = this.map.toIndex(pos);
      while (prev[idx] !== null) {
        pos = prev[idx];
        idx = this.map.toIndex(pos);
        const tile = this.map.getTile(pos);
        if (this.map.isLock(tile)) {
          locks.push(tile);
        }
      }
      this.locks[node] = locks.sort();
    });
  }

  getNear(pos) {
    const near = DIRS.map(dir => [0, 1].map(i => pos[i] + dir[i])).filter(
      ([x, y]) => {
        if (x < 0 || y < 0 || x >= this.map.width || y >= this.map.height) {
          return false;
        }
        const tile = this.map.getTile([x, y]);
        if (tile === "#") return false;
        // if (tile === "@") return true;
        // if (/[a-z]/.test(tile)) return false;
        return true;
      }
    );
    // console.log("near", near, this.map.width, this.map.height);
    return near;
  }
}

const DIRS = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1]
];

class Graph {
  constructor(map) {
    this.nodes = ["@", ...map.keys].map(key => new Node(key));
    this.edges = [];

    this.mapGraphs = {
      "@": new MapGraph(map, "@")
    };

    ["@", ...map.keys].forEach(key => {
      this.mapGraphs[key] = new MapGraph(map, key);
      map.keys.forEach(other => {
        if (key === other) return;
        this.edges.push(
          new Edges(
            key,
            other,
            this.mapGraphs[key].dists[other],
            this.mapGraphs[key].locks[other]
          )
        );
      });
    });
    console.log("nodes", this.nodes.length);
    console.log("edges", this.edges.length);
    // console.log(this.edges);
  }

  search() {
    const queue = [
      {
        node: "@",
        dist: 0,
        visited: {
          count: 0
        },
        locks: {
          count: 0
        },
        flag: 0
      }
    ];

    const dist = {
      "@": {
        0: 0
      }
    };

    const toFlag = key => 1 << (key.charCodeAt(0) - "a".charCodeAt(0));

    const target = this.nodes.length - 1;
    const flagTarget = Math.pow(2, target) - 1;
    let best = Infinity;
    let i = 0;
    while (queue.length > 0) {
      // queue.sort(
      //   (a, b) => b.visited.count - a.visited.count || a.dist - b.dist
      // );
      const from = queue.pop();
      // const from = queue.shift();
      if (from.visited.count === target) {
        if (from.dist < best) {
          best = from.dist;
          // console.log("best so far", best);
        }
      }
      const near = this.near(from);
      near.forEach(edge => {
        const flag = from.flag | toFlag(edge.to);
        const item = {
          node: edge.to,
          dist: from.dist + edge.dist,
          visited: {
            ...from.visited,
            [edge.to]: true,
            count: from.visited.count + 1
          },
          locks: {
            ...from.locks,
            [edge.to.toUpperCase()]: true,
            count: from.locks.count + 1
          },
          flag
        };
        dist[edge.to] = dist[edge.to] || {};
        if (
          dist[edge.to][flag] == null ||
          from.dist + edge.dist < dist[edge.to][flag]
        ) {
          dist[edge.to][flag] = from.dist + edge.dist;
          queue.push(item);
        }
      });
      // if (i % 1000 == 0) {
      //   console.log(queue.length);
      // }
      // i++;
    }
    return best;
  }

  near({ node, visited, locks }) {
    return this.edges.filter(
      edge =>
        edge.from === node &&
        !visited[edge.to] &&
        edge.locks.every(lock => locks[lock])
    );
  }
}

class Node {
  constructor(name) {
    this.name = name;
  }
}

class Edges {
  constructor(from, to, dist, locks) {
    this.from = from;
    this.to = to;
    this.dist = dist;
    this.locks = locks;
  }
}
function part1() {
  // const input = readInput(__dirname, "cases/caseB.txt");
  const input = readInput(__dirname);
  const map = new Map(input);
  const graph = new Graph(map);
  const best = graph.search();
  console.log("best", best);
}

if (require.main === module) {
  const before = new Date();
  part1();
  const after = new Date();
  // console.log(`it took ${after - before}ms`);
}

module.exports = { MapGraph, Map, part1 };
