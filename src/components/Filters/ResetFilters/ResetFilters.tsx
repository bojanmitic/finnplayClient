import * as React from 'react';
import './ResetFilters.css';

interface IResetFiltersProps {
  gamesAmount: number;
  setResetFilters: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResetFilters: React.FunctionComponent<IResetFiltersProps> = ({ gamesAmount, setResetFilters }) => {
  return (
    <div className="reset-filters">
      <span className="reset-filters-amount">Games amount: {gamesAmount}</span>
      <button className="reset-filters-button" onClick={() => setResetFilters((prev) => !prev)}>
        Reset
      </button>
    </div>
  );
};

export default ResetFilters;
