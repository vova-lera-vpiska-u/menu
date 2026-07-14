import styled from 'styled-components'

import { Star } from '@shared/icons/Star'

export const Rating = ({ rating }: { rating: number }) => {
    return (
        <Layout>
            <Star height="14" width="14" />
            {rating}
        </Layout>
    )
}
const Layout = styled.div`
    position: absolute;
    top: 15px;
    right: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Alumni Sans', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #d8d8d8;
`
