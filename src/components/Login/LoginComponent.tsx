import { FunctionComponent, useState } from 'react';
import { EyeOpenIcon, EyeClosedIcon } from './EyeIcon';
import Button from '../Button/Button';
import { useAppDispatch } from '../../app/store';
import { loginAction } from '../../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import snackBar from '../../utils/snackBar';
import './LoginComponent.css';

const LoginComponent: FunctionComponent = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('password');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleToggle = () => {
    if (type === 'password') {
      setType('text');
    } else {
      setType('password');
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await dispatch(loginAction({ userName, password })).unwrap();
      localStorage.setItem('user', JSON.stringify(res));
      navigate('/games');
    } catch (error) {
      snackBar.error((error as string) || 'Something went wrong with login');
    }
  };

  return (
    <div className="login-form-container">
      <div className="user-input-wrp">
        <br />
        <input
          type="text"
          value={userName}
          onChange={(ev) => setUserName(ev.target.value)}
          className="input-field"
          required
        />
        <span className="floating-label">User name</span>
      </div>
      <br />
      <div className="user-input-wrp">
        <br />
        <input
          type={type}
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          className="input-field password-field"
          required
        />
        <span className="floating-label">Password</span>
        <span className="password-icon" onClick={handleToggle}>
          {type === 'password' ? <EyeClosedIcon /> : <EyeOpenIcon />}
        </span>
      </div>
      <br />
      <Button
        onClick={handleSubmit}
        loading={false}
        text="Login"
        moreStyles={{ background: '#FDBC11', height: '50px', color: 'black', fontWeight: '500' }}
        disabled={!userName || !password}
      />
    </div>
  );
};

export default LoginComponent;
