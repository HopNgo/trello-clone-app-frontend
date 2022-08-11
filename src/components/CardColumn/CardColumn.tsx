import CardItem from "components/CardItem/CardItem";
import Task from "components/CardItem/CardItem";
import React from "react";
import "./CardColumn.scss";
import IColumn from "interface/ICoLumn";
import { mapOrder } from "utilities/sorts";
import ICard from "interface/ICard";

interface CardColumnProps {
  column: IColumn;
}

const CardColumn: React.FC<CardColumnProps> = ({ column }) => {
  console.log(column);
  const cards = mapOrder(column.cards, column.cardOrder, "id");

  return (
    <div className="card-column">
      <header>{column.title}</header>
      <ul className="task-list">
        {cards.map((card: ICard) => (
          <CardItem key={card.id} card={card} />
        ))}
      </ul>
      <footer>Add another card</footer>
    </div>
  );
};

export default CardColumn;
