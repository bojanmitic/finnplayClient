import './Grouping.css';
import SliderColumns from './SliderColumns';

interface IGroupingProps {
  title: string;
  items: {
    id: string;
    name: string;
  }[];
  isWithSlider?: boolean;
  setNumberOfCol: React.Dispatch<React.SetStateAction<string>>;
  numberOfCol: string;
}

const Grouping: React.FunctionComponent<IGroupingProps> = ({
  title,
  items,
  isWithSlider,
  numberOfCol,
  setNumberOfCol
}) => {
  return (
    <div className="group">
      <div className="group-title">{title}</div>
      <div className="group-items">
        {items.map((item) => (
          <button className="group-items-item" key={item.id}>
            {item.name}
          </button>
        ))}
      </div>
      {isWithSlider && <SliderColumns numberOfCol={numberOfCol} setNumberOfCol={setNumberOfCol} />}
    </div>
  );
};

export default Grouping;
