import styled from 'styled-components'

import '@shared/ui/ui/checkboxInput.css'

import { TEXT_SIZE_5 } from '@shared/styles/fonts'

export const Checkbox = ({
    children,
    gap,
    labelColor,
}: {
    children: React.ReactNode
    gap: string
    labelColor: string
}) => {
    return (
        <Label gap={gap} labelColor={labelColor}>
            <input type="checkbox" className="checkboxInput"></input>
            {children}
        </Label>
    )
}

// const Input = styled.input<{ imageURL: string }>``

const Label = styled.label<{ gap: string; labelColor: string }>`
    position: relative;
    display: flex;
    flex-direction: row;
    gap: ${({ gap }) => gap};

    ${TEXT_SIZE_5};
    color: ${({ labelColor }) => labelColor};
    text-align: left;
`
