import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taxonomy: {
    projectName: "",
    options: [],
    question: "",
    referenceClass: "",
    label: [],
    columns: 0,
    rows: 0,
    notes: "",
    randomizeCases: false,
    randomizeCat: false,
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
    addTaxonomyName: (state, action) => {
      console.log("action data", action.payload);
      state.taxonomy[action.payload.name] = action.payload.value;
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
        state.taxonomy.label.length > 0
          ? state.taxonomy.label[state.taxonomy.label.length - 1].id + 1
          : 1;
      const newItem = { id: newId, value: action.payload };
      state.taxonomy.label = [...state.taxonomy.label, newItem];
    },
    deleteOption: (state, action) => {
      const idToDelete = action.payload;
      state.taxonomy.options = state.taxonomy.options.filter(
        (option) => option.id !== idToDelete
      );
    },

    deleteLabel: (state, action) => {
      const idToDelete = action.payload;
      state.taxonomy.label = state.taxonomy.label.filter(
        (label) => label.id !== idToDelete
      );
    },
  },
});

export const {
  addTaxonomyName,
  laoyoutRows,
  layoutCols,
  addOptions,
  addLabels,
  deleteOption,
  deleteLabel,
} = layoutSlice.actions;

export default layoutSlice.reducer;
