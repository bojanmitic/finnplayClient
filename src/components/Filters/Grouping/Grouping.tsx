import * as React from 'react';
import './Grouping.css';

interface IGroupingProps {
  title: string;
  items: string[];
}

const Grouping: React.FunctionComponent<IGroupingProps> = ({ title, items }) => {
  return (
    <div className="group">
      <div className="group-title">{title}</div>
      <div className="group-items">
        {items.map((item) => (
          <button key={item}>{item}</button>
        ))}
      </div>
    </div>
  );
};

export default Grouping;
