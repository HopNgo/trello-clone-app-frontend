import ICard from "./ICard";

export default interface IColumn {
  id: string;
  boardId: string;
  title: string;
  cardOrder: string[];
  cards: ICard[];
}