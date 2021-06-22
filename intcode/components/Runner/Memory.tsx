import { Fragment } from "react";
import styled from "styled-components"

const Column = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;

  font-family: 'Courier New', Courier, monospace;
  text-align: right;
`

interface MemoryProps {
  program: number[];
}

export function Memory({ program }: MemoryProps): JSX.Element {
  return (
    <Column>
      {program.map((value, index) => (
        <Fragment key={`m[${index}]=${value}`}>
          <span>m[{index}]</span>
          <span style={{ margin: "0 4px" }}>=</span>
          <span>{value}</span>
        </Fragment>
      ))}
    </Column>
  );
}