import { Heart } from 'feather-icons-react'
import styled from 'styled-components'

import { COLORS } from '@shared/styles/colors'

type BrandLogoProps = {
    admin?: boolean
}

export const BrandLogo = ({ admin = false }: BrandLogoProps) => {
    return (
        <Layout>
            <HeartWrap>
                <Heart size={14} color={COLORS.danger} fill={COLORS.danger} />
            </HeartWrap>
            <Name>Menu</Name>
            {admin && <AdminMark>admin</AdminMark>}
        </Layout>
    )
}

const Layout = styled.div`
    position: relative;
    display: inline-flex;
    align-items: center;
    height: 47px;
    user-select: none;
`

const HeartWrap = styled.span`
    display: inline-flex;
    transform: rotate(-25deg) translateY(2px);
`

const Name = styled.span`
    font-family: 'Rozovii Chulok', sans-serif;
    font-size: 32px;
    line-height: 47px;
    color: ${COLORS.white};
    transform: translateX(-3px);
`

const AdminMark = styled.span`
    align-self: flex-end;
    margin-left: 2px;
    margin-bottom: 8px;
    font-family: 'Rozovii Chulok', sans-serif;
    font-size: 16px;
    line-height: 1;
    text-transform: uppercase;
    color: ${COLORS.danger};
`
