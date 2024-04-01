import styled from 'styled-components'
import { ToggleButton } from './shared/ToggleButton'
import { Category } from '../database/types'

export const Filters = ({
  filters,
  setFilters,
  filterList,
}: {
  filters: Category[]
  setFilters: (labels: Category[]) => void
  filterList: Category[]
}) => {
  return (
    <Layout>
      {filterList.map((filter) => {
        return (
          <ToggleButton<Category>
            key={filter}
            label={filter}
            labels={filters}
            setLabels={(labels) => {
              setFilters(labels)
            }}
          />
        )
      })}
    </Layout>
  )
}

const Layout = styled.div`
  flex-wrap: wrap;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 52px;
  align-content: flex-start;
  justify-content: flex-start;
  overflow-x: auto;

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
