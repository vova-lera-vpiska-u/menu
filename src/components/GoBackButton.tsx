import { Link, LinkProps } from 'react-router-dom'
import styled from 'styled-components'
import { GoBack } from '../icons/GoBack'

export const GoBackButton = (props: LinkProps) => {
  return (
    <Layout {...props}>
      <GoBack />
    </Layout>
  )
}

const Layout = styled(Link)`
  position: absolute;
  top: 2rem;
  left: 1rem;
`
