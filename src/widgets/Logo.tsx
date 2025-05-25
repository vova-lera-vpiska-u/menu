import { useRef, useState } from 'react'

import { useUnit } from 'effector-react'
import { Search } from 'feather-icons-react'
import styled from 'styled-components'

import { searchModel } from '@features/search'

import { userModel } from '@entities/user/model'

import { COLORS } from '@shared/styles/colors'
import { TEXT_SIZE_5 } from '@shared/styles/fonts'

import { IconButton } from './Buttons/IconButton'

export const Logo = () => {
    const searchBarRef = useRef<HTMLInputElement>(null)

    const [user] = useUnit([userModel.stores.user])
    const [searchQuery, searchQueryChanged] = useUnit([searchModel.$searchQuery, searchModel.searchQueryChanged])
    const [isSearchOpen, setIsSearchOpen] = useState(!!searchQuery)

    return (
        <Flex>
            <Layout isAdmin={!!user}>
                <Heart>❤️</Heart>
                <Name>Menu</Name>
                {user && (
                    <AdminIconStyled>
                        <AdminIcon />
                    </AdminIconStyled>
                )}
            </Layout>

            <SearchWrapper isOpen={isSearchOpen}>
                <SearchField
                    ref={searchBarRef}
                    isOpen={isSearchOpen}
                    value={searchQuery}
                    autoFocus
                    onChange={(e) => searchQueryChanged(e.target.value)}
                    onBlur={() => {
                        if (!searchQuery) setIsSearchOpen(false)
                    }}
                />
            </SearchWrapper>
            <SearchButton
                onClick={() => {
                    setIsSearchOpen(true)
                    searchBarRef.current?.focus()
                }}
            >
                <Search size={26} />
            </SearchButton>
        </Flex>
    )
}

const AdminIcon = () => {
    return <AdminLogo>ADMIN</AdminLogo>
}

const SearchWrapper = styled.div<{ isOpen: boolean }>`
    display: flex;
    padding: 0px 0px 0px 4px;
    height: 26px;
    border: 1px solid;
    border-color: ${({ isOpen }) => (isOpen ? COLORS.oliveGreen : 'transparent')};
    border-radius: 3px;
    color: ${COLORS.lightGray};
    width: 100%;
    max-width: ${({ isOpen }) => (isOpen ? '500px' : '0')};

    transition:
        max-width 0.3s ease-in-out,
        border-color 0.3s ease-in-out;
`

const SearchButton = styled(IconButton)`
    position: absolute;
    right: 1rem;
`

const SearchField = styled.input<{ isOpen: boolean }>`
    outline: none;
    border: none;
    max-width: ${({ isOpen }) => (isOpen ? '500px' : '0px')};
    transition: max-width 0.3s ease-in-out;
    width: 100%;
    background-color: transparent;
    ${TEXT_SIZE_5}
    color: ${COLORS.lightGray};
`

const Flex = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    gap: 16px;
`

const AdminLogo = styled.div`
    font-family: 'Rozovii Chulok', sans-serif;
    font-style: normal;
    font-size: 20px;
    line-height: 29px;
    color: #ffffff;
    text-transform: uppercase;
    color: ${COLORS.danger};
`

const Name = styled.h1`
    width: 60px;
    height: 47px;
    margin: 0;

    font-family: 'Rozovii Chulok', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 47px;
    color: #ffffff;

    transform: translateX(-5px);
`

const Heart = styled.div<{ isAdmin?: boolean }>`
    scale: 0.7;
    transform: translateY(50%) rotate(-25deg);
`

const Layout = styled.div<{ isAdmin: boolean }>`
    user-select: none;
    position: relative;
    height: 47px;
    width: ${({ isAdmin }) => (isAdmin ? '118px' : '74px')};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-inline: auto;
`

const AdminIconStyled = styled.div`
    position: relative;
    top: 0;
    right: 5px;
    display: flex;
    padding-top: 13px;
`
