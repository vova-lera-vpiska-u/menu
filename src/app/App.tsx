import { RouterProvider } from 'react-router-dom'

import styled from 'styled-components'

import './app.css'
import { FontStyles } from './fonts'
import { router } from './router'

export function App() {
    return (
        <>
            <FontStyles />
            <RouterProvider router={router} />
            <Version>v{import.meta.env.VITE_APP_VERSION}</Version>
        </>
    )
}

const Version = styled.div`
    position: absolute;
    bottom: 0%;
    right: 0%;
    padding: 10px;
`
