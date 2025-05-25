import { HTMLProps } from 'react'

import styled from 'styled-components'

import DropdownArrow from '@shared/assets/img/DropdownArrow.svg'
import { COLORS } from '@shared/styles/colors'
import { TEXT_SIZE_4 } from '@shared/styles/fonts'

export const DropdownMenu = ({
    optionsArray,
    placeholder,
    ...props
}: { optionsArray: string[]; placeholder?: string } & HTMLProps<HTMLSelectElement>) => {
    return (
        <Select imageURL={DropdownArrow} {...props}>
            <div aria-hidden="true">Choose category</div>

            {placeholder ? (
                <OptionSelected value="" disabled selected>
                    {placeholder}
                </OptionSelected>
            ) : null}
            {optionsArray.map((option) => {
                return (
                    <Option key={option} value={option}>
                        {option}
                    </Option>
                )
            })}
        </Select>
    )
}

const Select = styled.select<{ imageURL: string }>`
    list-style: none;
    padding: 3px 4px 3px 8px;
    margin: 0;
    width: 100%;
    -moz-appearance: none;
    -webkit-appearance: none;

    box-sizing: border-box;
    appearance: none;

    border: 1px solid ${COLORS.lightGray};
    background-color: transparent;
    background-image:
        url(${({ imageURL }) => imageURL}),
        linear-gradient(to bottom, ${COLORS.backgroundColor} 0, ${COLORS.backgroundColor} 100%);
    background-position:
        right 4px bottom 2px,
        0 0;
    background-repeat: no-repeat, repeat;
    /* background-size: 100%; */

    ${TEXT_SIZE_4}
`
const Option = styled.option`
    padding: 2px 4px 2px 8px;

    background-color: ${COLORS.backgroundColor};
    border-left: 1px solid ${COLORS.backgroundColor};
    border-right: 1px solid ${COLORS.backgroundColor};
    ${TEXT_SIZE_4};
    color: ${COLORS.white};
    width: 100%;
`

const OptionSelected = styled.option`
    padding: 2px 4px 2px 8px;

    background-color: ${COLORS.backgroundColor};
    border-left: 1px solid ${COLORS.backgroundColor};
    border-right: 1px solid ${COLORS.backgroundColor};
    ${TEXT_SIZE_4};
    color: ${COLORS.oliveGreenDisable};
    width: 100%;
`
