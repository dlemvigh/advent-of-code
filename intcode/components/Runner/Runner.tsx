import { useState, useCallback, useEffect } from "react";
import styled from "styled-components"
import { Opcode, Mode, getOpLength } from "../../lib/intcode";
import { Memory } from "./Memory"
const Op = styled.strong``;
const Param = styled.span``;

const Frame = styled.div`
    display: flex;
    flex-direction: column;

    border: 1px solid black;
    border-radius: 5px;

    font-family: 'Courier New', Courier, monospace;
    padding: 4px;
    min-width: 300px;

    ${Param} + ${Op} {
        margin-top: 8px;
    }
`


export interface RunnerProps {
  program: string;
}

export function Runner({ program: input }: RunnerProps): JSX.Element {
  const [p, setP] = useState(0);
  const [program, setProgram] = useState(input.split(",").map(Number));
  const [log, setLog] = useState<JSX.Element[]>([]);

  const handleStep = useCallback(() => {
    const lines = <Command program={program} p={p} />
    setLog(log => [...log, lines]);
    setP(p => p + 1 + getOpLength(program[p]));
  }, [program, p])

  const handleReset = useCallback(() => {
    setProgram(input.split(",").map(Number));
    setLog([]);
    setP(0);
  }, [input])

  useEffect(() => {
    console.log("input", input)
    handleReset();
  }, [input, handleReset]);

  return (
    <div>
      <button onClick={handleStep}>step</button>
      <button onClick={handleReset}>reset</button>
      <div style={{ display: "flex " }}>
        <Frame>
          {log}
          {<Command program={program} p={p} />}
        </Frame>
        <Memory program={program} />
      </div>
    </div>
  )
}

interface CommandProps {
  program: number[];
  p: number;
}
function Command({ program, p }: CommandProps) {
  const op = program[p];
  const name = Opcode[op];
  return (
    <>
      <Op>{name}</Op>
      <Param>{printCommand(program, p)}</Param>
    </>
  )
}

function printCommand(program: number[], p: number) {
  switch (program[p]) {
    case Opcode.Add: return `m[${program[p + 3]}] = m[${program[p + 1]}] + m[${program[p + 2]}] = ${program[program[p + 1]]} + ${program[program[p + 2]]}`;
    case Opcode.Multiply: return `m[${program[p + 3]}] = m[${program[p + 1]}] * m[${program[p + 2]}] = ${program[program[p + 1]]} * ${program[program[p + 2]]}`;
    case Opcode.Input: return `m[${program[p + 1]}]`;
  }
}