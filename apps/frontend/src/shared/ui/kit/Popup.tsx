import { ReactNode } from 'react'

import styled, { css } from 'styled-components'

import { COLORS } from '@shared/styles/colors'
import { TEXT_SIZE_2 } from '@shared/styles/fonts'

export type PopupVariant = 'success' | 'danger'

type PopupProps = {
    variant?: PopupVariant
    title: ReactNode
    primaryLabel: string
    secondaryLabel: string
    onPrimary?: () => void
    onSecondary?: () => void
}

export const Popup = ({
    variant = 'success',
    title,
    primaryLabel,
    secondaryLabel,
    onPrimary,
    onSecondary,
}: PopupProps) => {
    return (
        <Card $variant={variant}>
            <Title>{title}</Title>
            <Actions>
                <SecondaryButton $variant={variant} type="button" onClick={onSecondary}>
                    {secondaryLabel}
                </SecondaryButton>
                <PrimaryButton $variant={variant} type="button" onClick={onPrimary}>
                    {primaryLabel}
                </PrimaryButton>
            </Actions>
        </Card>
    )
}

const accent: Record<PopupVariant, string> = {
    success: COLORS.oliveGreen,
    danger: COLORS.danger,
}

const surface: Record<PopupVariant, string> = {
    success: COLORS.successSurface,
    danger: COLORS.dangerSurface,
}

const Card = styled.div<{ $variant: PopupVariant }>`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 352px;
    max-width: 100%;
    padding: 16px 20px;
    box-sizing: border-box;
    border-radius: 12px;
    background-color: ${({ $variant }) => surface[$variant]};
`

const Title = styled.h2`
    margin: 0;
    color: ${COLORS.white};
    text-transform: uppercase;
    ${TEXT_SIZE_2};
`

const Actions = styled.div`
    display: flex;
    gap: 8px;
`

const buttonBase = css`
    flex: 1;
    padding: 8px 12px;
    box-sizing: border-box;
    border-radius: 4px;
    cursor: pointer;
    font-family: 'Alumni Sans';
    font-size: 20px;
    line-height: 1.2;
    transition:
        background-color 0.2s ease,
        border-color 0.2s ease,
        color 0.2s ease;
`

const SecondaryButton = styled.button<{ $variant: PopupVariant }>`
    ${buttonBase};
    background-color: transparent;
    border: 1px solid ${({ $variant }) => accent[$variant]};
    color: ${COLORS.white};

    &:hover {
        border-color: ${COLORS.white};
    }
`

const PrimaryButton = styled.button<{ $variant: PopupVariant }>`
    ${buttonBase};
    border: 1px solid transparent;
    color: ${COLORS.white};
    background-color: ${({ $variant }) => accent[$variant]};

    &:hover {
        background-color: ${({ $variant }) => ($variant === 'success' ? COLORS.oliveGreenHover : '#ef6a6a')};
    }
`
