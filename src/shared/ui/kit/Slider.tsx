import styled from 'styled-components'

import { COLORS } from '@shared/styles/colors'

type ScrollbarProps = {
    value?: number
    width?: number
}

export const Scrollbar = ({ value = 25, width = 368 }: ScrollbarProps) => {
    const clamped = Math.min(100, Math.max(0, value))

    return (
        <ScrollbarTrack style={{ width: `${width}px` }}>
            <ScrollbarThumb style={{ width: `${clamped}%` }} />
        </ScrollbarTrack>
    )
}

const ScrollbarTrack = styled.div`
    position: relative;
    height: 4px;
    max-width: 100%;
    border-radius: 100px;
    background-color: ${COLORS.darkGray};
`

const ScrollbarThumb = styled.div`
    position: absolute;
    inset: 0 auto 0 0;
    height: 100%;
    border-radius: 100px;
    background-color: ${COLORS.oliveGreen};
`

type SliderProps = {
    count?: number
    active?: number
}

export const Slider = ({ count = 5, active = 0 }: SliderProps) => {
    return (
        <SliderRow>
            {Array.from({ length: count }).map((_, index) => (
                <Dot key={index} $active={index === active} />
            ))}
        </SliderRow>
    )
}

const SliderRow = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 6px;
`

const Dot = styled.span<{ $active: boolean }>`
    height: 7px;
    width: ${({ $active }) => ($active ? '18px' : '7px')};
    border-radius: 100px;
    background-color: ${({ $active }) => ($active ? COLORS.oliveGreen : COLORS.oliveGreenDisable)};
    transition:
        width 0.2s ease,
        background-color 0.2s ease;
`
