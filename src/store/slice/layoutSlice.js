import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rows: 0,
  columns: 0,
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    laoyoutRows: (state, action) => {
      state.rows = action.payload;
    },
    layoutCols: (state, action) => {
      state.columns = action.payload;
    },
  },
});

export const { laoyoutRows, layoutCols } = layoutSlice.actions;

export default layoutSlice.reducer;
