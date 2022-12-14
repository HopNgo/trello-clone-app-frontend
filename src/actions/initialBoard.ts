import IBoard from "interface/IBoard";

export const initialBoard: IBoard = {
  _id: "",
  columnOrder: [""],
  title: "",
  cover: "",
  createdAt: 0,
  updatedAt: 0,
  _destroy: false,
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
