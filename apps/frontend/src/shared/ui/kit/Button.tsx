import { ButtonHTMLAttributes } from 'react'

import { ChevronRight } from 'feather-icons-react'
import styled, { css } from 'styled-components'

import { COLORS } from '@shared/styles/colors'
import { TEXT_SIZE_3_REGULAR } from '@shared/styles/fonts'

import { InteractiveState } from './types'

export type ButtonVariant = 'fill' | 'outline'

type ButtonProps = {
    variant?: ButtonVariant
    forcedState?: InteractiveState
    rightIcon?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({
    variant = 'fill',
    forcedState,
    rightIcon = true,
    children,
    disabled,
    ...props
}: ButtonProps) => {
    const isDisabled = disabled || forcedState === 'disable'
    const Styled = variant === 'fill' ? FillButton : OutlineButton

    return (
        <Styled $forcedState={forcedState} disabled={isDisabled} {...props}>
            <Label>{children}</Label>
            {rightIcon && <ChevronRight size={24} />}
        </Styled>
    )
}

const Label = styled.span`
    word-break: break-word;
    white-space: nowrap;
    ${TEXT_SIZE_3_REGULAR};
`

const base = css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    width: 100%;
    padding: 6px 16px;
    box-sizing: border-box;
    border-radius: 4px;
    cursor: pointer;
    color: ${COLORS.white};
    transition:
        background-color 0.2s ease,
        border-color 0.2s ease,
        box-shadow 0.2s ease,
        color 0.2s ease;
`

const glow = css`
    box-shadow: inset 0 0 32px 0 rgba(255, 255, 255, 0.28);
`

const innerGlow = css`
    box-shadow: inset 0 0 24px 0 rgba(143, 168, 71, 0.55);
`

/* Fill */
const fillHover = css`
    background-color: ${COLORS.oliveGreen};
    ${glow};
`
const fillActive = css`
    background-color: ${COLORS.oliveGreenActive};
    box-shadow: none;
`
const fillFocus = css`
    background-color: ${COLORS.oliveGreen};
    outline: none;
    box-shadow:
        0 0 0 2px ${COLORS.backgroundColor},
        0 0 0 4px ${COLORS.white};
`
const fillDisable = css`
    background-color: ${COLORS.oliveGreenDisable};
    color: rgba(255, 255, 255, 0.5);
    cursor: not-allowed;
    box-shadow: none;
`

const FillButton = styled.button<{ $forcedState?: InteractiveState }>`
    ${base};
    background-color: ${COLORS.oliveGreen};
    border: 2px solid transparent;

    &:hover:not(:disabled) {
        ${fillHover};
    }
    &:active:not(:disabled) {
        ${fillActive};
    }
    &:focus-visible {
        ${fillFocus};
    }
    &:disabled {
        ${fillDisable};
    }

    ${({ $forcedState }) => $forcedState === 'hover' && fillHover};
    ${({ $forcedState }) => $forcedState === 'active' && fillActive};
    ${({ $forcedState }) => $forcedState === 'focus' && fillFocus};
    ${({ $forcedState }) => $forcedState === 'disable' && fillDisable};
`

/* Outline */
const outlineHover = css`
    border-color: ${COLORS.oliveGreen};
    ${innerGlow};
`
const outlineActive = css`
    border-color: ${COLORS.oliveGreenActive};
    box-shadow: none;
`
const outlineFocus = css`
    border-color: ${COLORS.white};
    outline: none;
    box-shadow: none;
`
const outlineDisable = css`
    border-color: ${COLORS.oliveGreenDisable};
    color: ${COLORS.oliveGreenDisable};
    cursor: not-allowed;
    box-shadow: none;
`

const OutlineButton = styled.button<{ $forcedState?: InteractiveState }>`
    ${base};
    background-color: transparent;
    border: 2px solid ${COLORS.oliveGreen};

    &:hover:not(:disabled) {
        ${outlineHover};
    }
    &:active:not(:disabled) {
        ${outlineActive};
    }
    &:focus-visible {
        ${outlineFocus};
    }
    &:disabled {
        ${outlineDisable};
    }

    ${({ $forcedState }) => $forcedState === 'hover' && outlineHover};
    ${({ $forcedState }) => $forcedState === 'active' && outlineActive};
    ${({ $forcedState }) => $forcedState === 'focus' && outlineFocus};
    ${({ $forcedState }) => $forcedState === 'disable' && outlineDisable};
`
