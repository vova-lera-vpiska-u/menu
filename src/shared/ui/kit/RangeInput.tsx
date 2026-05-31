import styled from 'styled-components'

import { COLORS } from '@shared/styles/colors'
import { TEXT_SIZE_5 } from '@shared/styles/fonts'

type RangeInputProps = {
    min?: number
    max?: number
    valueStart?: number
    valueEnd?: number
}

export const RangeInput = ({ min = 3, max = 9, valueStart = 3, valueEnd = 5 }: RangeInputProps) => {
    const span = max - min
    const startPercent = ((valueStart - min) / span) * 100
    const endPercent = ((valueEnd - min) / span) * 100
    const ticks = Array.from({ length: span + 1 }).map((_, index) => min + index)

    return (
        <Layout>
            <Track>
                <Filled style={{ left: `${startPercent}%`, width: `${endPercent - startPercent}%` }} />
                <Thumb $color={COLORS.wineRed} style={{ left: `${startPercent}%` }} />
                <Thumb $color={COLORS.wineWhite} style={{ left: `${endPercent}%` }} />
            </Track>
            <Scale>
                {ticks.map((tick) => (
                    <Tick key={tick}>{tick}</Tick>
                ))}
            </Scale>
        </Layout>
    )
}

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
    width: 368px;
    max-width: 100%;
`

const Track = styled.div`
    position: relative;
    height: 16px;
`

const Filled = styled.div`
    position: absolute;
    top: 6px;
    height: 4px;
    border-radius: 100px;
    background-color: ${COLORS.oliveGreen};
`

const Thumb = styled.div<{ $color: string }>`
    position: absolute;
    top: 0;
    width: 6px;
    height: 16px;
    border-radius: 3px;
    transform: translateX(-50%);
    background-color: ${({ $color }) => $color};
`

const Scale = styled.div`
    display: flex;
    justify-content: space-between;
    color: ${COLORS.lightGray};
    ${TEXT_SIZE_5};
`

const Tick = styled.span`
    width: 7px;
    text-align: center;
`
