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
    rowlist: [],
    columnlist: [],
  },
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    addTaxonomyData: (state, action) => {
      const { name, value, index } = action.payload;
      console.log("action data", action.payload);
      if (name === "columns" || name === "rows") {
        const field = name === "columns" ? "columnlist" : "rowlist";
        if (
          Array.isArray(state.taxonomy[field]) &&
          state.taxonomy[field]?.length
        ) {
          state.taxonomy[field].length = value;
        } else {
          state.taxonomy[field] = Array.from({ length: value }, () => "");
        }
      }
      if (name === "columnlist" || name === "rowlist") {
        state.taxonomy[name][index] = value;
      } else {
        state.taxonomy[name] = value;
      }
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
  addTaxonomyData,
  addOptions,
  addLabels,
  deleteOption,
  deleteLabel,
} = layoutSlice.actions;

export default layoutSlice.reducer;
