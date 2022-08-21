import IColumn from "interface/ICoLumn";

export default interface IBoard {
  _id: string;
  columnOrder: string[];
  columns: IColumn[];
  title: string;
}
