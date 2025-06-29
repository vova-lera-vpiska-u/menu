import { HTMLProps } from 'react'

import styled from 'styled-components'

import { COLORS } from '@shared/styles/colors'

export const FilesInput = (props: HTMLProps<HTMLInputElement>) => {
    return (
        <Layout>
            <input type="file" name="dishImage" accept="image/*" {...props}></input>
        </Layout>
    )
}

const Layout = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100px;
    border: 1px solid ${COLORS.lightGray};
`
