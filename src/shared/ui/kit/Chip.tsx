import { ButtonHTMLAttributes, ReactNode } from 'react'

import styled, { css } from 'styled-components'

import { COLORS } from '@shared/styles/colors'
import { TEXT_SIZE_4, TEXT_SIZE_5 } from '@shared/styles/fonts'

export type ChipSize = 'big' | 'small' | 'category'
export type ChipState = 'default' | 'active' | 'focus'

type ChipProps = {
    size?: ChipSize
    forcedState?: ChipState
    selected?: boolean
    leftIcon?: ReactNode
    colorDot?: string
    children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Chip = ({ size = 'small', forcedState, selected, leftIcon, colorDot, children, ...props }: ChipProps) => {
    const state = forcedState ?? (selected ? 'active' : 'default')

    return (
        <StyledChip $size={size} $state={state} {...props}>
            {leftIcon}
            <span>{children}</span>
            {colorDot && <Dot $color={colorDot} />}
        </StyledChip>
    )
}

const Dot = styled.span<{ $color: string }>`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
    background-color: ${({ $color }) => $color};
`

const sizeStyles: Record<ChipSize, ReturnType<typeof css>> = {
    big: css`
        padding: 6px 18px;
        border-radius: 100px;
        ${TEXT_SIZE_4};
    `,
    small: css`
        padding: 8px 16px;
        border-radius: 100px;
        ${TEXT_SIZE_5};
    `,
    category: css`
        padding: 2px 4px;
        border-radius: 4px;
        border-color: transparent !important;
        ${TEXT_SIZE_4};
    `,
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

const categoryStateColor: Record<ChipState, string> = {
    default: COLORS.lightGray,
    active: COLORS.white,
    focus: COLORS.oliveGreen,
}

const StyledChip = styled.button<{ $size: ChipSize; $state: ChipState }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    box-sizing: border-box;
    border: 1px solid transparent;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    transition:
        background-color 0.2s ease,
        border-color 0.2s ease,
        color 0.2s ease;

    ${({ $size }) => sizeStyles[$size]};
    ${({ $size, $state }) =>
        $size === 'category'
            ? css`
                  background-color: transparent;
                  color: ${categoryStateColor[$state]};
              `
            : stateStyles[$state]};
`
