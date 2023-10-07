import { createSlice } from '@reduxjs/toolkit';

interface IFilterTk {
  id: number;
  store: string;
}

interface IFilterGroup {
  id: number;
  groupId: string;
}

interface IFilterCategories {
  id: number;
  catId: string;
}

interface IFilterSubcategories {
  id: number;
  subcatId: string;
}

interface ISku {
  id: number;
  skuId: string;
}

interface IFilter {
  tk: IFilterTk;
  group: IFilterGroup;
  category: IFilterCategories;
  subcategory: IFilterSubcategories;
  sku: ISku;
  period: string;
  selectedDate: string;
}

const initialState: IFilter = {
  tk: {
    id: 0,
    store: '',
  },
  group: {
    id: 0,
    groupId: '',
  },
  category: {
    id: 0,
    catId: '',
  },
  subcategory: {
    id: 0,
    subcatId: '',
  },
  sku: {
    id: 0,
    skuId: '',
  },
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
    setSubcategory: (state, action) => {
      state.subcategory = action.payload;
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
  setSubcategory,
  setSku,
  setPeriod,
  setSelectedDate,
} = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
