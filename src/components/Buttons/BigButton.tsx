import styled from 'styled-components'
import { colors } from '../../styles/colors'
import { text_h3_regular } from '../../styles/fonts'

export const BigButton = ({ children }: { children: React.ReactNode }) => {
  return <Button type="submit">{children}</Button>
}

const Button = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 41px;
  min-width: 29px;
  width: 100%;
  box-sizing: border-box;
  background-color: ${colors.oliveGreen};

  ${text_h3_regular}
  color: ${colors.white};
`
