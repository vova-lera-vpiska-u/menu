import { InputHTMLAttributes } from 'react'

import styled, { css } from 'styled-components'

import { Cross } from '@shared/icons/Cross'
import { COLORS } from '@shared/styles/colors'
import { TEXT_SIZE_3_LIGHT, TEXT_SIZE_4, TEXT_SIZE_5 } from '@shared/styles/fonts'

import { FieldState } from './types'

export type FieldSize = 'big' | 'small'

type FieldProps = {
    size?: FieldSize
    forcedState?: FieldState
    errorMessage?: string
    showClear?: boolean
    onClear?: () => void
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>

const borderColorByState: Record<FieldState, string> = {
    default: COLORS.lightGray,
    hover: COLORS.oliveGreen,
    active: COLORS.oliveGreen,
    completed: COLORS.oliveGreen,
    error: COLORS.danger,
    disable: COLORS.oliveGreenDisable,
    focus: COLORS.oliveGreenHover,
}

export const Field = ({
    size = 'big',
    forcedState = 'default',
    errorMessage,
    showClear = true,
    onClear,
    disabled,
    ...props
}: FieldProps) => {
    const isDisabled = disabled || forcedState === 'disable'
    const iconSize = size === 'big' ? '24' : '16'

    return (
        <Wrapper>
            <Layout $size={size} $state={forcedState}>
                <Input $size={size} $state={forcedState} disabled={isDisabled} {...props} />
                {showClear && (
                    <ClearButton type="button" onClick={onClear} disabled={isDisabled}>
                        <Cross height={iconSize} width={iconSize} />
                    </ClearButton>
                )}
            </Layout>
            {forcedState === 'error' && errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
`

const sizeLayout: Record<FieldSize, ReturnType<typeof css>> = {
    big: css`
        padding: 4px 8px 4px 16px;
        min-height: 37px;
        border-radius: 3px;
        gap: 10px;
    `,
    small: css`
        padding: 4px 4px 4px 8px;
        min-height: 32px;
        border-radius: 0;
        gap: 8px;
    `,
}

const Layout = styled.div<{ $size: FieldSize; $state: FieldState }>`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid ${({ $state }) => borderColorByState[$state]};
    transition: border-color 0.2s ease;

    ${({ $size }) => sizeLayout[$size]};

    &:hover {
        border-color: ${({ $state }) =>
            $state === 'disable' || $state === 'error' ? borderColorByState[$state] : COLORS.oliveGreen};
    }
    &:focus-within {
        border-color: ${({ $state }) => ($state === 'error' ? COLORS.danger : COLORS.oliveGreenHover)};
    }
`

const Input = styled.input<{ $size: FieldSize; $state: FieldState }>`
    width: 100%;
    border: 0;
    background-color: transparent;
    ${({ $size }) => ($size === 'big' ? TEXT_SIZE_3_LIGHT : TEXT_SIZE_4)};
    color: ${({ $state }) =>
        $state === 'error' ? COLORS.danger : $state === 'disable' ? COLORS.oliveGreenDisable : COLORS.oliveGreen};

    &:focus-visible {
        outline: none;
    }
    &::placeholder {
        color: ${COLORS.oliveGreenDisable};
    }
    &:disabled {
        cursor: not-allowed;
    }
`

const ClearButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: none;
    background-color: transparent;
    cursor: pointer;
    flex-shrink: 0;
    color: ${COLORS.lightGray};

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
`

const ErrorText = styled.span`
    text-align: right;
    color: ${COLORS.danger};
    ${TEXT_SIZE_5};
`
