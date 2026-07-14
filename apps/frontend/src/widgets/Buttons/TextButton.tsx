import styled from 'styled-components'

import { COLORS } from '@shared/styles/colors'
import { TEXT_SIZE_4 } from '@shared/styles/fonts'

type TextButtonProps = {
    children: string
    onClick?: () => void
    type?: 'button' | 'submit'
    disabled?: boolean
}

export const TextButton = ({ children, onClick, type = 'button', disabled }: TextButtonProps) => {
    return (
        <Layout type={type} onClick={onClick} disabled={disabled}>
            {children}
        </Layout>
    )
}

const Layout = styled.button`
    position: relative;
    display: block;
    padding: 0;
    margin: 0;
    max-width: max-content;

    background: transparent;
    color: ${COLORS.danger};
    ${TEXT_SIZE_4};

    transition: opacity 0.2s ease;

    &:hover:not(:disabled) {
        opacity: 0.7;
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`
