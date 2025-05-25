import { useNavigate } from 'react-router-dom'

import styled from 'styled-components'

import { GoBack } from '@shared/icons/GoBack'
import { HOMEPAGE_PATH } from '@shared/routes/shared-paths'

import { IconButton } from './Buttons/IconButton'

export const GoBackButton = ({ fallback }: { fallback?: string }) => {
    const navigate = useNavigate()

    return (
        <Layout
            onClick={() => {
                if (window.history.length > 1) {
                    navigate(-1) // go back
                } else {
                    navigate(fallback || HOMEPAGE_PATH) // fallback route
                }
            }}
        >
            <GoBack />
        </Layout>
    )
}

const Layout = styled(IconButton)`
    position: absolute;
    height: 1.625rem;
    left: 0;
`
