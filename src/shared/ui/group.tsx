import { HTMLProps } from 'react'

import styled from 'styled-components'

type GroupProps = {
    gap?: number
    mt?: number
}

export const Group = (props: HTMLProps<HTMLDivElement> & GroupProps) => {
    return <Layout {...props} />
}

const Layout = styled.div<GroupProps>`
    display: flex;
    gap: ${(props) => (props.gap ?? 0) / 16}rem;
    margin-top: ${(props) => (props.mt ?? 0) / 16}rem;
`
