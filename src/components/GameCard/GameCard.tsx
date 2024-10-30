import * as React from 'react';
import './GameCard.css';

interface IGameCardProps {
  cover: string;
  coverLarge: string;
  alt: string;
}

const GameCard: React.FunctionComponent<IGameCardProps> = ({ coverLarge, cover, alt }) => {
  return (
    <div className="image-card">
      <img className="image-card-img" src={cover} alt={alt} srcSet={`${cover} 248w, ${coverLarge} 300w`} />
    </div>
  );
};

export default GameCard;
