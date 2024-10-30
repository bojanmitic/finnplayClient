import * as React from 'react';
import './GameCard.css';

interface IGameCardProps {
  src: string;
  alt: string;
}

const GameCard: React.FunctionComponent<IGameCardProps> = ({ src, alt }) => {
  return (
    <div className="image-card">
      <img className="image-card-img" src={src} alt={alt} />
    </div>
  );
};

export default GameCard;
