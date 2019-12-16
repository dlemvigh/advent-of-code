const { permutations } = require("../../util");
// const { runProgram } = require("../intcode");
const { Program } = require("../intcode2");

async function findBest(input) {
  let best = -Infinity;
  let bestP = null;
  const perm = permutations([0, 1, 2, 3, 4]);
  for (const p of perm) {
    const value = await amp(input, p, 0);
    if (value > best) {
      best = value;
      bestP = p;
    }
  }
  return [best, bestP];
}

async function amp(input, phases, val) {
  let programs = [];
  phases.forEach((phase, index) => {
    programs[index] = new Program(input);
    if (index > 0) {
      programs[index].inputStream = programs[index - 1].outputStream;
    }
    programs[index].inputStream.put(phase);
    if (index === 0) {
      programs[index].inputStream.put(val);
    }
  });

  for (const program of programs) {
    await program.run();
  }

  return programs[4].outputStream.take();
}

async function findBestFeedback(input) {
  let best = -Infinity;
  let bestP = null;
  const perm = permutations([5, 6, 7, 8, 9]).slice(0, 1);
  for (const p of perm) {
    const value = await ampFeedback(input, p, 0);
    if (value > best) {
      best = value;
      bestP = p;
    }
  }
  return [best, bestP];
}

async function ampFeedback(input, phases, val) {
  const programs = phases.map(
    (_, i) => new Program(input, { debug: true, name: `Name: ${i}` })
  );

  phases.forEach((phase, index) => {
    const prev = (index + 1) % phases.length;
    programs[index].inputStream = programs[prev].outputStream;
    programs[index].inputStream.put(phase);
  });
  programs[0].inputStream.put(val);
  const p = programs[0];
  await p.step();

  // programs.map(program => program.run());

  // const output = await programs[0].outputStream.take();
  // console.log("output", output);
  // for (let i = 0; i < 3; i++) {
  //   programs[i].inputStream.put(val);
  //   val = await programs[i].outputStream.take();
  //   console.log("step", i, val);
  // }
}

module.exports = { findBest, findBestFeedback };
