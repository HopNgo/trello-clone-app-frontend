import ICard from "interface/ICard";
import React from "react";
import "./CardItem.scss";

interface CardItemProps {
  card: ICard;
}

const CardItem: React.FC<CardItemProps> = ({ card }) => {
  return (
    <li className="card-item">
      {card.cover && <img src={card.cover} />}
      {card.title}
    </li>
  );
};

export default CardItem;
