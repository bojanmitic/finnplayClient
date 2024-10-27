import * as React from 'react';
import LoaderIcon from './LoaderIcon';
import './Loader.css';

const Loader: React.FunctionComponent = () => {
  return (
    <div className="spinner">
      <LoaderIcon />
    </div>
  );
};

export default Loader;
