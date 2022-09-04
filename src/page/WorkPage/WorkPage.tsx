import { initialBoard } from "actions/initialBoard";
import { getBoardDetailApi } from "api/boardApi";
import BoardBar from "components/BoardBar/BoardBar";
import IBoard from "interface/IBoard";
import IColumn from "interface/ICoLumn";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { mapOrder } from "utilities/sorts";
import BoardContent from "../../components/BoardContent/BoardContent";
import "./WorkPage.scss";
import { Loading } from "react-loading-dot";

type QuizParams = {
  boardId: string;
};

const WorkPage = () => {
  const { boardId } = useParams<keyof QuizParams>() as QuizParams;

  const [loadingBoard, setLoadingBoard] = useState<boolean>(true);

  const [board, setBoard] = useState<IBoard>(initialBoard);
  const [columns, setColumns] = useState<IColumn[]>([]);

  useEffect(() => {
    getBoardDetailApi(boardId).then((board: IBoard) => {
      setLoadingBoard(false);
      setBoard(board);
      setColumns(mapOrder(board.columns, board.columnOrder, "_id"));
    });
  }, [boardId]);

  return (
    <div className="work-page">
      {loadingBoard ? (
        <div className="work-page__loading">
          <Loading margin="0.5rem" size="0.7rem" background="white" dots={4} />
        </div>
      ) : (
        <>
          <BoardBar title={board.title} />
          <BoardContent
            board={board}
            setBoard={setBoard}
            columns={columns}
            setColumns={setColumns}
          />
        </>
      )}
    </div>
  );
};

export default WorkPage;
