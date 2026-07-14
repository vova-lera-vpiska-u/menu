import { ReactNode } from 'react'

import { AlertTriangle, CornerDownLeft } from 'feather-icons-react'
import styled from 'styled-components'

import { COLORS } from '@shared/styles/colors'
import { TEXT_SIZE_4, TEXT_SIZE_5 } from '@shared/styles/fonts'

type AlertProps = {
    message: ReactNode
    actionLabel?: string
    onAction?: () => void
}

export const Alert = ({ message, actionLabel = 'Return', onAction }: AlertProps) => {
    return (
        <Layout>
            <Row>
                <AlertTriangle size={18} color={COLORS.lightGray} />
                <Message>{message}</Message>
            </Row>
            {actionLabel && (
                <Action type="button" onClick={onAction}>
                    {actionLabel}
                    <CornerDownLeft size={16} />
                </Action>
            )}
        </Layout>
    )
}

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 352px;
    max-width: 100%;
    padding: 14px 20px;
    box-sizing: border-box;
    background-color: ${COLORS.alertSurface};
    border-radius: 12px;
`

const Row = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${COLORS.lightGray};
    ${TEXT_SIZE_5};
`

const Message = styled.span`
    color: ${COLORS.lightGray};
    ${TEXT_SIZE_5};
`

const Action = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    align-self: flex-start;
    padding: 0;
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: ${COLORS.oliveGreen};
    ${TEXT_SIZE_4};
    transition: color 0.2s ease;

    &:hover {
        color: ${COLORS.oliveGreenHover};
    }
`
