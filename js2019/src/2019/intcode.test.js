const { parseOp } = require("./intcode");

describe("parse op", () => {
  const cases = [
    [101, [1, "001"]],
    [109, [9, "001"]],
    [204, [4, "002"]],
    [1002, [2, "010"]],
    [1101, [1, "011"]],
    [11105, [5, "111"]]
  ];

  cases.forEach(([code, [op, mode]]) => {
    it(`code ${code} => op ${op} mode '${mode}'`, () => {
      const [actualOp, actualMode] = parseOp(code);
      expect(actualOp).toBe(op);
      expect(actualMode).toBe(mode);
    });
  });
});
