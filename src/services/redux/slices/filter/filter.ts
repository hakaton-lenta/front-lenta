import { createSlice } from '@reduxjs/toolkit';

interface IFilter {
  tk: string[],
  group: string[],
  category: string[],
  subcategories: string[],
  sku: string[],
  period: string,
  selectedDate: string,
}

const initialState: IFilter = {
  tk: [],
  group: [],
  category: [],
  subcategories: [],
  sku: [],
  period: '',
  selectedDate: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setTk: (state, action) => {
      state.tk = action.payload;
    },
    setGroup: (state, action) => {
      state.group = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSubcategories: (state, action) => {
      state.subcategories = action.payload;
    },
    setSku: (state, action) => {
      state.sku = action.payload;
    },
    setPeriod: (state, action) => {
      state.period = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
  },
});

export const {
  setTk,
  setGroup,
  setCategory,
  setSubcategories,
  setSku,
  setPeriod,
  setSelectedDate,
} = filterSlice.actions;

export const filterReducer = filterSlice.reducer;