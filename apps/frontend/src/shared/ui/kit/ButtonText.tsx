import { ButtonHTMLAttributes } from 'react'

import { ChevronRight } from 'feather-icons-react'
import styled, { css } from 'styled-components'

import { COLORS } from '@shared/styles/colors'
import { TEXT_SIZE_4 } from '@shared/styles/fonts'

import { InteractiveState } from './types'

type ButtonTextProps = {
    forcedState?: InteractiveState
    rightIcon?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export const ButtonText = ({ forcedState, rightIcon = true, children, disabled, ...props }: ButtonTextProps) => {
    return (
        <StyledButton $forcedState={forcedState} disabled={disabled || forcedState === 'disable'} {...props}>
            <span>{children}</span>
            {rightIcon && <ChevronRight size={20} />}
        </StyledButton>
    )
}

const hover = css`
    color: ${COLORS.oliveGreenHover};
`
const active = css`
    color: ${COLORS.oliveGreenActive};
`
const focus = css`
    color: ${COLORS.white};
    border-color: ${COLORS.white};
    outline: none;
`
const disable = css`
    color: ${COLORS.oliveGreenDisable};
    cursor: not-allowed;
`

const StyledButton = styled.button<{ $forcedState?: InteractiveState }>`
    display: inline-flex;
    align-items: center;
    gap: 2px;
    padding: 2px 6px;
    background-color: transparent;
    border: 1px solid transparent;
    border-radius: 4px;
    cursor: pointer;
    color: ${COLORS.white};
    ${TEXT_SIZE_4};
    transition:
        color 0.2s ease,
        border-color 0.2s ease;

    &:hover:not(:disabled) {
        ${hover};
    }
    &:active:not(:disabled) {
        ${active};
    }
    &:focus-visible {
        ${focus};
    }
    &:disabled {
        ${disable};
    }

    ${({ $forcedState }) => $forcedState === 'hover' && hover};
    ${({ $forcedState }) => $forcedState === 'active' && active};
    ${({ $forcedState }) => $forcedState === 'focus' && focus};
    ${({ $forcedState }) => $forcedState === 'disable' && disable};
`
