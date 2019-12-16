const { Program } = require("../intcode2");
const { readInput } = require("../../util");
const { part1, part2 } = require("./code");

describe("day 2", () => {
  describe("examples", () => {
    it("can be run step by step", async () => {
      const input = "1,9,10,3,2,3,11,0,99,30,40,50";
      const program = new Program(input, { debug: false });

      expect(program.program.join(",")).toBe(input);
      await program.step();
      expect(program.program.join(",")).toBe("1,9,10,70,2,3,11,0,99,30,40,50");
      expect(program.done).toBe(false);
      await program.step();
      expect(program.program.join(",")).toBe(
        "3500,9,10,70,2,3,11,0,99,30,40,50"
      );
      expect(program.done).toBe(false);
      await program.step();
      expect(program.done).toBe(true);
    });

    const cases = [
      ["1,0,0,0,99", "2,0,0,0,99"],
      ["2,3,0,3,99", "2,3,0,6,99"],
      ["2,4,4,5,99,0", "2,4,4,5,99,9801"],
      ["1,1,1,4,99,5,6,0,99", "30,1,1,4,2,5,6,0,99"]
    ];

    cases.forEach(([input, output]) => {
      it(`${input} => ${output}`, async () => {
        const program = new Program(input);
        await program.run();
        expect(program.program.join(",")).toBe(output);
      });
    });
  });

  describe("part 1", () => {
    it("verify solution", async () => {
      const result = await part1();
      expect(result).toBe(3562672);
    });
  });

  describe("part 2", () => {
    it("verify solution", async () => {
      const result = await part2();
      expect(result).toBe(8250);
    });
  });
});
