import styled from 'styled-components'

export const Filters = () => {
  return (
    <Layout>
      <Chip>pizza</Chip>
      <Chip>pasta</Chip>
      <Chip>eggs</Chip>
      <Chip>asia</Chip>
      <Chip>fastfood</Chip>
      <Chip>cocktails</Chip>
    </Layout>
  )
}

const Layout = styled.div`
  flex-wrap: wrap;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 52px;
  align-items: center;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #1b1818;
    border-radius: 18px;
  }

  &::-webkit-scrollbar-thumb {
    background: #8fa847;
    border-radius: 9px;
  }
`

const Chip = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  cursor: pointer;
  padding: 6px 20px 5px 20px;
  box-sizing: border-box;
  border: 1px solid #ffffff;
  border-radius: 3px;
  font-family: 'Alumni Sans';
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 29px;
  color: #ffffff;
`
