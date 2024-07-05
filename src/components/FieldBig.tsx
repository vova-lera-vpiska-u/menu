import styled from 'styled-components'
import { colors } from '../styles/colors'
import { IconButton } from './Buttons/IconButton'
import { text_h3_light } from '../styles/fonts'
import { Cross } from '../icons/Cross'

export const FieldBig = ({
  type,
  name,
  placeholder,
}: {
  type: string
  name: string
  placeholder: string
}) => {
  return (
    <Layout>
      <InputInField type={type} name={name} placeholder={placeholder} />
      <IconButton>
        <Cross height="29" width="29" />
      </IconButton>
    </Layout>
  )
}

const Layout = styled.div`
  position: relative;
  display: flex;
  padding: 4px 8px 4px 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-height: 37px;
  width: 100%;
  box-sizing: border-box;
  gap: 10px;

  border: 1px solid ${colors.lightGray};
  border-radius: 3px;

  &:focus-visible,
  &:focus,
  &:active {
    border: 1px solid ${colors.oliveGreen};
  }
`

const InputInField = styled.input`
  background-color: transparent;
  border: 0;
  ${text_h3_light};
  width: fit-content;
  color: ${colors.oliveGreen};

  &:focus-visible {
    outline: none;
  }

  &::-webkit-input-placeholder {
    color: ${colors.oliveGreenDisable};
  }
`
