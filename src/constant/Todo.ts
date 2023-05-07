type TodoType = {
  id: number;
  content: string;
  dttm?: Date;
  showFlag?: boolean;
  key?: string;
  showOrder?: number;
};

type TodoOrderType = {
  id: number;
  todo_id: number;
  order_index: number;
};