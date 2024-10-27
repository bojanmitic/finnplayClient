import { FunctionComponent, useState } from 'react';
import './LoginComponent.css';
import { EyeOpenIcon, EyeClosedIcon } from './EyeIcon';
import Button from '../Button/Button';

const LoginComponent: FunctionComponent = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('password');

  const handleToggle = () => {
    if (type === 'password') {
      setType('text');
    } else {
      setType('password');
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
        onClick={() => {}}
        loading={false}
        text="Login"
        moreStyles={{ background: '#FDBC11', height: '50px', color: 'black', 'font-weight': '500' }}
      />
    </div>
  );
};

export default LoginComponent;
