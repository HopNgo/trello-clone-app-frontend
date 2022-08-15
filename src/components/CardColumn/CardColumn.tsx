import CardItem from "components/CardItem/CardItem";
import ConfirmModal from "components/Common/ComfirmModal";
import ICard from "interface/ICard";
import IColumn from "../../interface/IColumn";
import React, { useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { Container, Draggable } from "react-smooth-dnd";
import {
  MODAL_ACTION_CLOSE,
  MODAL_ACTION_CONFIRM,
  MODAL_ACTION_OPEN,
} from "utilities/constants";
import { mapOrder } from "utilities/sorts";
import "./CardColumn.scss";

interface CardColumnProps {
  column: IColumn;
  onCardDrop: Function;
  onUpdateColumn: Function;
}

const CardColumn: React.FC<CardColumnProps> = ({
  column,
  onCardDrop,
  onUpdateColumn,
}) => {
  const cards = mapOrder(column.cards, column.cardOrder, "id");
  const [toggleModalRemoveColumn, setToggleModalRemoveColumn] =
    useState<Boolean>(false);
  const [editColumnTitle, setEditColumnTitle] = useState<string>(column.title);

  const onConfirmModalAction = (actionType: string) => {
    if (actionType === MODAL_ACTION_CLOSE) {
      setToggleModalRemoveColumn(false);
    }
    if (actionType === MODAL_ACTION_OPEN) {
      setToggleModalRemoveColumn(true);
    }
    if (actionType === MODAL_ACTION_CONFIRM) {
      const newColumn = { ...column, _destroy: true };
      onUpdateColumn(newColumn);
    }
  };

  const selectAllInlineText = (e: any) => {
    e.target.focus();
    e.target.select();
  };

  const saveTitleColumnAfterPressEnter = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.blur();
    }
  };

  const handleSaveTitleColumnAfterBlur = () => {
    const newColumn = { ...column, title: editColumnTitle };
    onUpdateColumn(newColumn);
  };

  return (
    <div className="card-column">
      <header className="column-drag-handle">
        <div className="column-title">
          <Form.Control
            type="text"
            size="sm"
            className="column-title-editable"
            value={editColumnTitle}
            onChange={(e) => setEditColumnTitle(e.target.value)}
            onKeyDown={saveTitleColumnAfterPressEnter}
            onClick={selectAllInlineText}
            onMouseDown={(e: any) => e.preventDefault()}
            spellCheck={false}
            onBlur={handleSaveTitleColumnAfterBlur}
          />
        </div>
        <div className="column-dropdown">
          <Dropdown>
            <Dropdown.Toggle
              variant="primary"
              id="dropdown-basic"
              size="sm"
              className="dropdown-btn-action"
            ></Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Add Card...</Dropdown.Item>
              <Dropdown.Item
                onClick={() => onConfirmModalAction(MODAL_ACTION_OPEN)}
              >
                Remove Column...
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">
                Move all cards in this column (beta)
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">
                Archive all cards in this column (beta)
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
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
      <ConfirmModal
        show={toggleModalRemoveColumn}
        onAction={onConfirmModalAction}
        title="Remove Column"
        content={`Are you sure you want to remove <strong>${column.title}</strong> ? </br> All related cards will aslo be removed !!`}
      />
    </div>
  );
};

export default CardColumn;
