import { HTMLProps } from 'react'

import styled from 'styled-components'

export const Image = (props: HTMLProps<HTMLImageElement>) => {
    return <Img {...props} />
}

const Img = styled.img`
    max-width: 100%;
`
