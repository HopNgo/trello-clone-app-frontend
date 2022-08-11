import CardColumn from "components/CardColumn/CardColumn";
import React, { useEffect, useState } from "react";
import "./BoardContent.scss";
import { initalData } from "actions/initalData";
import IBoard from "interface/IBoard";
import IColumn from "interface/ICoLumn";
import { mapOrder } from "utilities/sorts";

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

  if (board === undefined) {
    return <div className="">Board Not found</div>;
  }

  return (
    <div className="board-content">
      {columns.map((column: IColumn) => (
        <CardColumn key={column.id} column={column} />
      ))}
    </div>
  );
};

export default BoardContent;
