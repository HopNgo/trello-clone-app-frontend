import ICard from "interface/ICard";

export default interface IColumn {
  _id: string;
  boardId: string;
  title: string;
  cardOrder: string[];
  cards: ICard[];
}
