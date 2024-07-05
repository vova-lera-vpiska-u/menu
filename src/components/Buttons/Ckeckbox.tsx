import styled from 'styled-components'
import { colors } from '../../styles/colors'
import Check from '../../../public/img/Check.png'
import { text_h5 } from '../../styles/fonts'

export const Checkbox = ({ children }: { children: React.ReactNode }) => {
  return (
    <Label>
      <Input type="checkbox" id="check" imageURL={Check}></Input>
      {children}
    </Label>
  )
}

const Input = styled.input<{ imageURL: string }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 16px;
  max-width: 16px;
  width: 100%;
  box-sizing: border-box;
  background-color: transparent;
  accent-color: ${colors.oliveGreen};

  & + label {
    display: inline-flex;
    align-items: center;
    user-select: none;
  }
  & + label::before {
    content: '';
    display: inline-block;
    width: 1em;
    height: 1em;
    flex-shrink: 0;
    flex-grow: 0;
    border: 1px solid ${colors.oliveGreen};
    border-radius: 0.25em;
    margin-right: 0.5em;
    background-repeat: no-repeat;
    background-position: center center;
    background: none;
  }
  &:checked + label::before {
    background-image: url(${({ imageURL }) => imageURL});
  }
`

const Label = styled.label`
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 8px;

  ${text_h5};
  text-align: left;
`
