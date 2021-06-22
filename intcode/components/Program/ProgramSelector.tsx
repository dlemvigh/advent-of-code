import { useCallback, memo } from "react";
import styled from "styled-components"
import { useRenderCount } from "../../hooks/useRenderCount";
import * as samples from "../../lib/samples";

const Button = styled.button`
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: calc(1em + 2px);

    > * + * {
        margin-top: 4px;
    }
`;

interface ProgramSelectorProps {
    onChange: (program: string) => void;
}

export function ProgramSelector({ onChange }: ProgramSelectorProps) {
    return (
        <Column>
            {Object.entries<string>(samples).map(([name, program]) => (
                <ProgramSelectorButton key={name} name={name} program={program} onChange={onChange} />
            ))}
        </Column>
    )
}

interface ProgramSelectorButtonProps {
    name: string;
    program: string;
    onChange: (program: string) => void;
}

const ProgramSelectorButton = memo(function ProgramSelectorButton(props: ProgramSelectorButtonProps) {
    const { name, program, onChange } = props;

    const count = useRenderCount();
    const handleClick = useCallback(() => {
        onChange(program);
    }, [program, onChange]);

    return (
        <div>
            <Button key={name} onClick={handleClick}>{name}</Button>({count})
        </div>
    );
});