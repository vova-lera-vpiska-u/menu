import styled from 'styled-components'

import { COLORS } from '@shared/styles/colors'
import { TEXT_SIZE_4 } from '@shared/styles/fonts'

export const TextButton = ({ children }: { children: string }) => {
    return <Layout>{children}</Layout>
}

const Layout = styled.button`
    position: relative;
    display: block;
    padding: 0;
    margin: 0;
    max-width: max-content;

    background: transparent;
    color: ${COLORS.danger};
    ${TEXT_SIZE_4};
`
