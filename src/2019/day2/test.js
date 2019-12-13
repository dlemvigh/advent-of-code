const { Program } = require("../intcode2");

describe("day 2", () => {
  describe("part 1", () => {
    it("test 1", () => {
      const input = "1,9,10,3,2,3,11,0,99,30,40,50";
      const program = new Program(input);

      program.step();
      console.log("step 1", program.program.join(","));
    });
  });
});
