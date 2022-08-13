import IBoard from "interface/IBoard";

export const initialBoard: IBoard = {
  id: "",
  columnOrder: [""],
  columns: [
    {
      id: "",
      boardId: "",
      title: "",
      cardOrder: [""],
      cards: [
        {
          id: "",
          boardId: "",
          columnId: "",
          title: "",
          cover: null,
        },
      ],
    },
  ],
};
