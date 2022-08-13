import CardItem from "components/CardItem/CardItem";
import React from "react";
import "./CardColumn.scss";
import IColumn from "interface/ICoLumn";
import { mapOrder } from "utilities/sorts";
import ICard from "interface/ICard";
import { Container, Draggable } from "react-smooth-dnd";

interface CardColumnProps {
  column: IColumn;
  onCardDrop: Function;
}

const CardColumn: React.FC<CardColumnProps> = ({ column, onCardDrop }) => {
  const cards = mapOrder(column.cards, column.cardOrder, "id");

  return (
    <div className="card-column">
      <header className="column-drag-handle">{column.title}</header>
      <ul className="task-list">
        <Container
          groupName="col"
          onDrop={(CardResult) => onCardDrop(CardResult, column.id)}
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
      <footer>
        <div className="footer-actions">
          <i className="fa fa-plus icon"></i>Add another card
        </div>
      </footer>
    </div>
  );
};

export default CardColumn;
