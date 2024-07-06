import styled from 'styled-components'
import { COLORS } from '../../styles/colors'
import { IconButton } from '../Buttons/IconButton'
import { TEXT_SIZE_3_LIGHT } from '../../styles/fonts'
import { Cross } from '../../icons/Cross'

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

  border: 1px solid ${COLORS.lightGray};
  border-radius: 3px;

  &:focus-visible,
  &:focus,
  &:active {
    border: 1px solid ${COLORS.oliveGreen};
  }
`

const InputInField = styled.input`
  background-color: transparent;
  border: 0;
  ${TEXT_SIZE_3_LIGHT};
  width: fit-content;
  color: ${COLORS.oliveGreen};

  &:focus-visible {
    outline: none;
  }

  &::-webkit-input-placeholder {
    color: ${COLORS.oliveGreenDisable};
  }
`
