import { createSlice } from "@reduxjs/toolkit";

type MemoType = {
  id: number;
  content: string;
  showFlag: boolean;
  showOrder: number;
};

const initialState: MemoType[] = [];

export const memoSlice = createSlice({
  name: "memo",
  initialState,
  reducers: {
    
  },
});

export const {} = memoSlice.actions;
