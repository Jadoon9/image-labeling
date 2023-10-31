import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taxonomy: {
    projectName: "",
    options: [],
    question: "",
    referenceClass: "",
    labels: [],
    columns: 0,
    rows: 0,
  },
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    laoyoutRows: (state, action) => {
      state.taxonomy.rows = action.payload;
    },
    layoutCols: (state, action) => {
      state.taxonomy.columns = action.payload;
    },
    addName: (state, action) => {
      state.taxonomy.projectName = action.payload;
    },
    addOptions: (state, action) => {
      const newId =
        state.taxonomy.options.length > 0
          ? state.taxonomy.options[state.taxonomy.options.length - 1].id + 1
          : 1;
      const newItem = { id: newId, value: action.payload };
      state.taxonomy.options = [...state.taxonomy.options, newItem];
    },
    addLabels: (state, action) => {
      const newId =
        state.taxonomy.labels.length > 0
          ? state.taxonomy.labels[state.taxonomy.labels.length - 1].id + 1
          : 1;
      const newItem = { id: newId, value: action.payload };
      state.taxonomy.labels = [...state.taxonomy.labels, newItem];
    },
    deleteOption: (state, action) => {
      const idToDelete = action.payload;
      state.taxonomy.options = state.taxonomy.options.filter(
        (option) => option.id !== idToDelete
      );
    },

    deletLabel: (state, action) => {
      const idToDelete = action.payload;
      state.taxonomy.labels = state.taxonomy.labels.filter(
        (label) => label.id !== idToDelete
      );
    },
  },
});

export const {
  addName,
  laoyoutRows,
  layoutCols,
  addOptions,
  addLabels,
  deleteOption,
  deletLabel,
} = layoutSlice.actions;

export default layoutSlice.reducer;
