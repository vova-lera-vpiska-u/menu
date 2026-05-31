import { ButtonHTMLAttributes, ReactNode } from 'react'

import styled, { css } from 'styled-components'

import { COLORS } from '@shared/styles/colors'
import { TEXT_SIZE_5 } from '@shared/styles/fonts'

import { ChipState } from './Chip'

type TagProps = {
    forcedState?: ChipState
    selected?: boolean
    children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Tag = ({ forcedState, selected, children, ...props }: TagProps) => {
    const state = forcedState ?? (selected ? 'active' : 'default')

    return (
        <StyledTag $state={state} {...props}>
            {children}
        </StyledTag>
    )
}

const stateStyles: Record<ChipState, ReturnType<typeof css>> = {
    default: css`
        background-color: transparent;
        border-color: ${COLORS.chipBorder};
        color: ${COLORS.lightGray};
    `,
    active: css`
        background-color: ${COLORS.white};
        border-color: ${COLORS.white};
        color: ${COLORS.black};
    `,
    focus: css`
        background-color: transparent;
        border-color: ${COLORS.oliveGreen};
        color: ${COLORS.oliveGreen};
    `,
}

const StyledTag = styled.button<{ $state: ChipState }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    box-sizing: border-box;
    border: 1px solid transparent;
    border-radius: 3px;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    ${TEXT_SIZE_5};
    transition:
        background-color 0.2s ease,
        border-color 0.2s ease,
        color 0.2s ease;

    ${({ $state }) => stateStyles[$state]};
`
