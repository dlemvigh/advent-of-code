const { part1 } = require("./code");
describe("day 9", () => {
  describe("part 1", () => {
    it("Quine", () => {
      const input = "109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99";
      const output = part1(input);
      expect(output.join(",")).toBe(input);
    });

    it("16-digit number", () => {
      const input = "1102,34915192,34915192,7,4,7,99,0";
      const [output] = part1(input);
      expect(output.toString()).toHaveLength(16);
    });

    it("return middle number", () => {
      const input = "104,1125899906842624,99";
      const [output] = part1(input);
      expect(output).toBe(1125899906842624);
    });
  });
});
