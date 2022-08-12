import CardItem from "components/CardItem/CardItem";
import React from "react";
import "./CardColumn.scss";
import IColumn from "interface/ICoLumn";
import { mapOrder } from "utilities/sorts";
import ICard from "interface/ICard";
import { Container, Draggable } from "react-smooth-dnd";

interface CardColumnProps {
  column: IColumn;
}

const CardColumn: React.FC<CardColumnProps> = ({ column }) => {
  console.log(column);
  const cards = mapOrder(column.cards, column.cardOrder, "id");

  const onCardDrop = (CardResult: any) => {
    console.log(CardResult);
  };

  return (
    <div className="card-column">
      <header className="column-drag-handle">{column.title}</header>
      <ul className="task-list">
        <Container
          groupName="col"
          onDrop={onCardDrop}
          getChildPayload={(index) => cards[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: "drop-preview",
          }}
        >
          {cards.map((card: ICard) => (
            <Draggable key={card.id}>
              <CardItem card={card} />
            </Draggable>
          ))}
        </Container>
      </ul>
      <footer>Add another card</footer>
    </div>
  );
};

export default CardColumn;
