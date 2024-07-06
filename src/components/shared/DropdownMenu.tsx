import styled from 'styled-components'
import { COLORS } from '../../styles/colors'
import DropdownArrow from '../../../public/img/DropdownArrow.svg'
import { TEXT_SIZE_4 } from '../../styles/fonts'

export const DropdownMenu = ({
  optionsArray,
  placeholder,
}: {
  optionsArray: string[]
  placeholder?: string
}) => {
  return (
    <Select imageURL={DropdownArrow}>
      <div aria-hidden="true">Choose category</div>

      {placeholder ? (
        <OptionSelected value="" disabled selected>
          {placeholder}
        </OptionSelected>
      ) : null}
      {optionsArray.map((option) => {
        return <Option>{option}</Option>
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
  background-image: url(${({ imageURL }) => imageURL}),
    linear-gradient(
      to bottom,
      ${COLORS.backgroundColor} 0,
      ${COLORS.backgroundColor} 100%
    );
  background-position: right 4px bottom 2px, 0 0;
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
