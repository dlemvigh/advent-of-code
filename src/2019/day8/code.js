const { readInput } = require("../../util");

// const input = "123456789012";
const input = readInput(__dirname, "input.txt");
const [width, height] = [25, 6];

const layers = chunk(Array.prototype.map.call(input, Number), width * height);
const minZeroLayer = getLeastZeroesLayer(layers);
// console.log("min", minZeroLayer);
const ones = getOccurencec(minZeroLayer, 1);
const twos = getOccurencec(minZeroLayer, 2);
console.log(`result ${ones * twos} (${ones} * ${twos})`);

function getLeastZeroesLayer(layers) {
  let minZero = Infinity;
  let minZeroLayer = null;
  for (const layer of layers) {
    const zeroes = getOccurencec(layer, 0);
    if (zeroes < minZero) {
      minZero = zeroes;
      minZeroLayer = layer;
    }
  }
  return minZeroLayer;
}

function chunk(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

function getOccurencec(array, value) {
  return array.filter(x => x === value).length;
}
