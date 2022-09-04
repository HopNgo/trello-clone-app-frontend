import { updateCardApi } from "api/cardApi";
import autosize from "autosize";
import ConfirmModal from "components/Common/ComfirmModal";
import IBoard from "interface/IBoard";
import ICard from "interface/ICard";
import IColumn from "interface/ICoLumn";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import {
  MODAL_ACTION_CLOSE,
  MODAL_ACTION_CONFIRM,
  MODAL_ACTION_OPEN,
} from "utilities/constants";
import "./CardItem.scss";

interface CardItemProps {
  card: ICard;
  setColumns: Function;
  setBoard: Function;
  columns: IColumn[];
  board: IBoard;
}

const CardItem: React.FC<CardItemProps> = ({
  card,
  setColumns,
  setBoard,
  columns,
  board,
}) => {
  useEffect(() => {
    autosize(document.querySelectorAll(".card-title-editable"));
  }, []);

  const [editCardTitle, setEditCardTitle] = useState<string>(card.title);
  const [toggleRemoveCard, setToggleRemoveCard] = useState<boolean>(false);

  const selectAllInlineText = (e: any) => {
    e.target.focus();
    e.target.select();
  };

  const handleSaveTitleCardAfterBlur = () => {
    const newCard: ICard = { ...card, title: editCardTitle.trim() };
    let newColumns: IColumn[] = [...columns];
    let newColumn: IColumn | undefined = newColumns.find(
      (column: IColumn) => column._id === newCard.columnId
    );
    const indexNewCardInColumn = newColumn?.cards.findIndex(
      (card: ICard) => card._id === newCard._id
    );
    if (indexNewCardInColumn !== undefined && newColumn) {
      newColumn.cards[indexNewCardInColumn] = newCard;
    }
    const indexNewColumnInNewColumns: number | undefined = newColumns.findIndex(
      (column: IColumn) => column._id === newColumn?._id
    );
    if (indexNewColumnInNewColumns !== undefined && newColumn) {
      newColumns[indexNewColumnInNewColumns] = newColumn;
    }
    setColumns(newColumns);

    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((column) => column._id);
    newBoard.columns = newColumns;
    setBoard(newBoard);

    updateCardApi(newCard._id, newCard).catch((error) => console.log(error));
  };

  const saveTitleCardAfterPressEnter = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.blur();
    }
  };

  const onConfirmModalActionRemoveCard = (typeAction: string) => {
    if (typeAction === MODAL_ACTION_CLOSE) {
      setToggleRemoveCard(false);
    }
    if (typeAction === MODAL_ACTION_OPEN) {
      setToggleRemoveCard(true);
    }
    if (typeAction === MODAL_ACTION_CONFIRM) {
      const newCard = { ...card, _destroy: true };
      let newColumns: IColumn[] = [...columns];
      let newColumn: IColumn | undefined = newColumns.find(
        (column: IColumn) => column._id === newCard.columnId
      );
      const indexNewCardInColumn = newColumn?.cards.findIndex(
        (card: ICard) => card._id === newCard._id
      );

      if (indexNewCardInColumn !== undefined && newColumn) {
        newColumn.cards.splice(indexNewCardInColumn, 1);
      }

      const indexRemoveItemCardOrder: number | undefined =
        newColumn?.cardOrder.indexOf(newCard._id);
      if (
        indexRemoveItemCardOrder !== -1 &&
        indexRemoveItemCardOrder !== undefined
      )
        newColumn?.cardOrder.splice(indexRemoveItemCardOrder, 1);

      setColumns(newColumns);

      let newBoard = { ...board };
      newBoard.columnOrder = newColumns.map((column) => column._id);
      newBoard.columns = newColumns;
      setBoard(newBoard);

      updateCardApi(newCard._id, newCard).catch((error) => console.log(error));
    }
  };

  return (
    <li className="card-item">
      {card.cover && (
        <div className="card-item__img">
          <img
            src={card.cover}
            onMouseDown={(e) => e.preventDefault()}
            alt="img-drop"
          />
        </div>
      )}
      <div className="card-item-contentAndAction">
        <div className="card-item-content">
          <Form.Control
            type="text"
            size="sm"
            as={"textarea"}
            rows={1}
            className="card-title-editable"
            value={editCardTitle}
            onChange={(e) => setEditCardTitle(e.target.value)}
            onKeyDown={saveTitleCardAfterPressEnter}
            onClick={selectAllInlineText}
            onMouseDown={(e: any) => e.preventDefault()}
            spellCheck={false}
            onBlur={handleSaveTitleCardAfterBlur}
          />
        </div>
        <div
          className="card-item-action"
          onClick={() => onConfirmModalActionRemoveCard(MODAL_ACTION_OPEN)}
        >
          &times;
        </div>
      </div>
      <ConfirmModal
        title="Remove Card"
        content={`Are you sure you want to remove <strong>${card.title}</strong> ?`}
        show={toggleRemoveCard}
        onAction={onConfirmModalActionRemoveCard}
      />
    </li>
  );
};

export default CardItem;
