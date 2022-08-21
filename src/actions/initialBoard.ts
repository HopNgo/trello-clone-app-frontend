import IBoard from "interface/IBoard";

export const initialBoard: IBoard = {
  _id: "",
  columnOrder: [""],
  title: "",
  columns: [
    {
      _id: "",
      boardId: "",
      title: "",
      cardOrder: [""],
      cards: [
        {
          _id: "",
          boardId: "",
          columnId: "",
          title: "",
          cover: null,
        },
      ],
    },
  ],
};
