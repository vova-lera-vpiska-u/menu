import styled from 'styled-components'
import { COLORS } from '../styles/colors'
import { TEXT_SIZE_5 } from '../styles/fonts'
import { FieldSmall } from './FieldSmall'

export const NutritionFactsTable = () => {
  return (
    <Layout>
      <ColumnWrapper>
        <div>Calories</div>
        <FieldSmall iconVisible={false} name="" type="text" />
      </ColumnWrapper>
      <ColumnWrapper>
        <div>Proteins</div>
        <FieldSmall iconVisible={false} name="" type="text" />
      </ColumnWrapper>
      <ColumnWrapper>
        <div>Fats</div>
        <FieldSmall iconVisible={false} name="" type="text" />
      </ColumnWrapper>
      <ColumnWrapper>
        <div>Carbs</div>
        <FieldSmall iconVisible={false} name="" type="text" />
      </ColumnWrapper>
    </Layout>
  )
}

const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 8px;

  min-height: 0; /* NEW */
  min-width: 0;
`

const ColumnWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: start;
  color: ${COLORS.white} ${TEXT_SIZE_5};
`
