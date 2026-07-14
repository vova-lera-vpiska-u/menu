import { InputHTMLAttributes } from 'react'

import { Search } from 'feather-icons-react'
import styled from 'styled-components'

import { COLORS } from '@shared/styles/colors'
import { TEXT_SIZE_5 } from '@shared/styles/fonts'

type SearchFieldProps = {
    open?: boolean
    onIconClick?: () => void
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>

export const SearchField = ({ open = true, onIconClick, ...props }: SearchFieldProps) => {
    return (
        <Layout $open={open}>
            <Input $open={open} placeholder="borscht" {...props} />
            <IconButton type="button" onClick={onIconClick}>
                <Search size={20} />
            </IconButton>
        </Layout>
    )
}

const Layout = styled.div<{ $open: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    height: 26px;
    padding: ${({ $open }) => ($open ? '0 4px 0 8px' : '0')};
    box-sizing: border-box;
    border: 1px solid ${({ $open }) => ($open ? COLORS.oliveGreen : 'transparent')};
    border-radius: 3px;
    transition:
        border-color 0.3s ease-in-out,
        max-width 0.3s ease-in-out;
    max-width: ${({ $open }) => ($open ? '278px' : '26px')};
`

const Input = styled.input<{ $open: boolean }>`
    width: 100%;
    border: none;
    background-color: transparent;
    outline: none;
    color: ${COLORS.oliveGreen};
    ${TEXT_SIZE_5};
    max-width: ${({ $open }) => ($open ? '500px' : '0')};
    padding: ${({ $open }) => ($open ? '0' : '0')};
    transition: max-width 0.3s ease-in-out;

    &::placeholder {
        color: ${COLORS.oliveGreenDisable};
    }
`

const IconButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    padding: 0;
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: ${COLORS.lightGray};
`
