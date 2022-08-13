import IBoard from "interface/IBoard";
import ICard from "interface/ICard";
import IColumn from "interface/ICoLumn";

const card1: ICard = {
  id: "card-1",
  boardId: "board-1",
  columnId: "column-1",
  title: "Title of card 1",
  cover: null,
};
const card2: ICard = {
  id: "card-2",
  boardId: "board-1",
  columnId: "column-1",
  title: "Title of card 2",
  cover: null,
};
const card3: ICard = {
  id: "card-3",
  boardId: "board-1",
  columnId: "column-1",
  title: "Title of card 3",
  cover: null,
};
const card4: ICard = {
  id: "card-4",
  boardId: "board-1",
  columnId: "column-1",
  title: "Title of card 4",
  cover: null,
};
const card5: ICard = {
  id: "card-5",
  boardId: "board-1",
  columnId: "column-1",
  title: "Title of card 5",
  cover: null,
};
const card6: ICard = {
  id: "card-6",
  boardId: "board-1",
  columnId: "column-1",
  title: "Title of card 6",
  cover: null,
};
const card7: ICard = {
  id: "card-7",
  boardId: "board-1",
  columnId: "column-1",
  title: "Title of card 7",
  cover: null,
};
const card8: ICard = {
  id: "card-8",
  boardId: "board-1",
  columnId: "column-2",
  title: "Title of card 8",
  cover:
    "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/1ad37e8dd3ea4daaba41ad52007a0432_9366/Giay_Response_Super_2.0_Xam_H02020_01_standard.jpg",
};
const card9: ICard = {
  id: "card-9",
  boardId: "board-1",
  columnId: "column-2",
  title: "Title of card 9",
  cover: null,
};

const card10: ICard = {
  id: "card-10",
  boardId: "board-1",
  columnId: "column-2",
  title: "Title of card 10",
  cover:
    "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/1ad37e8dd3ea4daaba41ad52007a0432_9366/Giay_Response_Super_2.0_Xam_H02020_01_standard.jpg",
};
const card11: ICard = {
  id: "card-11",
  boardId: "board-1",
  columnId: "column-3",
  title: "Title of card 11",
  cover: null,
};
const card12: ICard = {
  id: "card-12",
  boardId: "board-1",
  columnId: "column-3",
  title: "Title of card 12",
  cover:
    "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/1ad37e8dd3ea4daaba41ad52007a0432_9366/Giay_Response_Super_2.0_Xam_H02020_01_standard.jpg",
};
const card13: ICard = {
  id: "card-13",
  boardId: "board-1",
  columnId: "column-3",
  title: "Title of card 13",
  cover: null,
};

const column1: IColumn = {
  id: "column-1",
  boardId: "board-1",
  title: "To do Column",
  cardOrder: [
    "card-1",
    "card-2",
    "card-3",
    "card-4",
    "card-5",
    " card-6",
    "card-7",
  ],
  cards: [card1, card2, card3, card4, card5, card6, card7],
};
const column2: IColumn = {
  id: "column-2",
  boardId: "board-1",
  title: "Inprogress Column",
  cardOrder: ["card-9", "card-10", "card-8"],
  cards: [card8, card9, card10],
};
const column3: IColumn = {
  id: "column-3",
  boardId: "board-1",
  title: "Done Column",
  cardOrder: ["card-11", "card-12", "card-13"],
  cards: [card11, card12, card13],
};

const board: IBoard = {
  id: "board-1",
  columnOrder: ["column-1", "column-2", "column-3"],
  columns: [column1, column2, column3],
};

export const initalData = {
  boards: [board],
};
