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
  },
});

export const { addFolders } = folderSlice.actions;

export default folderSlice.reducer;
