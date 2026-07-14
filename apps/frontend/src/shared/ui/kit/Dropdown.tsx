import { ChevronDown } from 'feather-icons-react'
import styled, { css } from 'styled-components'

import { COLORS } from '@shared/styles/colors'
import { TEXT_SIZE_4, TEXT_SIZE_5 } from '@shared/styles/fonts'

export type DropdownState = 'default' | 'hover' | 'completed' | 'disabled' | 'focus'

type DropdownProps = {
    forcedState?: DropdownState
    open?: boolean
    options?: string[]
    value?: string
    placeholder?: string
    onSelect?: (option: string) => void
}

export const Dropdown = ({
    forcedState = 'default',
    open = false,
    options = [],
    value,
    placeholder = 'Who?',
    onSelect,
}: DropdownProps) => {
    const isDisabled = forcedState === 'disabled'
    const hasValue = forcedState === 'completed' || Boolean(value)

    return (
        <Wrapper>
            <Control $state={forcedState} disabled={isDisabled} type="button">
                <ControlLabel $filled={hasValue}>{value ?? placeholder}</ControlLabel>
                <ChevronDown size={16} />
            </Control>
            {open && options.length > 0 && (
                <List>
                    {options.map((option) => (
                        <Item
                            key={option}
                            type="button"
                            $selected={option === value}
                            onClick={() => onSelect?.(option)}
                        >
                            {option}
                        </Item>
                    ))}
                </List>
            )}
        </Wrapper>
    )
}

const borderColorByState: Record<DropdownState, string> = {
    default: COLORS.lightGray,
    hover: COLORS.oliveGreen,
    completed: COLORS.oliveGreen,
    disabled: COLORS.oliveGreenDisable,
    focus: COLORS.oliveGreenHover,
}

const Wrapper = styled.div`
    position: relative;
    width: 100%;
`

const Control = styled.button<{ $state: DropdownState }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 3px 4px 3px 8px;
    box-sizing: border-box;
    background-color: transparent;
    border: 1px solid ${({ $state }) => borderColorByState[$state]};
    cursor: pointer;
    color: ${COLORS.lightGray};
    transition: border-color 0.2s ease;

    &:hover:not(:disabled) {
        border-color: ${COLORS.oliveGreen};
    }
    &:focus-visible {
        outline: none;
        border-color: ${COLORS.oliveGreenHover};
    }
    &:disabled {
        cursor: not-allowed;
        color: ${COLORS.oliveGreenDisable};
    }
`

const ControlLabel = styled.span<{ $filled: boolean }>`
    ${TEXT_SIZE_4};
    color: ${({ $filled }) => ($filled ? COLORS.oliveGreen : COLORS.oliveGreenDisable)};
`

const List = styled.div`
    position: absolute;
    top: calc(100% - 1px);
    left: 0;
    right: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    background-color: ${COLORS.backgroundColor};
    border: 1px solid ${COLORS.oliveGreen};
    border-top: none;
`

const itemBase = css`
    padding: 2px 8px;
    text-align: left;
    background-color: transparent;
    border: none;
    cursor: pointer;
    ${TEXT_SIZE_5};
    transition:
        background-color 0.15s ease,
        color 0.15s ease;
`

const Item = styled.button<{ $selected: boolean }>`
    ${itemBase};
    color: ${({ $selected }) => ($selected ? COLORS.oliveGreen : COLORS.white)};

    &:hover {
        background-color: rgba(255, 255, 255, 0.07);
        color: ${COLORS.oliveGreen};
    }
`
