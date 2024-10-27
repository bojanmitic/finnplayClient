import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import './App.css';
import { Suspense } from 'react';
import Loader from '../components/Common/Loader/Loader';

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;
    if (!user) {
      navigate('/login');
    }
    if (location.pathname === '/') {
      navigate('/login');
    }
  });
  return (
    <main>
      <ErrorBoundary>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}

export default App;
