import { InputHTMLAttributes, ReactNode } from 'react'

import { Check } from 'feather-icons-react'
import styled from 'styled-components'

import { COLORS } from '@shared/styles/colors'
import { TEXT_SIZE_5 } from '@shared/styles/fonts'

type CheckboxProps = {
    label?: ReactNode
    labelColor?: string
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

export const Checkbox = ({ label, labelColor = COLORS.lightGray, checked, ...props }: CheckboxProps) => {
    return (
        <Label $color={labelColor}>
            <NativeInput type="checkbox" checked={checked} {...props} />
            <Box>
                <Check size={14} strokeWidth={3} />
            </Box>
            {label}
        </Label>
    )
}

const Label = styled.label<{ $color: string }>`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    user-select: none;
    text-align: left;
    color: ${({ $color }) => $color};
    ${TEXT_SIZE_5};
`

const Box = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    box-sizing: border-box;
    background-color: ${COLORS.backgroundColor};
    border: 1px solid ${COLORS.oliveGreen};
    color: transparent;
    transition:
        border-color 0.2s ease,
        background-color 0.2s ease,
        color 0.2s ease;
`

const NativeInput = styled.input`
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;

    &:hover + ${Box} {
        border-color: ${COLORS.oliveGreenHover};
    }
    &:checked + ${Box} {
        color: ${COLORS.oliveGreen};
    }
    &:focus-visible + ${Box} {
        border-color: ${COLORS.oliveGreenHover};
        box-shadow: 0 0 0 2px rgba(143, 168, 71, 0.4);
    }
`
