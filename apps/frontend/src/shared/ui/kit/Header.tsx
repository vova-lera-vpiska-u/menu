import { LogOut, Search } from 'feather-icons-react'
import styled from 'styled-components'

import { COLORS } from '@shared/styles/colors'

import { BrandLogo } from './BrandLogo'
import { SearchField } from './SearchField'

export type HeaderVariant = 'wide' | 'slim'

type HeaderProps = {
    variant?: HeaderVariant
    onSearch?: () => void
    onLogout?: () => void
}

export const Header = ({ variant = 'wide', onSearch, onLogout }: HeaderProps) => {
    if (variant === 'slim') {
        return (
            <Layout>
                <BrandLogo />
                <SlimSearch>
                    <SearchField open />
                </SlimSearch>
            </Layout>
        )
    }

    return (
        <Layout>
            <Spacer />
            <BrandLogo />
            <Actions>
                <IconButton type="button" onClick={onSearch}>
                    <Search size={22} />
                </IconButton>
                <IconButton type="button" onClick={onLogout}>
                    <LogOut size={22} />
                </IconButton>
            </Actions>
        </Layout>
    )
}

const Layout = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    width: 368px;
    max-width: 100%;
    height: 47px;
    box-sizing: border-box;
`

const Spacer = styled.div`
    width: 50px;
    flex-shrink: 0;
`

const Actions = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`

const SlimSearch = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
`

const IconButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: ${COLORS.lightGray};
    transition: color 0.2s ease;

    &:hover {
        color: ${COLORS.white};
    }
`
