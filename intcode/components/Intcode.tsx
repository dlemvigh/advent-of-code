import { useState } from "react";
import styled from "styled-components";
import { ProgramInput } from "./Program/ProgramInput";
import { ProgramSelector } from "./Program/ProgramSelector";
import { Runner } from "./Runner/Runner";
import * as samples from "../lib/samples";

const Row = styled.div`
    display: flex;
    > * + * {
        margin-left: 8px;
    }
`

export function Intcode() {
    const [program, setProgram] = useState(samples.sample);
    return (
        <>
            <Row>
                <div style={{ flexGrow: 1 }}>
                    <ProgramInput program={program} onChange={setProgram} />
                </div>
                <ProgramSelector onChange={setProgram} />
            </Row>
            <Row>
                <Runner program={program} />
                {/* <Runner program={program} />
                <Runner program={program} /> */}
            </Row>
        </>
    )
}