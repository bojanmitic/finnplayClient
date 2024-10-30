import * as React from 'react';
import { ISortingObj } from '../../../containers/FiltersContainer/FiltersContaier';

interface ISortingProps {
  title: string;
  items: ISortingObj[];
  sortValueObj: ISortingObj | null;
  setSortValueObj: React.Dispatch<React.SetStateAction<ISortingObj | null>>;
}

const SortingToggle: React.FunctionComponent<ISortingProps> = ({ title, items, sortValueObj, setSortValueObj }) => {
  const handleToggle = (sortingItem: ISortingObj, id: string) => {
    const sortItemOrNull = sortValueObj?.id === id ? null : sortingItem;
    setSortValueObj(sortItemOrNull);
  };

  return (
    <div className="group">
      <div className="group-title">{title}</div>
      <div className="group-items">
        {items.map((item) => {
          const isToggled = sortValueObj?.id === item.id;
          return (
            <button
              onClick={() => handleToggle(item, item.id)}
              className={`group-items-item ${isToggled ? 'toggled' : ''}`}
              key={item.id}
            >
              {item.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SortingToggle;
