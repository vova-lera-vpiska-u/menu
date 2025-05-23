import styled from 'styled-components'

import { COLORS } from '../styles/colors'
import { TEXT_SIZE_4 } from '../styles/fonts'

export const ToggleButtonSmall = <T extends { _id: string; name: string }>({
    label,
    labels,
    setLabels,
}: {
    label: T
    labels: T[]
    setLabels: (labels: T[]) => void
}) => {
    const value = !!labels.includes(label)
    return (
        <Label>
            <InvisibleInput
                type="checkbox"
                checked={value}
                onChange={() => {
                    if (value) {
                        setLabels(labels.filter((l) => l._id !== label._id))
                    } else {
                        setLabels([...labels, label])
                    }
                }}
            />
            <Title>{`${label.name}`}</Title>
        </Label>
    )
}

const Label = styled.label`
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
`

const Title = styled.div`
    max-width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 8px 16px;
    box-sizing: border-box;
    border: 1px solid #ffffff;
    border-radius: 3px;
    ${TEXT_SIZE_4}
    color: ${COLORS.white};
    /* vertical-align: text-top; */
    user-select: none;
`

const InvisibleInput = styled.input`
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;

    &:checked + ${Title} {
        box-sizing: border-box;
        background: #ffffff;
        border: 1px solid #ffffff;
        border-radius: 3px;
        color: #000000;
    }
`
