export interface TableRow {
  id: number;
  title: string;
  isTitleDisabled: boolean;
  values: {
    id: number;
    value: string;
    elementType: string;
    isEditable: boolean;
  }[];
}
  
  export interface TableData {
    rows: TableRow[];
  }
