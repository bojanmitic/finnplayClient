import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.tsx'
import { RouterProvider } from 'react-router-dom'
import router from './app/Router.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
		<RouterProvider router={router} />
    <App />
  </StrictMode>,
)
