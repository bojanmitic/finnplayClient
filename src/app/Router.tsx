/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

const LoginContainer = lazy(() => import('../containers/Login/LoginContainer'));

const router = createBrowserRouter([
  {
    path: '/login',
		element: <LoginContainer />
  }
])

export default router
