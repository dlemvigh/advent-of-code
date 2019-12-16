const { Program, Stream } = require("./intcode2");
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

describe("stream", () => {
  it("handles prefilled lists", async () => {
    const stream = new Stream([1, 2, 3]);
    expect(await stream.take()).toBe(1);
    expect(await stream.take()).toBe(2);
    expect(await stream.take()).toBe(3);
  });

  it("handles stepwise lists", async () => {
    const stream = new Stream();
    stream.put(1);
    expect(await stream.take()).toBe(1);
    stream.put(2);
    expect(await stream.take()).toBe(2);
    stream.put(3);
    expect(await stream.take()).toBe(3);
  });

  it("handles stepwise filling", async () => {
    const stream = new Stream();
    const p = stream.take().then(value => expect(value).toBe(42));
    stream.put(42);
    await p;
  });

  it("handles waiting for multiple values", async () => {
    const stream = new Stream();

    const takeSeveral = async () => {
      expect(await stream.take()).toBe(1);
      expect(await stream.take()).toBe(2);
      expect(await stream.take()).toBe(3);
    };
    const takeSeveralPromise = takeSeveral();

    stream.put(1);
    stream.put(2);
    stream.put(3);

    await takeSeveralPromise;
  });
});

describe("program with streaming", () => {
  it("read several inputs eventually", async () => {
    const input = "3,7,3,8,3,9,99,0,0,0";
    const program = new Program(input);

    const pointer = program.run();

    program.inputStream.put(1);
    program.inputStream.put(2);
    program.inputStream.put(3);

    await pointer;

    expect(program.program.join(",")).toBe("3,7,3,8,3,9,99,1,2,3");
  });

  it("chains between program", async () => {
    const programA = new Program("4,7,4,8,4,9,99,1,2,3");
    const programB = new Program("3,7,3,8,3,9,99,0,0,0");
    programB.inputStream = programA.outputStream;

    const pointerA = programA.run();
    const pointerB = programB.run();

    await pointerA;
    await pointerB;

    expect(programA.program.join(",")).toBe("4,7,4,8,4,9,99,1,2,3");
    expect(programB.program.join(",")).toBe("3,7,3,8,3,9,99,1,2,3");
  });

  it("chains between programs multiple programs", async () => {
    const value = 42;
    const input = "3,9,1001,9,1,10,4,10,99";

    let programs = [];
    for (let i = 0; i < 5; i++) {
      programs[i] = new Program(input);
      if (i > 0) {
        programs[i].inputStream = programs[i - 1].outputStream;
      }
    }

    const pointers = programs.map(program => program.run());

    programs[0].inputStream.put(value);

    await Promise.all(pointers);

    programs.forEach((program, index) => {
      expect(program.program.join(",")).toBe(
        `${input},${value + index},${value + index + 1}`
      );
    });
  });

  it("loops between two programs", async () => {
    value = 42;
    const input = "3,0,1001,0,1,1,4,1,3,2,1001,2,1,3,4,3,99";

    const programA = new Program(input);
    const programB = new Program(input);
    const programs = [programA, programB];

    programB.outputStream = programA.inputStream;
    programA.outputStream = programB.inputStream;

    const pointers = programs.map(program => program.run());

    programA.inputStream.put(42);

    await Promise.all(pointers);

    expect(programA.program.join(",")).toBe(
      "42,43,44,45,1,1,4,1,3,2,1001,2,1,3,4,3,99"
    );
    expect(programB.program.join(",")).toBe(
      "43,44,45,46,1,1,4,1,3,2,1001,2,1,3,4,3,99"
    );
  });
});
