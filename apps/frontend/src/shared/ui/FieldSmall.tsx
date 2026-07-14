import { HTMLProps } from 'react'

import styled from 'styled-components'

import { IconButton } from '@widgets/Buttons/IconButton'

import { Cross } from '@shared/icons/Cross'
import { COLORS } from '@shared/styles/colors'
import { TEXT_SIZE_4 } from '@shared/styles/fonts'

export const FieldSmall = ({
    type,
    name,
    placeholder,
    iconVisible,
    iconHeight,
    iconWidth,
    ...props
}: {
    type: string
    name: string
    placeholder?: string
    iconVisible: boolean
    iconHeight?: string
    iconWidth?: string
} & HTMLProps<HTMLInputElement>) => {
    return (
        <Layout>
            <InputInField type={type} name={name} placeholder={placeholder} {...props} />
            {iconVisible && (
                <IconButton>
                    <Cross height={iconHeight} width={iconWidth} />
                </IconButton>
            )}
        </Layout>
    )
}

const Layout = styled.div`
    position: relative;
    display: flex;
    padding: 4px 4px 4px 8px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    max-height: 32px;
    width: 100%;
    box-sizing: border-box;
    gap: 10px;

    border: 1px solid ${COLORS.lightGray};

    &:focus-visible,
    &:focus,
    &:active {
        border: 1px solid ${COLORS.oliveGreen};
    }
`

const InputInField = styled.input`
    background-color: transparent;
    border: 0;
    ${TEXT_SIZE_4};
    width: 100%;
    color: ${COLORS.oliveGreen};

    &:focus-visible {
        outline: none;
    }

    &::-webkit-input-placeholder {
        color: ${COLORS.oliveGreenDisable};
    }
`
