import CardColumn from "components/CardColumn/CardColumn";
import React, { useEffect, useState } from "react";
import "./BoardContent.scss";
import { initalData } from "actions/initalData";
import IBoard from "interface/IBoard";
import IColumn from "interface/ICoLumn";
import { mapOrder } from "utilities/sorts";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from "utilities/dragDrop";
import { initialBoard } from "actions/initialBoard";

const BoardContent = () => {
  const [board, setBoard] = useState<IBoard>(initialBoard);
  const [columns, setColumns] = useState<IColumn[]>([]);

  useEffect(() => {
    const boardFromDB = initalData.boards.find(
      (board: IBoard) => (board.id = "board-1")
    );
    if (boardFromDB) {
      setBoard(boardFromDB);
      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, "id"));
    }
  }, []);

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
            <CardColumn column={column} onCardDrop={onCardDrop} />
          </Draggable>
        ))}
      </Container>
      <div className="add-new-column">
        <i className="fa fa-plus"></i>Add another list
      </div>
    </div>
  );
};

export default BoardContent;
