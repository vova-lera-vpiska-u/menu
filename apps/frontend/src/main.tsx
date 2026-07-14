import React from 'react'
import ReactDOM from 'react-dom/client'

import { App } from '@app/app'

import { appStarted } from '@shared/model'

import './index.css'

appStarted()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
