import styled from 'styled-components'

import { COLORS } from '@shared/styles/colors'
import { TEXT_SIZE_5 } from '@shared/styles/fonts'
import { FieldSmall } from '@shared/ui/FieldSmall'

import { Nutrition } from './model'

type NutritionFactsTableProps = {
    value: Nutrition
    onChange: (nutrition: Nutrition) => void
}

export const NutritionFactsTable = ({ value, onChange }: NutritionFactsTableProps) => {
    return (
        <Layout>
            <ColumnWrapper>
                <div>Calories</div>
                <FieldSmall
                    iconVisible={false}
                    name=""
                    type="text"
                    value={value.calories}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        onChange({ ...value, calories: event.target.value })
                    }
                />
            </ColumnWrapper>
            <ColumnWrapper>
                <div>Proteins</div>
                <FieldSmall
                    iconVisible={false}
                    name=""
                    type="text"
                    value={value.protein}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        onChange({ ...value, protein: event.target.value })
                    }
                />
            </ColumnWrapper>
            <ColumnWrapper>
                <div>Fats</div>
                <FieldSmall
                    iconVisible={false}
                    name=""
                    type="text"
                    value={value.fat}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        onChange({ ...value, fat: event.target.value })
                    }
                />
            </ColumnWrapper>
            <ColumnWrapper>
                <div>Carbs</div>
                <FieldSmall
                    iconVisible={false}
                    name=""
                    type="text"
                    value={value.carbs}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        onChange({ ...value, carbs: event.target.value })
                    }
                />
            </ColumnWrapper>
        </Layout>
    )
}

const Layout = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 8px;

    min-height: 0;
    min-width: 0;
`

const ColumnWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: start;
    color: ${COLORS.white} ${TEXT_SIZE_5};
`
