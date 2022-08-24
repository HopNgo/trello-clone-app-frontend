import { initialBoard } from "actions/initialBoard";
import CardColumn from "components/CardColumn/CardColumn";
import IBoard from "interface/IBoard";
import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from "utilities/dragDrop";
import { mapOrder } from "utilities/sorts";
import "./BoardContent.scss";
import IColumn from "interface/ICoLumn";
import { createColumnApi, updateColumnApi } from "api/columnApi";
import { getBoardDetailApi, updateBoardApi } from "api/boardApi";
import { updateCardApi } from "api/cardApi";

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
    const boardId: string = "62fdec3023029563b79aab17";
    getBoardDetailApi(boardId).then((board: IBoard) => {
      setBoard(board);
      setColumns(mapOrder(board.columns, board.columnOrder, "_id"));
    });
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
    newBoard.columnOrder = newColumns.map((column) => column._id);
    newBoard.columns = newColumns;

    setColumns(newColumns);
    setBoard(newBoard);

    //update columnOrder to server when drag & drop column
    const data: { columnOrder: string[] } = {
      columnOrder: newBoard.columnOrder,
    };
    updateBoardApi(newBoard._id, data).catch((error) => {
      console.log(error);
    });
  };

  const onCardDrop = (CardResult: any, columnId: string) => {
    if (
      CardResult.removedIndex !== CardResult.addedIndex &&
      (CardResult.removedIndex !== null || CardResult.addedIndex !== null)
    ) {
      let newColumns: IColumn[] = [...columns];
      let currentColumn: IColumn | undefined = newColumns.find(
        (column) => column._id === columnId
      );
      if (currentColumn) {
        currentColumn.cards = applyDrag(currentColumn?.cards, CardResult);
        currentColumn.cardOrder = currentColumn.cards.map((card) => card._id);
      }

      if (CardResult.removedIndex !== null && CardResult.addedIndex !== null) {
        //drag & drop card inside its column
        //Call api update cardOrder field in collection columns
        const data: { cardOrder: string[] } = {
          cardOrder: currentColumn ? currentColumn?.cardOrder : [],
        };
        updateColumnApi(columnId, data).catch((error) => {
          console.log(error);
        });
      } else {
        //drag card from this column and drop it to that column
        //call api update cardOrder field in collection columns
        const data = {
          cardOrder: currentColumn?.cardOrder,
        };
        updateColumnApi(columnId, data).catch((error) => {
          console.log(error);
        });

        //drag card from this column and drop it to that column
        //call api update columnId field in card.
        if (CardResult.addedIndex !== null) {
          let currentCard = { ...CardResult.payload };
          currentCard.columnId = currentColumn?._id;
          updateCardApi(currentCard._id, currentCard).catch((error) =>
            console.log(error)
          );
        }
      }

      setColumns(newColumns);
    }
  };

  const openFormAddNewColumn = (): void => {
    setToggleFormAddNewColumn(true);
  };

  const closeFormAddNewColumn = (): void => {
    setToggleFormAddNewColumn(false);
  };

  const addNewColumnTitle = () => {
    if (!newColumnTitle) {
      if (inputNewColumnRef && inputNewColumnRef.current) {
        inputNewColumnRef.current.focus();
      }
    } else {
      const newColumnDataAdded = {
        boardId: board._id,
        title: newColumnTitle.trim(),
      };
      createColumnApi(newColumnDataAdded).then((column: IColumn) => {
        let newColumns: IColumn[] = [...columns];
        newColumns.push(column);
        let newBoard = { ...board };
        newBoard.columnOrder = newColumns.map((column: IColumn) => column._id);
        newBoard.columns = newColumns;
        setColumns(newColumns);
        setBoard(newBoard);
        setToggleFormAddNewColumn(false);
        setNewColumnTitle("");
      });
    }
  };

  const onUpdateColumn = (newColumn: IColumnUpdate) => {
    const columnIdToUpdate = newColumn._id;
    let newColumns = [...columns];
    const columnIndexToUpdate = newColumns.findIndex(
      (column) => column._id === columnIdToUpdate
    );
    if (newColumn._destroy) {
      newColumns.splice(columnIndexToUpdate, 1);
    } else {
      if (columnIndexToUpdate) {
        newColumns.splice(columnIndexToUpdate, 1, newColumn);
      }
    }
    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((column) => column._id);
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
          <Draggable key={column._id}>
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
          <i className="fa fa-plus"></i>Add Another Column
        </div>
      )}
    </div>
  );
};

export default BoardContent;
