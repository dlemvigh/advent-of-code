const input =
  "3,8,1001,8,10,8,105,1,0,0,21,42,67,84,97,118,199,280,361,442,99999,3,9,101,4,9,9,102,5,9,9,101,2,9,9,1002,9,2,9,4,9,99,3,9,101,5,9,9,102,5,9,9,1001,9,5,9,102,3,9,9,1001,9,2,9,4,9,99,3,9,1001,9,5,9,1002,9,2,9,1001,9,5,9,4,9,99,3,9,1001,9,5,9,1002,9,3,9,4,9,99,3,9,102,4,9,9,101,4,9,9,102,2,9,9,101,3,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,99,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,99";
const program = input.split(",").map(Number);

// amp([1, 0, 4, 3, 2], 0);
const perm = permutations(["0", "1", "2", "3", "4"]).map(perm =>
  perm.map(Number)
);

(function findBest() {
  let best = -Infinity;
  let bestP = null;
  for (const p of perm) {
    const value = amp(p, 0);
    if (value > best) {
      best = value;
      bestP = p;
    }
    // console.log("p", p);
  }
  console.log("best", best, bestP);
})();

function amp(phases, value) {
  phases.forEach(phase => {
    value = runProgram(program, [phase, value]);
  });
  //   console.log(`=== amp: ${value} ===`);
  return value;
}

function permutations(list) {
  if (list.length < 2) return list;

  const result = [];
  list.forEach((value, index) => {
    const rest = list.filter((x, i) => i !== index);
    const perm = permutations(rest);
    perm.forEach(p => {
      result.push([value, ...p]);
    });
  });
  return result;
}

function runProgram(program, inputs) {
  let p = 0;
  let i = 0;
  let output;
  const readDirect = () => program[p++];
  const readIndirect = () => program[program[p++]];
  const read = direct => {
    // console.log("  read", p, direct);
    const value = direct ? readDirect() : readIndirect();
    // console.log("  =", value);
    return value;
  };

  const write = value => {
    // console.log("  write", p, value);
    program[program[p++]] = value;
  };
  const parseOp = code => {
    const op = code % 100;
    const mode = [4, 2, 1].map(x => Boolean(x & Math.floor(code / 100)));
    return [op, mode];
  };

  const op_codes = {
    1: mode => {
      // add
      const a = read(mode[2]);
      const b = read(mode[1]);
      write(a + b);
    },
    2: mode => {
      // multiply
      const a = read(mode[2]);
      const b = read(mode[1]);
      write(a * b);
    },
    3: () => {
      // write input => program
      const input = inputs[i++];
      write(input);
    },
    4: () => {
      // read program => output
      output = readIndirect();
      //   console.log(`=== output: ${output} ===`);
    },
    5: mode => {
      // jump if true
      const value = read(mode[2]);
      const jump = read(mode[1]);
      const cond = value !== 0;
      if (cond) {
        p = jump;
      }
    },
    6: mode => {
      // jump if false
      const value = read(mode[2]);
      const jump = read(mode[1]);
      const cond = value === 0;
      if (cond) {
        p = jump;
      }
    },
    7: mode => {
      // equals
      const a = read(mode[2]);
      const b = read(mode[1]);
      const c = Number(a < b);
      write(c);
    },
    8: mode => {
      // equals
      const a = read(mode[2]);
      const b = read(mode[1]);
      const c = Number(a === b);
      write(c);
    }
  };

  while (true) {
    const [op, mode] = parseOp(readDirect());
    // console.log("op", op, mode);
    if (op === 99) {
      return output;
    }
    op_codes[op](mode);
  }
}
