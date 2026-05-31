import { ReactNode } from 'react'

import styled from 'styled-components'

import { COLORS } from '@shared/styles/colors'
import { TEXT_SIZE_1 } from '@shared/styles/fonts'

type SectionProps = {
    title: string
    children: ReactNode
}

export const Section = ({ title, children }: SectionProps) => {
    return (
        <Layout>
            <Title>{title}</Title>
            {children}
        </Layout>
    )
}

const Layout = styled.section`
    display: flex;
    flex-direction: column;
    gap: 12px;
`

const Title = styled.h2`
    margin: 0 0 12px;
    text-transform: uppercase;
    color: ${COLORS.white};
    ${TEXT_SIZE_1};
`
