import { initalData } from "actions/initalData";
import { initialBoard } from "actions/initialBoard";
import CardColumn from "components/CardColumn/CardColumn";
import IBoard from "interface/IBoard";
import IColumn from "../../interface/IColumn";
import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from "utilities/dragDrop";
import { mapOrder } from "utilities/sorts";
import "./BoardContent.scss";

interface IColumnUpdate extends IColumn {
  _destroy?: Boolean;
}

const BoardContent = () => {
  const [board, setBoard] = useState<IBoard>(initialBoard);
  const [columns, setColumns] = useState<IColumn[]>([]);
  const [toggleFormAddNewColumn, setToggleFormAddNewColumn] =
    useState<Boolean>(false);
  const inputNewColumnRef = useRef<HTMLInputElement>(null);
  const [newColumnTitle, setNewColumnTitle] = useState<string>();

  console.log(columns, board);

  const addNewColumnRef: React.RefObject<HTMLDivElement> =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const boardFromDB = initalData.boards.find(
      (board: IBoard) => (board.id = "board-1")
    );
    if (boardFromDB) {
      setBoard(boardFromDB);
      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, "id"));
    }
  }, []);

  useEffect(() => {
    if (inputNewColumnRef && inputNewColumnRef.current) {
      inputNewColumnRef.current.focus();
      inputNewColumnRef.current.select();
    }
    if (addNewColumnRef && addNewColumnRef.current) {
      addNewColumnRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
    }
  }, [toggleFormAddNewColumn]);

  const onColumnDrop = (DropResult: any) => {
    let newColumns: IColumn[] = [...columns];
    newColumns = applyDrag(newColumns, DropResult);

    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((column) => column.id);
    newBoard.columns = newColumns;
    setColumns(newColumns);
    setBoard(newBoard);
  };

  const onCardDrop = (CardResult: any, columnId: string) => {
    if (CardResult.removedIndex !== null || CardResult.addedIndex !== null) {
      let newColumns = [...columns];
      let currentColumn = newColumns.find((column) => column.id === columnId);
      if (currentColumn) {
        currentColumn.cards = applyDrag(currentColumn?.cards, CardResult);
        currentColumn.cardOrder = currentColumn.cards.map((card) => card.id);
      }
      setColumns(newColumns);
      console.log(board);
      console.log(columns);
    }
  };

  const openFormAddNewColumn = () => {
    setToggleFormAddNewColumn(true);
  };

  const closeFormAddNewColumn = () => {
    setToggleFormAddNewColumn(false);
  };

  const addNewColumnTitle = () => {
    if (!newColumnTitle) {
      if (inputNewColumnRef && inputNewColumnRef.current) {
        inputNewColumnRef.current.focus();
      }
    } else {
      const newColumnDataAdded = {
        id: Math.random().toString(36).substr(2, 5),
        boardId: board.id,
        cards: [],
        cardOrder: [],
        title: newColumnTitle.trim(),
      };
      let newColumns: IColumn[] = [...columns];
      newColumns.push(newColumnDataAdded);

      let newBoard = { ...board };
      newBoard.columnOrder = newColumns.map((column) => column.id);
      newBoard.columns = newColumns;
      setColumns(newColumns);
      setBoard(newBoard);
      setToggleFormAddNewColumn(false);
      setNewColumnTitle("");
    }
  };

  const onUpdateColumn = (newColumn: IColumnUpdate) => {
    const columnIdToUpdate = newColumn.id;
    let newColumns = [...columns];
    const columnIndexToUpdate = newColumns.findIndex(
      (column) => column.id === columnIdToUpdate
    );
    if (newColumn._destroy) {
      newColumns.splice(columnIndexToUpdate, 1);
    } else {
      if (columnIndexToUpdate) {
        newColumns.splice(columnIndexToUpdate, 1, newColumn);
      }
    }
    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((column) => column.id);
    newBoard.columns = newColumns;
    setColumns(newColumns);
    setBoard(newBoard);
  };
  
  if (board === undefined) {
    return <div className="">Board Not found</div>;
  }

  return (
    <div className="board-content">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        dragHandleSelector=".column-drag-handle"
        getChildPayload={(index) => {
          return columns[index];
        }}
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: "column-drop-preview",
        }}
      >
        {columns.map((column: IColumn) => (
          <Draggable key={column.id}>
            <CardColumn
              column={column}
              onCardDrop={onCardDrop}
              onUpdateColumn={onUpdateColumn}
              setColumns={setColumns}
              setBoard={setBoard}
              board={board}
              columns={columns}
            />
          </Draggable>
        ))}
      </Container>
      {toggleFormAddNewColumn ? (
        <div className="form-add-new-column">
          <div className="input">
            <Form.Control
              type="text"
              size="sm"
              placeholder="Enter title column..."
              className="input-column"
              ref={inputNewColumnRef}
              value={newColumnTitle || ""}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addNewColumnTitle()}
            />
          </div>
          <div className="btn-and-cancel">
            <Button
              variant="primary"
              size="sm"
              className="btn"
              onClick={addNewColumnTitle}
            >
              Add Column
            </Button>
            <i
              className="fa fa-trash cancel"
              onClick={closeFormAddNewColumn}
            ></i>
          </div>
        </div>
      ) : (
        <div
          className="add-new-column"
          onClick={openFormAddNewColumn}
          ref={addNewColumnRef}
        >
          <i className="fa fa-plus"></i>Add another list
        </div>
      )}
    </div>
  );
};

export default BoardContent;
