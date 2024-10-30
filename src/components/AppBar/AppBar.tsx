import { useCallback } from 'react';
import './AppBar.css';
import { useAppDispatch } from '../../app/store';
import { logoutAction } from '../../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import snackBar from '../../utils/snackBar';

const AppBar: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutUser = useCallback(async () => {
    try {
      localStorage.removeItem('user');
      await dispatch(logoutAction());
      navigate('/login');
      snackBar.success('Logout successful');
    } catch (error) {
      snackBar.error((error as Error).message || 'Something went wrong');
    }
  }, [dispatch, navigate]);
  return (
    <div className="app-bar">
      <button onClick={logoutUser} className="app-bar-button">
        Logout
      </button>
    </div>
  );
};

export default AppBar;
