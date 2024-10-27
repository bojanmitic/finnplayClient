/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';

const LoginContainer = lazy(() => import('../containers/Login/LoginContainer'));
const GamesContainer = lazy(() => import('../containers/GamesContainer/GamesContainer'));

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginContainer />
  },
  {
    element: <App />,
    children: [
      {
        path: 'games',
        element: <GamesContainer />
      }
    ]
  }
]);

export default router;
