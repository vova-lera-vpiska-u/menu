import { Edit2 } from 'feather-icons-react'
import styled, { css } from 'styled-components'

import { COLORS } from '@shared/styles/colors'
import { TEXT_SIZE_2 } from '@shared/styles/fonts'

export type CategoryCardVariant = 'wide' | 'small'

type CategoryCardProps = {
    title: string
    image?: string
    variant?: CategoryCardVariant
    editable?: boolean
    onEdit?: () => void
    onClick?: () => void
}

export const CategoryCard = ({
    title,
    image,
    variant = 'wide',
    editable = true,
    onEdit,
    onClick,
}: CategoryCardProps) => {
    return (
        <Layout $variant={variant} $image={image} onClick={onClick}>
            {editable && (
                <EditButton
                    type="button"
                    onClick={(event) => {
                        event.stopPropagation()
                        onEdit?.()
                    }}
                >
                    <Edit2 size={16} />
                </EditButton>
            )}
            <Title>{title}</Title>
        </Layout>
    )
}

const wide = css`
    width: 368px;
    height: 80px;
    align-items: center;
`

const small = css`
    width: 179px;
    height: 179px;
    align-items: flex-end;
`

const Layout = styled.div<{ $variant: CategoryCardVariant; $image?: string }>`
    position: relative;
    display: flex;
    max-width: 100%;
    padding: 16px 20px;
    box-sizing: border-box;
    border-radius: 7px;
    cursor: pointer;
    background:
        linear-gradient(90deg, rgba(0, 0, 0, 0.85) 0%, rgba(19, 13, 13, 0.4) 100%),
        ${({ $image }) => ($image ? `url(${$image}) center / cover no-repeat` : COLORS.darkGray)};

    ${({ $variant }) => ($variant === 'wide' ? wide : small)};
`

const Title = styled.h3`
    margin: 0;
    color: ${COLORS.white};
    text-transform: uppercase;
    ${TEXT_SIZE_2};
`

const EditButton = styled.button`
    position: absolute;
    top: 12px;
    right: 12px;
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
