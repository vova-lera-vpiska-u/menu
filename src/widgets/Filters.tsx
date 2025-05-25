import styled from 'styled-components'

import { ToggleButton } from '@shared/ui/ToggleButton'

export const Filters = ({
    selected,
    setSelected,
    filterList,
}: {
    selected: string | null
    setSelected: (label: string | null) => void
    filterList: string[]
}) => {
    return (
        <Layout>
            {filterList.map((filter) => {
                return <ToggleButton key={filter} label={filter} checked={selected === filter} setLabel={setSelected} />
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
