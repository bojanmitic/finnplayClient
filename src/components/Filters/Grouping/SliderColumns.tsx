import * as React from 'react';
import './SliderColumns.css';

interface ISliderColumnsProps {
  setNumberOfCol: React.Dispatch<React.SetStateAction<string>>;
  numberOfCol: string;
}

const SliderColumns: React.FunctionComponent<ISliderColumnsProps> = ({ setNumberOfCol, numberOfCol }) => {
  return (
    <div className="group-items">
      <input
        onChange={(e) => {
          setNumberOfCol(e.target.value);
        }}
        type="range"
        min={2}
        max={4}
        step={1}
        list="tick-list"
        className="slider"
        value={numberOfCol}
      />
      <datalist id="tick-list">
        <option onClick={() => setNumberOfCol('2')} value="2" className="slider-tick">
          2
        </option>
        <option onClick={() => setNumberOfCol('3')} value="3" className="slider-tick">
          3
        </option>
        <option onClick={() => setNumberOfCol('4')} value="4" className="slider-tick">
          4
        </option>
      </datalist>
    </div>
  );
};

export default SliderColumns;
