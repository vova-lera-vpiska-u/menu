import { Droplet } from 'feather-icons-react'
import styled from 'styled-components'

import { COLORS } from '@shared/styles/colors'

export type WineTechnology = 'classic' | 'fortified' | 'sparkling'

type WineGlassProps = {
    technology?: WineTechnology
    size?: number
    color?: string
    active?: boolean
}

/** Approximated wine-glass illustrations (the Figma artwork has no published asset). */
export const WineGlass = ({ technology = 'classic', size = 72, color, active }: WineGlassProps) => {
    const stroke = color ?? (active ? COLORS.oliveGreen : COLORS.lightGray)

    return (
        <svg width={size} height={size} viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            {technology === 'classic' && (
                <path
                    d="M22 12h28c0 12-6 22-14 22S22 24 22 12zM36 34v20m-10 6h20"
                    stroke={stroke}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            )}
            {technology === 'fortified' && (
                <path
                    d="M26 16h20c0 9-4.5 16-10 16s-10-7-10-16zM36 32v18m-8 6h16"
                    stroke={stroke}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            )}
            {technology === 'sparkling' && (
                <path
                    d="M30 10h12l-2 30h-8l-2-30zM36 40v16m-7 4h14"
                    stroke={stroke}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            )}
        </svg>
    )
}

export type SugarLevel = 1 | 2 | 3 | 4

type SugarProps = {
    level?: SugarLevel
    color?: string
}

/** Sweetness level shown as filled droplets. */
export const Sugar = ({ level = 1, color = COLORS.wineYellow }: SugarProps) => {
    return (
        <SugarRow>
            {[1, 2, 3, 4].map((step) => (
                <Droplet
                    key={step}
                    size={20}
                    color={color}
                    fill={step <= level ? color : 'transparent'}
                    opacity={step <= level ? 1 : 0.35}
                />
            ))}
        </SugarRow>
    )
}

const SugarRow = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 4px;
`
