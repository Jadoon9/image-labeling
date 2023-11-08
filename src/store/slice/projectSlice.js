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
    changeCheckBox: (state, action) => {
      const { currentCaseIndex, catIdx, optIdx } = action.payload;
      const categoryType =
        state.projectData.session[0].case[currentCaseIndex].category_type;
      const currentOption = categoryType[catIdx].options[optIdx];
      currentOption.checked = !currentOption.checked; // Toggle the boolean value
    },
    replaceLabels: (state, action) => {
      const { currentCaseIndex, distributedLabels } = action.payload;
      if (
        state.projectData.session[0].case[currentCaseIndex]?.newLabels?.length
      ) {
        return;
      } else {
        state.projectData.session[0].case[currentCaseIndex].newLabels = [];
        state.projectData.session[0].case[currentCaseIndex].newLabels =
          distributedLabels;
      }
    },
    changeLabelCheckBox: (state, action) => {
      const { rowIndex, labelIdx, currentCaseIndex } = action.payload;
      state.projectData.session[0].case[currentCaseIndex].newLabels[rowIndex][
        labelIdx
      ].checked =
        !state.projectData.session[0].case[currentCaseIndex].newLabels[
          rowIndex
        ][labelIdx].checked;
    },
  },
});

export const {
  addProject,
  addProjectList,
  addSidebarProjectList,
  changeCheckBox,
  replaceLabels,
  changeLabelCheckBox,
} = projectSlice.actions;

export default projectSlice.reducer;
