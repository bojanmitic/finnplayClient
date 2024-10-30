import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './app/Router.tsx';
import { Provider } from 'react-redux';
import store from './app/store.ts';
import { SnackbarProvider } from 'notistack';
import { SnackbarUtilsConfigurator } from './utils/snackBar.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
        <SnackbarUtilsConfigurator />
      </SnackbarProvider>
    </Provider>
  </StrictMode>
);
