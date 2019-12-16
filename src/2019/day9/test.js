const { part1 } = require("./code");
const { readInput } = require("../../util");

describe("day 9", () => {
  describe("part 1", () => {
    it("Quine", async () => {
      const input = "109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99";
      const output = await part1(input);
      expect(output.join(",")).toBe(input);
    });

    it("16-digit number", async () => {
      const input = "1102,34915192,34915192,7,4,7,99,0";
      const [output] = await part1(input);
      expect(output.toString()).toHaveLength(16);
    });

    it("return middle number", async () => {
      const input = "104,1125899906842624,99";
      const [output] = await part1(input);
      expect(output).toBe(1125899906842624);
    });
  });

  it("verify part 1", async () => {
    const input = readInput(__dirname);
    const [output] = await part1(input, 1);
    expect(output).toBe(3906448201);
  });
  it("verify part 2", async () => {
    const input = readInput(__dirname);
    const [output] = await part1(input, 2);
    expect(output).toBe(59785);
  });
});
