class Graph {
  constructor(nodes = [], edges = []) {
    this.nodes = nodes;
    this.edges = edges;
  }

  addEdges(edges) {
    this.edges.push(...edges);
  }

  search(src = "AA", dst = "ZZ") {
    const prev = { [src]: null };
    const dist = { [src]: 0 };
    const queue = [src];

    const near = node => this.edges.filter(edge => edge.from === node);
    const getPath = node => {
      const path = [];
      while (prev[node] != null) {
        path.push(node);
        node = prev[node];
      }
      return path.reverse();
    };

    while (queue.length > 0) {
      const from = queue.shift();
      const fromDist = dist[from];
      near(from).forEach(edge => {
        const to = edge.to;
        const toDist = fromDist + edge.dist + (from === "AA" ? 0 : 1);
        if (dist[to] == null || toDist < dist[to]) {
          dist[to] = toDist;
          prev[to] = from;
          queue.push(to);
        }
      });
    }
    // console.log(getPath(dst));
    return dist[dst];
  }
}

class Map {
  constructor(map) {
    this.map = map;
    this.rows = map.split("\n");
    this.height = this.rows.length;
    this.width = this.rows[0].length;
    this.portals = [];
  }

  findPortals() {
    for (let y = 1; y < this.height; y++) {
      for (let x = 1; x < this.width; x++) {
        const tile = this.rows[y][x];
        if (this.isTile(tile)) {
          const left = this.rows[y][x - 1];
          if (this.isTile(left)) {
            this.portals.push({
              name: [tile, left].sort().join(""),
              coords: {
                x: this.rows[y][x - 2] === "." ? x - 2 : x + 1,
                y
              }
            });
          }
          const up = this.rows[y - 1][x];
          if (this.isTile(up)) {
            this.portals.push({
              name: [tile, up].sort().join(""),
              coords: {
                x,
                y: (this.rows[y - 2] || [])[x] === "." ? y - 2 : y + 1
              }
            });
          }
        }
      }
    }
    return this.portals;
  }

  isTile(tile) {
    return /[A-Z]/.test(tile);
  }

  isPortal(pos) {
    const { x, y } = pos;
    return this.portals.find(
      portal => portal.coords.x === x && portal.coords.y === y
    );
  }

  search(portal) {
    const dists = [];
    const toIndex = pos => pos.y * this.width + pos.x;
    const setDist = (pos, dist) => (dists[toIndex(pos)] = dist);
    const getDist = pos => dists[toIndex(pos)];
    const near = pos =>
      DIRS.map(dir => ({ x: pos.x + dir.x, y: pos.y + dir.y })).filter(
        pos =>
          pos.x >= 0 && pos.y >= 0 && pos.x < this.width && pos.y < this.height
      );
    setDist(portal.coords, 0);

    const queue = [portal.coords];

    while (queue.length > 0) {
      const from = queue.shift();
      const fromDist = getDist(from);
      near(from).forEach(to => {
        const toDist = getDist(to);
        const tile = this.rows[to.y][to.x];
        if (tile === ".") {
          if (toDist == null || fromDist + 1 < toDist) {
            setDist(to, fromDist + 1);
            queue.push(to);
          }
        }
      });
    }

    const edges = [];
    for (const other of this.portals) {
      const dist = getDist(other.coords);
      if (dist > 0) {
        edges.push({
          from: portal.name,
          to: other.name,
          dist
        });
      }
    }
    return edges;
  }
}

const DIRS = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 0, y: -1 }
];

function part1(input) {
  const map = new Map(input);
  const portals = map.findPortals(map);
  // const edges = map.search(portals.find(x => x.name === "AA"));
  // console.log(edges);

  const nodes = map.portals.map(x => x.name);
  const graph = new Graph(nodes);

  portals.forEach(portal => {
    const edges = map.search(portal);
    graph.addEdges(edges);
  });

  const result = graph.search();
  return result;
}

module.exports = { Graph, Map, part1 };
