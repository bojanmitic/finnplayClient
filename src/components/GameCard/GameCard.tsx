import * as React from 'react';
import './GameCard.css';

interface IGameCardProps {
  src: string;
  alt: string;
}

const GameCard: React.FunctionComponent<IGameCardProps> = ({ src, alt }) => {
  return (
    <div>
      <img className="image-card" src={src} alt={alt} />
    </div>
  );
};

export default GameCard;
