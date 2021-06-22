import { useState } from "react";
import { ProgramInput } from "./Program/ProgramInput";

import { day2 } from "../lib/samples";

export function Intcode() {
    const [program, setProgram] = useState(day2);
    return (
        <>
            <ProgramInput program={program} onChange={setProgram} />
        </>
    )
}