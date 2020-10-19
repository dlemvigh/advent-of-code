const { readInput } = require("../../util");

// const input = "123456789012";
const input = readInput(__dirname, "input.txt");
// const input = "0222112222120000";
const [width, height] = [25, 6];

const layers = chunk(Array.prototype.map.call(input, Number), width * height);
// const minZeroLayer = getLeastZeroesLayer(layers);
// console.log("min", minZeroLayer);
// const ones = getOccurences(minZeroLayer, 1);
// const twos = getOccurences(minZeroLayer, 2);
// console.log(`result ${ones * twos} (${ones} * ${twos})`);
// print(minZeroLayer);
const image = decode(layers);
print(image);

function decode(layers) {
  const image = [];
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const index = row * width + col;
      for (let i = 0; i < layers.length; i++) {
        if (layers[i][index] !== 2) {
          image[index] = Boolean(layers[i][index]) ? "**" : "  ";
          break;
        }
      }
    }
  }
  return image;
}

function print(layer) {
  const rows = chunk(layer, width);
  rows.forEach(row => console.log(row.join("")));
}

function getLeastZeroesLayer(layers) {
  let minZero = Infinity;
  let minZeroLayer = null;
  for (const layer of layers) {
    const zeroes = getOccurences(layer, 0);
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

function getOccurences(array, value) {
  return array.filter(x => x === value).length;
}
