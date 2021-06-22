import { useCallback, ChangeEvent, ChangeEventHandler } from "react";
import styled from "styled-components";
import { useRenderCount } from "../../hooks/useRenderCount";

const TextArea = styled.textarea`
    margin: 0;
    box-sizing: border-box;

    width: 100%;
    resize: vertical;    
`

export interface ProgramInputProps {
    program: string;
    onChange: (program: string) => void;
}

export function ProgramInput(props: ProgramInputProps) {
    const { program, onChange } = props;

    const count = useRenderCount();
    const handleChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value);
    }, [onChange]);

    return (
        <label>
            <span>
                Program
            </span>
            <span style={{ float: "right" }}>({count})</span>
            <TextArea value={program} onChange={handleChange} rows={5} />
        </label>
    )
}