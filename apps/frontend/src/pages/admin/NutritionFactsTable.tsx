import { useUnit } from 'effector-react'
import styled from 'styled-components'

import { COLORS } from '@shared/styles/colors'
import { TEXT_SIZE_5 } from '@shared/styles/fonts'

import * as model from './model'
import { FieldSmall } from '../../shared/ui/FieldSmall'

export const NutritionFactsTable = () => {
    const [nutrition, setNutrition] = useUnit([model.$nutrition, model.setNutrition])
    return (
        <Layout>
            <ColumnWrapper>
                <div>Calories</div>
                <FieldSmall
                    iconVisible={false}
                    name=""
                    type="text"
                    value={nutrition.calories}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setNutrition({ ...nutrition, calories: e.target.value })
                    }
                />
            </ColumnWrapper>
            <ColumnWrapper>
                <div>Proteins</div>
                <FieldSmall
                    iconVisible={false}
                    name=""
                    type="text"
                    value={nutrition.protein}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setNutrition({ ...nutrition, protein: e.target.value })
                    }
                />
            </ColumnWrapper>
            <ColumnWrapper>
                <div>Fats</div>
                <FieldSmall
                    iconVisible={false}
                    name=""
                    type="text"
                    value={nutrition.fat}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setNutrition({ ...nutrition, fat: e.target.value })
                    }
                />
            </ColumnWrapper>
            <ColumnWrapper>
                <div>Carbs</div>
                <FieldSmall
                    iconVisible={false}
                    name=""
                    type="text"
                    value={nutrition.carbs}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setNutrition({ ...nutrition, carbs: e.target.value })
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
