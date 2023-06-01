import { AnyAction, combineReducers } from "@reduxjs/toolkit";
import { memoSlice } from "./slice/Memo";
import { historySlice } from "./slice/History";

const reducer = combineReducers({
  memo: memoSlice.reducer,
  history: historySlice.reducer,
});

export default reducer;
