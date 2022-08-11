import IColumn from "./ICoLumn";

export default interface IBoard {
  id: string;
  columnOrder: string[];
  columns: IColumn[];
}
