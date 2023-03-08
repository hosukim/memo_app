type SQLiteResponseType = {
  rowsAffected: number;
  rows: RowsType;
};

type RowsType = {
  _array: Array<TodoType>;
  length: number;
};
