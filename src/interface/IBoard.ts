import IColumn from "./IColumn";

export default interface IBoard {
  id: string;
  columnOrder: string[];
  columns: IColumn[];
}
