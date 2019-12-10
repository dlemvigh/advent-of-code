const { permutations, Queue } = require("../../util");
const { runProgram } = require("../intcode");
// const input = "3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0";
// const input =
//   "3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0";
// const input =
//   "3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0";
// const input =
//   "3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5";
// const input =
//   "3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10";
// const input =
//   "3,8,1001,8,10,8,105,1,0,0,21,42,67,84,97,118,199,280,361,442,99999,3,9,101,4,9,9,102,5,9,9,101,2,9,9,1002,9,2,9,4,9,99,3,9,101,5,9,9,102,5,9,9,1001,9,5,9,102,3,9,9,1001,9,2,9,4,9,99,3,9,1001,9,5,9,1002,9,2,9,1001,9,5,9,4,9,99,3,9,1001,9,5,9,1002,9,3,9,4,9,99,3,9,102,4,9,9,101,4,9,9,102,2,9,9,101,3,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,99,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,99";
// const program = input.split(",").map(Number);

// amp([1, 0, 4, 3, 2], 0);
// findBest(input);
// console.log(findBestFeedback(input));
// console.log("best", best, bestP);

function findBest(input) {
  const program = input.split(",").map(Number);

  let best = -Infinity;
  let bestP = null;
  const perm = permutations([0, 1, 2, 3, 4]);
  for (const p of perm) {
    const value = ampFeedback(program, p, 0);
    if (value > best) {
      best = value;
      bestP = p;
    }
  }
  return [best, bestP];
}

function findBestFeedback(input) {
  const program = input.split(",").map(Number);

  let best = -Infinity;
  let bestP = null;
  const perm = permutations([5, 6, 7, 8, 9]);
  for (const p of perm) {
    const value = ampFeedback(program, p, 0);
    if (value > best) {
      best = value;
      bestP = p;
    }
  }
  return [best, bestP];
}

function amp(program, phases, val) {
  for (let i = 0; i < phases.length; i++) {
    result = runProgram(program, [phases[i], val]);
    // console.log("val", val, "res", result.value, result.done);
    const { value } = result.next();
    val = value;
  }
  return val;
}

function ampFeedback(program, phases, val) {
  const amps = phases.map(index => runProgram(program, [], index));

  amps.forEach(amp => amp.next());
  amps.forEach((amp, index) => amp.next(phases[index]));

  for (let i = 0; true; i++) {
    const amp = amps[i % phases.length];
    const { value, done } = amp.next(val);
    if (done) {
      return val;
    }
    if (value != null) {
      val = value;
    }
  }
}

module.exports = { findBest, findBestFeedback };
