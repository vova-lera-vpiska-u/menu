import styled from 'styled-components'

import { DropdownMenu } from '../shared/ui/DropdownMenu'
import { FieldSmall } from '../shared/ui/FieldSmall'
import { Checkbox } from './Buttons/Ckeckbox'

export const IngredientAddingRow = ({ labelColor }: { labelColor: string }) => {
    const measuresUnits = ['g', 'kg', 'in', 'tsp.', 'tbs.', 'gl.']

    return (
        <Layout>
            <div style={{ gridColumn: '1/2' }}>
                <FieldSmall iconVisible={false} name="ingredientName" type="text" placeholder="Ingredient" />
            </div>
            <div style={{ gridColumn: '2/3' }}>
                <FieldSmall iconVisible={false} name="ingredientCount" type="text" placeholder="Count" />
            </div>
            <div style={{ gridColumn: '3/4' }}>
                <DropdownMenu optionsArray={measuresUnits} placeholder="Unit" />
            </div>
            <div style={{ gridColumn: '4/5' }}>
                <Checkbox gap="4px" labelColor={labelColor}>
                    optional
                </Checkbox>
            </div>
        </Layout>
    )
}

const Layout = styled.div`
    position: relative;
    display: grid;
    align-items: center;
    grid-template-columns: 46% 15% 17% 16%;
    column-gap: 4px;

    overflow: hidden; /* NEW */
    min-width: 0;
`
