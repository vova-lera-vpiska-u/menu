import styled from 'styled-components'

export const ToggleButton = ({
    label,
    checked,
    setLabel,
}: {
    label: string
    checked: boolean
    setLabel: (labels: string | null) => void
}) => {
    return (
        <Label>
            <InvisibleInput
                type="checkbox"
                checked={checked}
                onChange={() => {
                    if (checked) {
                        setLabel(null)
                    } else {
                        setLabel(label)
                    }
                }}
            />
            <Title>{label}</Title>
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
    color: #ffffff;
    cursor: pointer;
    padding: 6px 20px 5px 20px;
    box-sizing: border-box;
    border: 1px solid #ffffff;
    border-radius: 3px;
    font-family: 'Alumni Sans';
    font-style: normal;
    font-weight: 300;
    font-size: 24px;
    line-height: 29px;
    color: #ffffff;
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
