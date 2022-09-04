import { addBoardApi, getBoardListApi } from "api/boardApi";
import BoardItem from "components/BoardItem/BoardItem";
import IBoard from "interface/IBoard";
import { useEffect, useRef, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { getRandomUrl } from "utilities/randomPhoto";
import "./BoardList.scss";

const BoardList = () => {
  const [toggleFormAddNewBoard, setToggleFormAddNewBoard] =
    useState<Boolean>(false);

  const [newTitleBoard, setNewTitleBoard] = useState<string>();

  const inputTitleBoardRef: React.RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);

  const [photoUrl, setPhotoUrl] = useState<string>("");

  const [loadingPhoto, setLoadingPhoto] = useState<boolean>(false);

  const [isErrorPhotoUrl, setIsErrorPhotoUrl] = useState<boolean>(false);

  const initialBoardList = [
    {
      _id: "",
      cover: "",
      title: "",
      createdAt: 0,
      updatedAt: 0,
      _destroy: false,
    },
  ];

  const [boardList, setBoardList] = useState<IBoard[]>(initialBoardList);
  console.log(boardList);

  useEffect(() => {
    const fetchBoardList = async () => {
      const data = await getBoardListApi();
      setBoardList(data);
    };

    fetchBoardList();
  }, []);

  useEffect(() => {
    inputTitleBoardRef?.current?.focus();
  }, [toggleFormAddNewBoard]);

  const handleAddNewPhotoRandom = (): void => {
    const urlPhotoRandom = getRandomUrl();
    setPhotoUrl(urlPhotoRandom);
    setLoadingPhoto(true);
  };

  const handleAddNewBoard = (): void => {
    if (newTitleBoard && photoUrl) {
      const newBoard: {
        title: string;
        cover: string;
      } = {
        title: newTitleBoard,
        cover: photoUrl,
      };

      addBoardApi(newBoard)
        .then((data) => {
          setBoardList((prev) => [...prev, data]);
        })
        .catch((error) => console.log(error));

      setNewTitleBoard("");
      setToggleFormAddNewBoard(false);
      setPhotoUrl("");
    }
  };

  return (
    <div className="board-list">
      {boardList.map((board: IBoard) => (
        <BoardItem key={board._id} board={board} setBoardList={setBoardList} />
      ))}

      {toggleFormAddNewBoard ? (
        <div className="form-add-new-board">
          <div className="input">
            <Form.Control
              type="text"
              size="sm"
              placeholder="Enter title board..."
              className="input-board"
              value={newTitleBoard || ""}
              onChange={(e) => setNewTitleBoard(e.target.value)}
              ref={inputTitleBoardRef}
            />
          </div>
          <div className="add-photo">
            <Button
              variant="success"
              size="sm"
              className="btn"
              onClick={handleAddNewPhotoRandom}
            >
              {loadingPhoto && (
                <Spinner
                  animation="border"
                  size="sm"
                  style={{ marginRight: "5px" }}
                />
              )}
              Random a photo
            </Button>

            {photoUrl.length > 0 && (
              <img
                src={photoUrl}
                alt="Not Found !! Please try again"
                onError={() => {
                  setIsErrorPhotoUrl(true);
                  setLoadingPhoto(false);
                }}
                onLoad={() => {
                  setIsErrorPhotoUrl(false);
                  setLoadingPhoto(false);
                }}
                loading="eager"
              />
            )}
          </div>
          <div className="btn-and-cancel">
            <Button
              variant="primary"
              size="sm"
              className="btn"
              onClick={handleAddNewBoard}
              disabled={photoUrl.length === 0 || isErrorPhotoUrl}
            >
              Add Board
            </Button>
            <i
              className="fa fa-trash cancel"
              onClick={() => {
                setToggleFormAddNewBoard(false);
                setPhotoUrl("");
              }}
            ></i>
          </div>
        </div>
      ) : (
        <div
          className="btn-add-board"
          onClick={() => setToggleFormAddNewBoard(true)}
        >
          <p>Add New Board</p>
          <i className="fa fa-plus"></i>
        </div>
      )}
    </div>
  );
};

export default BoardList;
