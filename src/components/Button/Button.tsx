import * as React from 'react';
import Loader from '../Common/Loader/Loader';
import './Button.css';

interface IButtonProps {
  onClick: () => void;
  loading: boolean;
  text: string;
  moreStyles?: Record<string, unknown>;
}

const Button: React.FunctionComponent<IButtonProps> = ({ onClick, loading, text, moreStyles }) => {
  return (
    <button className="btn" style={{ ...moreStyles }} onClick={onClick}>
      {!loading ? text : <Loader />}
    </button>
  );
};

export default Button;
