import { ButtonHTMLAttributes, ReactNode } from 'react'

import styled from 'styled-components'

import { COLORS } from '@shared/styles/colors'

import { InteractiveState } from './types'

type ButtonIconProps = {
    forcedState?: InteractiveState
    children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export const ButtonIcon = ({ forcedState, children, disabled, ...props }: ButtonIconProps) => {
    return (
        <StyledButton $forcedState={forcedState} disabled={disabled || forcedState === 'disable'} {...props}>
            {children}
        </StyledButton>
    )
}

const StyledButton = styled.button<{ $forcedState?: InteractiveState }>`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 26px;
    min-height: 26px;
    max-height: 29px;
    padding: 0;
    box-sizing: border-box;
    background-color: transparent;
    border: none;
    flex-shrink: 0;
    cursor: pointer;
    color: ${COLORS.lightGray};
    transition: color 0.2s ease;

    &:hover:not(:disabled) {
        color: ${COLORS.white};
    }
    &:active:not(:disabled) {
        color: ${COLORS.oliveGreen};
    }
    &:focus-visible {
        outline: none;
        color: ${COLORS.white};
    }
    &:disabled {
        color: ${COLORS.oliveGreenDisable};
        cursor: not-allowed;
    }

    color: ${({ $forcedState }) =>
        $forcedState === 'hover'
            ? COLORS.white
            : $forcedState === 'active'
              ? COLORS.oliveGreen
              : $forcedState === 'disable'
                ? COLORS.oliveGreenDisable
                : COLORS.lightGray};
`
