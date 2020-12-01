const { Program, Stream } = require("../intcode2");
const { readInput } = require("../../util");
// const { part1, part2 } = require("./code");

describe("day 5", () => {
  describe("examples", () => {
    it("example 1", async () => {
      const input = "1002,4,3,4,33";
      const program = new Program(input, { debug: false });

      await program.run();
      expect(program.program.join(",")).toBe("1002,4,3,4,99");
    });

    it("example 2", async () => {
      const input = "1101,100,-1,4,0";
      const program = new Program(input, { debug: false });

      await program.step();
      expect(program.program.join(",")).toBe("1101,100,-1,4,99");
    });

    it("input 1", async () => {
      const program = new Program("3, 3, 99, 0");
      program.inputStream.put(42);
      await program.run();

      expect(program.program.join(",")).toBe("3,3,99,42");
    });
  });

  describe("part 1", () => {
    it("verify solution", async () => {
      const input = readInput(__dirname);
      const program = new Program(input, { debug: false });
      program.inputStream.put(1);
      await program.run();
      expect(program.outputStream.last()).toBe(13087969);
    });
  });

  describe("part 2", () => {
    const cases = [
      ["3,9,8,9,10,9,4,9,99,-1,8", 7, 0],
      ["3,9,8,9,10,9,4,9,99,-1,8", 8, 1],
      ["3,9,8,9,10,9,4,9,99,-1,8", 9, 0],
      ["3,9,7,9,10,9,4,9,99,-1,8", 7, 1],
      ["3,9,7,9,10,9,4,9,99,-1,8", 8, 0],
      ["3,9,7,9,10,9,4,9,99,-1,8", 9, 0],
      ["3,3,1108,-1,8,3,4,3,99", 7, 0],
      ["3,3,1108,-1,8,3,4,3,99", 8, 1],
      ["3,3,1108,-1,8,3,4,3,99", 9, 0],
      ["3,3,1107,-1,8,3,4,3,99", 7, 1],
      ["3,3,1107,-1,8,3,4,3,99", 8, 0],
      ["3,3,1107,-1,8,3,4,3,99", 9, 0],
      ["3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9", 0, 0],
      ["3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9", 1, 1],
      ["3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9", 42, 1],
      ["3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9", -1, 1],
      ["3,3,1105,-1,9,1101,0,0,12,4,12,99,1", 0, 0],
      ["3,3,1105,-1,9,1101,0,0,12,4,12,99,1", 1, 1],
      ["3,3,1105,-1,9,1101,0,0,12,4,12,99,1", 42, 1],
      ["3,3,1105,-1,9,1101,0,0,12,4,12,99,1", -1, 1],
      [
        "3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99",
        2,
        999
      ],
      [
        "3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99",
        7,
        999
      ],
      [
        "3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99",
        8,
        1000
      ],
      [
        "3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99",
        9,
        1001
      ],
      [
        "3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99",
        42,
        1001
      ]
    ];

    cases.forEach(([input, arg, out], index) => {
      it(`Case #${index + 1}`, async () => {
        const program = new Program(input, { debug: false });
        program.inputStream.put(arg);

        await program.run();

        expect(program.outputStream.last()).toBe(out);
      });
    });

    it("verify solution", async () => {
      const input = readInput(__dirname);
      const program = new Program(input, { debug: false });
      program.inputStream.put(5);
      await program.run();
      expect(program.outputStream.last()).toBe(14110739);
    });
  });
});
