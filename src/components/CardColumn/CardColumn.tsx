import CardItem from "components/CardItem/CardItem";
import ConfirmModal from "components/Common/ComfirmModal";
import ICard from "interface/ICard";
import IColumn from "../../interface/IColumn";
import React, { useEffect, useRef, useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import { Container, Draggable } from "react-smooth-dnd";
import {
  MODAL_ACTION_CLOSE,
  MODAL_ACTION_CONFIRM,
  MODAL_ACTION_OPEN,
} from "utilities/constants";
import { mapOrder } from "utilities/sorts";
import "./CardColumn.scss";
import { cloneDeep } from "lodash";
import IBoard from "interface/IBoard";

interface CardColumnProps {
  column: IColumn;
  onCardDrop: Function;
  onUpdateColumn: Function;
  setColumns: Function;
  setBoard: Function;
  columns: IColumn[];
  board: IBoard;
}

const CardColumn: React.FC<CardColumnProps> = ({
  column,
  onCardDrop,
  onUpdateColumn,
  setColumns,
  setBoard,
  columns,
  board,
}) => {
  const cards = mapOrder(column.cards, column.cardOrder, "_id");

  const [toggleModalRemoveColumn, setToggleModalRemoveColumn] =
    useState<Boolean>(false);

  const [editColumnTitle, setEditColumnTitle] = useState<string>(column.title);

  const [toggleAddNewCard, setToggleAddNewCard] = useState<Boolean>(false);

  const textareaAddCardRef = useRef<HTMLTextAreaElement>(null);

  const [newCardTitle, setNewCardTitle] = useState<string>("");

  const formAddNewCardRef: React.RefObject<HTMLDivElement> =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    textareaAddCardRef?.current?.focus();
    textareaAddCardRef?.current?.select();

    formAddNewCardRef?.current?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
    });
  }, [toggleAddNewCard]);

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

  const handleAddNewCard = () => {
    if (!newCardTitle) {
      textareaAddCardRef?.current?.focus();
      return;
    } else {
      const newCardDataAdded: ICard = {
        _id: Math.random().toString(36).substr(2, 5),
        boardId: column.boardId,
        title: newCardTitle.trim(),
        columnId: column._id,
        cover: null,
      };
      console.log(newCardDataAdded);

      let newColumn = cloneDeep(column);
      newColumn.cards.push(newCardDataAdded);
      newColumn.cardOrder.push(newCardDataAdded._id);

      let newColumns = [...columns];
      const indexColumnToAddCard = newColumns.findIndex(
        (col) => col._id === newColumn._id
      );
      newColumns.splice(indexColumnToAddCard, 1, newColumn);
      setColumns(newColumns);

      let newBoard = { ...board };
      newBoard.columnOrder = newColumns.map((column) => column._id);
      newBoard.columns = newColumns;
      setBoard(newBoard);

      setNewCardTitle("");
      setToggleAddNewCard(false);
    }
  };

  const handleClickRemoveAllCard = () => {
    let newColumn = { ...column };
    newColumn.cards = [];
    newColumn.cardOrder = [];

    let newColumns = [...columns];
    const indexColumnsToRemove = newColumns.findIndex(
      (column) => column._id === newColumn._id
    );

    if (indexColumnsToRemove || indexColumnsToRemove === 0) {
      newColumns.splice(indexColumnsToRemove, 1, newColumn);
    }
    setColumns(newColumns);

    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((column) => column._id);
    newBoard.columns = newColumns;
    setBoard(newBoard);
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
              <Dropdown.Item onClick={() => setToggleAddNewCard(true)}>
                Add Card...
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => onConfirmModalAction(MODAL_ACTION_OPEN)}
              >
                Remove Column...
              </Dropdown.Item>
              <Dropdown.Item onClick={handleClickRemoveAllCard}>
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
          onDrop={(CardResult) => onCardDrop(CardResult, column._id)}
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
            <Draggable key={card._id}>
              <CardItem card={card} />
            </Draggable>
          ))}
        </Container>
        {toggleAddNewCard && (
          <div className="form-add-new-card" ref={formAddNewCardRef}>
            <div className="input">
              <Form.Control
                ref={textareaAddCardRef}
                rows={3}
                as="textarea"
                size="sm"
                placeholder="Enter title card ..."
                className="textarea-card"
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
              />
            </div>
            <div className="btn-and-cancel">
              <Button
                variant="primary"
                size="sm"
                className="btn"
                onClick={handleAddNewCard}
              >
                Add Card
              </Button>
              <i
                className="fa fa-trash cancel"
                onClick={() => setToggleAddNewCard(false)}
              ></i>
            </div>
          </div>
        )}
      </ul>
      {!toggleAddNewCard && (
        <footer>
          <div
            className="footer-actions "
            onClick={() => setToggleAddNewCard(true)}
          >
            <i className="fa fa-plus icon"></i>
            Add another card
          </div>
        </footer>
      )}

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
