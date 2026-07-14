import styled from 'styled-components'

import { COLORS } from '@shared/styles/colors'
import { TEXT_SIZE_3_REGULAR } from '@shared/styles/fonts'

export const BigButton = ({ children, disabled }: { children: React.ReactNode; disabled?: boolean }) => {
    return (
        <Button type="submit" disabled={disabled}>
            {children}
        </Button>
    )
}

const Button = styled.button`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 41px;
    min-width: 29px;
    width: 100%;
    padding: 6px 0;
    box-sizing: border-box;
    background-color: ${COLORS.oliveGreen};
    border-radius: 3px;

    ${TEXT_SIZE_3_REGULAR}
    color: ${COLORS.white};

    transition: opacity 0.2s ease;

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`
