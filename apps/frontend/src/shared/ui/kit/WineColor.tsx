import { ButtonHTMLAttributes } from 'react'

import styled, { css } from 'styled-components'

import { COLORS } from '@shared/styles/colors'
import { TEXT_SIZE_5 } from '@shared/styles/fonts'

export type WineColorKind = 'white' | 'red' | 'pink' | 'orange' | 'sparkling'

const colorMap: Record<WineColorKind, string> = {
    white: COLORS.wineYellow,
    red: COLORS.wineRed,
    pink: COLORS.winePink,
    orange: COLORS.wineOrange,
    sparkling: COLORS.wineBlue,
}

type WineColorProps = {
    kind: WineColorKind
    selected?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export const WineColor = ({ kind, selected, ...props }: WineColorProps) => {
    if (kind === 'sparkling') {
        return (
            <SparklingPill $selected={selected} {...props}>
                SPARKLING
            </SparklingPill>
        )
    }

    return <Swatch $color={colorMap[kind]} $selected={selected} {...props} />
}

const selectedRing = css`
    box-shadow:
        0 0 0 2px ${COLORS.backgroundColor},
        0 0 0 4px ${COLORS.white};
`

const Swatch = styled.button<{ $color: string; $selected?: boolean }>`
    width: 31px;
    height: 31px;
    padding: 0;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    background-color: ${({ $color }) => $color};
    transition: box-shadow 0.2s ease;

    &:hover {
        ${selectedRing};
    }
    ${({ $selected }) => $selected && selectedRing};
`

const SparklingPill = styled.button<{ $selected?: boolean }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 31px;
    padding: 0 14px;
    border: none;
    border-radius: 100px;
    cursor: pointer;
    color: ${COLORS.white};
    background-color: ${COLORS.wineBlue};
    letter-spacing: 0.04em;
    ${TEXT_SIZE_5};
    transition: box-shadow 0.2s ease;

    &:hover {
        ${selectedRing};
    }
    ${({ $selected }) => $selected && selectedRing};
`
