import styled from 'styled-components'

import { COLORS } from '@shared/styles/colors'

export const IconButton = (
    props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
) => {
    return <Button {...props} />
}

const Button = styled.button`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 29px;
    min-height: 26px;
    min-width: 26px;
    box-sizing: border-box;
    background-color: transparent;
    padding: 0;
    border: none;
    flex-shrink: 0;

    color: ${COLORS.lightGray};

    &:focus:not(:focus-visible) {
        outline: none;
    }
`
