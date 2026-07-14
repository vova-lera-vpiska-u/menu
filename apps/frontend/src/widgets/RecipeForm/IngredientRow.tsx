import styled from 'styled-components'

import { COLORS } from '@shared/styles/colors'
import { TEXT_SIZE_5 } from '@shared/styles/fonts'
import { DropdownMenu } from '@shared/ui/DropdownMenu'
import { FieldSmall } from '@shared/ui/FieldSmall'

import { IngredientFormRow, UNIT_OPTIONS } from './model'

type IngredientRowProps = {
    value: IngredientFormRow
    onChange: (value: IngredientFormRow) => void
    onRemove: () => void
}

export const IngredientRow = ({ value, onChange, onRemove }: IngredientRowProps) => {
    return (
        <Layout>
            <FieldSmall
                iconVisible={false}
                name=""
                type="text"
                placeholder="Ingredient"
                value={value.name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange({ ...value, name: event.target.value })}
            />
            <FieldSmall
                iconVisible={false}
                name=""
                type="text"
                placeholder="Count"
                value={value.amount}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    onChange({ ...value, amount: event.target.value })
                }
            />
            <DropdownMenu
                optionsArray={UNIT_OPTIONS}
                placeholder="Unit"
                value={value.unit}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => onChange({ ...value, unit: event.target.value })}
            />
            <OptionalLabel>
                <input
                    type="checkbox"
                    checked={value.optional}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        onChange({ ...value, optional: event.target.checked })
                    }
                />
                optional
            </OptionalLabel>
            <RemoveButton type="button" onClick={onRemove} aria-label="Remove ingredient">
                ×
            </RemoveButton>
        </Layout>
    )
}

const Layout = styled.div`
    position: relative;
    display: grid;
    align-items: center;
    grid-template-columns: minmax(0, 1fr) 64px 72px auto auto;
    column-gap: 4px;

    min-width: 0;
`

const OptionalLabel = styled.label`
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    white-space: nowrap;

    ${TEXT_SIZE_5}
    color: ${COLORS.oliveGreen};
`

const RemoveButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    padding: 0;

    background-color: transparent;
    border: none;
    ${TEXT_SIZE_5}
    font-size: 20px;
    line-height: 1;
    color: ${COLORS.danger};

    transition: opacity 0.2s ease;

    &:hover {
        opacity: 0.7;
    }
`
