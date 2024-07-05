import styled from 'styled-components'
import { colors } from '../styles/colors'
import DropdownArrow from '../../public/img/DropdownArrow.svg'
import { text_h4 } from '../styles/fonts'

export const DropdownMenu = ({ optionsArray }: { optionsArray: string[] }) => {
  return (
    <SELECT imageURL={DropdownArrow}>
      <div aria-hidden="true">Choose category</div>
      {optionsArray.map((option) => {
        return <OPTION>{option}</OPTION>
      })}
    </SELECT>
  )
}

const SELECT = styled.select<{ imageURL: string }>`
  list-style: none;
  padding: 4px 4px 4px 8px;
  margin: 0;
  width: 100%;
  -moz-appearance: none;
  -webkit-appearance: none;

  box-sizing: border-box;
  appearance: none;

  border: 1px solid ${colors.lightGray};
  background-color: transparent;
  background-image: url(${({ imageURL }) => imageURL}),
    linear-gradient(
      to bottom,
      ${colors.backgroundColor} 0,
      ${colors.backgroundColor} 100%
    );
  background-position: right 4px bottom 2px, 0 0;
  background-repeat: no-repeat, repeat;
  /* background-size: 100%; */

  ${text_h4}
`
const OPTION = styled.option`
  padding: 2px 4px 2px 8px;

  background-color: ${colors.backgroundColor};
  border-left: 1px solid ${colors.backgroundColor};
  border-right: 1px solid ${colors.backgroundColor};
  ${text_h4};
  color: ${colors.white};
  width: 100%;
`
