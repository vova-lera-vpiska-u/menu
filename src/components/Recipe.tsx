import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { GoBackButton } from './GoBackButton'
import { useEffect } from 'react'

export const Recipe = ({ title }: { title: string }) => {
  const { id } = useParams<{ id: string }>()

  useEffect(() => {}, [])
  return (
    <div>
      <Nav>
        <GoBackButton to={'/'} />
        <Title>{title}</Title>
      </Nav>
      <div>
        <img src="/recipe.png" />
        <div>info about {id}</div>
      </div>
    </div>
  )
}

const Nav = styled.div`
  height: calc(26px + 4rem);
  display: flex;
  align-items: center;
  justify-content: center;
`

const Title = styled.h2`
  font-family: 'Enthalpy 298';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 20px;
  color: #ffffff;
`
