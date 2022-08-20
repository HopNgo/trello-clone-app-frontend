import IColumn from "interface/IColumn";

export default interface IBoard {
  _id: string;
  columnOrder: string[];
  columns: IColumn[];
}
