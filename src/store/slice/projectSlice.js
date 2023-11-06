import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectData: null,
  projectList: [],
  sidebarProjectsList: [],
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.projectData = action.payload;
    },
    addProjectList: (state, action) => {
      state.projectList = action.payload;
    },
    addSidebarProjectList: (state, action) => {
      state.sidebarProjectsList = action.payload;
    },
    resetProject: (state, action) => {
      state.projectData = null;
    },
  },
});

export const { addProject, addProjectList, addSidebarProjectList } =
  projectSlice.actions;

export default projectSlice.reducer;
