import CardColumn from "components/CardColumn/CardColumn";
import React, { useEffect, useState } from "react";
import "./BoardContent.scss";
import { initalData } from "actions/initalData";
import IBoard from "interface/IBoard";
import IColumn from "interface/ICoLumn";
import { mapOrder } from "utilities/sorts";
import { Container, Draggable } from "react-smooth-dnd";

const BoardContent = () => {
  const [board, setBoard] = useState<IBoard>();
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
    console.log(DropResult);
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
            <CardColumn column={column} />
          </Draggable>
        ))}
      </Container>
    </div>
  );
};

export default BoardContent;
