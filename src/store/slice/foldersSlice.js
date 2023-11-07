import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  foldersList: [],
};

export const folderSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    addFolders: (state, action) => {
      state.foldersList = action.payload;
    },
    resetFolders: (state, action) => {
      state.foldersList = [];
    },
  },
});

export const { addFolders, resetFolders } = folderSlice.actions;

export default folderSlice.reducer;
