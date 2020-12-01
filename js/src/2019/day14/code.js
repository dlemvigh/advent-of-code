const { readInput } = require("../../util");

class PetriNet {
  constructor(input) {
    /** number of resources of each type, initially zero for all resources */
    this.places = {};
    /** transitions between places, with cost from from each place */
    this.transitions = [];

    this.parse(input);
  }

  parse(input) {
    const lines = input.split("\r\n");
    this.transitions = lines.map(line => {
      const [from, to] = line.split(" => ");
      const transition = {
        from: from.split(", ").map(x => this.parseToken(x)),
        to: this.parseToken(to)
      };
      return transition;
    });
  }

  parseToken(token) {
    const [match, count, node] = token.match(/(\d+) (\w+)/);
    this.places[node] = 0;

    return { node, count: Number(count) };
  }

  getCost(count = 1, target = "FUEL", sink = "ORE") {
    this.places[target] = count;

    for (let i = 0; true; i++) {
      const next = this.findNextToRelax(sink);
      if (next == null) {
        break;
      }
      this.relax(next);
    }

    const cost = this.places[sink];
    this.reset();
    return cost;
  }

  findNextToRelax(sink) {
    return Object.keys(this.places).find(
      node => this.places[node] > 0 && node !== sink
    );
  }

  relax(node) {
    const t = this.transitions.find(t => t.to.node === node);
    const factor = Math.ceil(this.places[t.to.node] / t.to.count);
    this.places[t.to.node] -= t.to.count * factor;
    t.from.forEach(from => (this.places[from.node] += from.count * factor));
  }

  reset() {
    Object.keys(this.places).forEach(node => (this.places[node] = 0));
  }
}

function part2() {
  const max = 1000000000000;

  const input = readInput(__dirname);
  const net = new PetriNet(input);

  const tryGuess = count => {
    const cost = net.getCost(count);
    // console.log(`cost (x${count}) = ${cost}`);
    return cost;
  };

  const single = tryGuess(1);
  let guess = Math.ceil(max / single);
  for (let i = 0; true; i++) {
    const cost = tryGuess(guess);
    if (cost > max) {
      // console.log(`it took ${i} iterations of guessing`);
      return guess - 1;
    }
    const diff = max - cost;
    guess += Math.ceil(diff / single);
  }
}

module.exports = { PetriNet, part2 };
