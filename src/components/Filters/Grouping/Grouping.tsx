import SliderColumns from './SliderColumns';
import './Grouping.css';

interface IGroupingProps {
  title: string;
  items: {
    id: string;
    name: string;
  }[];
  isWithSlider?: boolean;
  setNumberOfCol: React.Dispatch<React.SetStateAction<string>>;
  numberOfCol: string;
  toggled?: number[];
  setToggled?: React.Dispatch<React.SetStateAction<number[]>>;
}

const Grouping: React.FunctionComponent<IGroupingProps> = ({
  title,
  items,
  isWithSlider,
  numberOfCol,
  setNumberOfCol,
  toggled,
  setToggled
}) => {
  const handleToggle = (id: number) => {
    if (toggled && setToggled) {
      const isTurnedOn = toggled.find((item) => item === id);
      const removeFromToggled = [...toggled].filter((item) => item !== id);
      const updateToggled = isTurnedOn ? [...removeFromToggled] : [...toggled, id];
      setToggled([...updateToggled]);
    }
  };
  return (
    <div className="group">
      <div className="group-title">{title}</div>
      <div className="group-items">
        {items.map((item) => {
          const isToggled = toggled?.includes(Number(item.id));
          return (
            <button
              onClick={() => handleToggle(Number(item.id))}
              className={`group-items-item ${isToggled ? 'toggled' : ''}`}
              key={item.id}
            >
              {item.name}
            </button>
          );
        })}
      </div>
      {isWithSlider && <SliderColumns numberOfCol={numberOfCol} setNumberOfCol={setNumberOfCol} />}
    </div>
  );
};

export default Grouping;
