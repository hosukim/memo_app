import { createSlice } from "@reduxjs/toolkit";

type HistoryType = {
  id: number;
};

const initialState: HistoryType[] = [];

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
});

export const {} = historySlice.actions;
