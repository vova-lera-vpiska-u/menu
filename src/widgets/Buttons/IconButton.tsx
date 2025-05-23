import styled from 'styled-components'

import { COLORS } from '../../shared/styles/colors'

export const IconButton = ({ children }: { children: JSX.Element }) => {
    return <Button>{children}</Button>
}

const Button = styled.button`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 29px;
    min-width: 29px;
    box-sizing: border-box;
    background-color: transparent;
    padding: 0;

    color: ${COLORS.lightGray};
`
