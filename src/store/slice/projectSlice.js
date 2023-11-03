import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectData: null,
  projectsList: [],
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.projectData = action.payload;
    },
    addProjectsList: (state, action) => {
      state.projectList = action.payload;
    },
  },
});

export const { addProject, addProjectsList } = projectSlice.actions;

export default projectSlice.reducer;
