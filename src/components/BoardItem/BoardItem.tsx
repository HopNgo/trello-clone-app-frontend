import "./BoardItem.scss";
import { useEffect, useState } from "react";
import { Spinner, Form } from "react-bootstrap";
import IBoard from "interface/IBoard";
import { updateBoardApi } from "api/boardApi";
import ConfirmModal from "components/Common/ComfirmModal";
import {
  MODAL_ACTION_CLOSE,
  MODAL_ACTION_CONFIRM,
  MODAL_ACTION_OPEN,
} from "utilities/constants";
import { NavigateFunction, useNavigate } from "react-router-dom";

interface BoardItemProps {
  board: IBoard;
  setBoardList: (setBoardListFunc: (value: IBoard[]) => IBoard[]) => void;
}

const BoardItem: React.FC<BoardItemProps> = ({ board, setBoardList }) => {
  const navigate: NavigateFunction = useNavigate();

 

  const [toggleModalRemoveBoard, setToggleModalRemoveBoard] =
    useState<boolean>(false);

  const [loadingImage, setLoadingImage] = useState<boolean>(true);

  const [editBoardTitle, setEditBoardTitle] = useState<string>(board.title);

  const saveTitleBoardAfterPressEnter = (e: any): void => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  };

  const selectAllInlineText = (e: any): void => {
    e.target.focus();
    e.target.select();
  };

  const handleSaveTitleBoardAfterBlur = (): void => {
    const newBoard = { ...board, title: editBoardTitle };

    //setBoardList aside frontend after edit title
    setBoardList((prev: IBoard[]) => {
      const newBoardList = [...prev];
      const indexBoardToRemove = newBoardList.findIndex(
        (b) => b._id === newBoard._id
      );
      newBoardList[indexBoardToRemove] = newBoard;
      return newBoardList;
    });

    //call APIs to update board after edit title
    updateBoardApi(newBoard._id, newBoard).catch((error) => console.log(error));
  };

  const onConfirmModalActionRemoveBoard = (actionType: string): void => {
    if (actionType === MODAL_ACTION_CLOSE) {
      setToggleModalRemoveBoard(false);
    }
    if (actionType === MODAL_ACTION_OPEN) {
      setToggleModalRemoveBoard(true);
    }
    if (actionType === MODAL_ACTION_CONFIRM) {
      const boardIdToRemove = board._id;

      //setBoardList aside frontend after remove board
      setBoardList((prev: IBoard[]) => {
        const newBoardList = [...prev];
        const indexBoardToRemove = newBoardList.findIndex(
          (b) => b._id === boardIdToRemove
        );
        newBoardList.splice(indexBoardToRemove, 1);
        return newBoardList;
      });

      //call APIs aside backend to update boards after remove board
      const data = {
        _id: boardIdToRemove,
        _destroy: true,
      };
      updateBoardApi(data._id, data).catch((error) => console.log(error));

      setToggleModalRemoveBoard(false);
    }
  };

  return (
    <div className="board-item">
      <div className="board-item-image">
        <img
          src={board.cover}
          alt="Not Found"
          onLoad={() => setLoadingImage(false)}
          style={{ display: `${loadingImage ? "none" : "block"}` }}
        />

        <div
          className="overlay-loading"
          style={{ display: `${loadingImage ? "flex" : "none"}` }}
        >
          <Spinner animation="border" variant="primary" />
        </div>
        <div className="board-item-image__overlay">
          <button
            className="btn-eye btn"
            onClick={() => navigate(`${board._id}`)}
          >
            <i className="fa fa-eye"></i>
          </button>
          <button
            className="btn-remove btn"
            onClick={() => setToggleModalRemoveBoard(true)}
          >
            <i className="fa fa-trash"></i>
          </button>
        </div>
      </div>
      <Form.Control
        type="text"
        size="sm"
        className="board-title-editable"
        value={editBoardTitle}
        onChange={(e) => setEditBoardTitle(e.target.value)}
        onKeyDown={saveTitleBoardAfterPressEnter}
        onClick={selectAllInlineText}
        onMouseDown={(e: any) => e.preventDefault()}
        spellCheck={false}
        onBlur={handleSaveTitleBoardAfterBlur}
      />

      <ConfirmModal
        show={toggleModalRemoveBoard}
        onAction={onConfirmModalActionRemoveBoard}
        title="Remove Board"
        content={`Are you sure you want to remove board <strong>${board.title}</strong> ? </br> All related columns and cards will aslo be removed !!`}
      />
    </div>
  );
};

export default BoardItem;
