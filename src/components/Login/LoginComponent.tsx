import { FunctionComponent, useState } from 'react';
import './LoginComponent.css';
import { EyeOpenIcon, EyeClosedIcon } from './EyeIcon';

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
    <form>
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
      </div>
    </form>
  );
};

export default LoginComponent;
