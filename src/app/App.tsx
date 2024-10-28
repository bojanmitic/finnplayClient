import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import './App.css';
import { Suspense } from 'react';
import Loader from '../components/Common/Loader/Loader';
import AppBar from '../components/AppBar/AppBar';
import { useAppDispatch, useTypedSelector } from './store';
import { setUser, userSelect } from '../slices/authSlice';

function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentUser = useTypedSelector(userSelect);

  useEffect(() => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;
    if (!user) {
      navigate('/login');
    }
    if (location.pathname === '/') {
      navigate('/login');
    }
    if (user && location.pathname !== '/login') {
      currentUser === null && dispatch(setUser(user));
      navigate('games');
    } else if (user && location.pathname === '/login') {
      dispatch(setUser(user));
      navigate('/games');
    }
  }, [currentUser]);

  return (
    <main>
      <ErrorBoundary>
        <Suspense fallback={<Loader />}>
          <AppBar />
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}

export default App;
