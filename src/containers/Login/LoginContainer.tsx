import { FunctionComponent, useEffect } from 'react';
import LoginComponent from '../../components/Login/LoginComponent';
import './LoginContianer.css';
import { useNavigate } from 'react-router-dom';

const LoginContainer: FunctionComponent = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');

  useEffect(() => {
    if (user) navigate('/games');
  }, [navigate, user]);

  return (
    <div className="container">
      <LoginComponent />
    </div>
  );
};

export default LoginContainer;
