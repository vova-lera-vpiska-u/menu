import styled from 'styled-components'
import { ToggleButton } from './shared/ToggleButton'
import { Category } from '../database/types'

export const Filters = ({
  filters,
  setFilters,
}: {
  filters: Category[]
  setFilters: (labels: Category[]) => void
}) => {
  return (
    <Layout>
      <ToggleButton<Category>
        label="pizza"
        labels={filters}
        setLabels={(labels) => {
          setFilters(labels)
        }}
      />
      <ToggleButton<Category>
        label="pasta"
        labels={filters}
        setLabels={(labels) => {
          setFilters(labels)
        }}
      />
      <ToggleButton<Category>
        label="eggs"
        labels={filters}
        setLabels={(labels) => {
          setFilters(labels)
        }}
      />
      <ToggleButton<Category>
        label="asia"
        labels={filters}
        setLabels={(labels) => {
          setFilters(labels)
        }}
      />
      <ToggleButton<Category>
        label="fastfood"
        labels={filters}
        setLabels={(labels) => {
          setFilters(labels)
        }}
      />
      <ToggleButton<Category>
        label="cocktails"
        labels={filters}
        setLabels={(labels) => {
          setFilters(labels)
        }}
      />
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
