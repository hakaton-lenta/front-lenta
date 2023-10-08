import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSubcategories } from './subcategoriesAPI';

interface ISubcategory {
  id: number;
  subcat_id: string;
  cat_id: number;
}

interface ISubcategories {
  id: number;
  cat_id: string;
  group_id: number;
  subcategories: ISubcategory[];
}

interface ISubcategoriesData {
  categories: ISubcategories[];
}

interface ISubcategoriesState {
  data: ISubcategoriesData[];
}

export const getSubcategoriesApi = createAsyncThunk(
  '@@subcategories/subcategories',
  async (
    arg: {
      categoriesId: number;
      groupsId: number;
      storeId: number;
      token: string;
    },
    { fulfillWithValue, rejectWithValue },
  ) => {
    try {
      const { categoriesId, groupsId, storeId, token } = arg;
      const response = await fetchSubcategories(
        categoriesId,
        groupsId,
        storeId,
        token,
      );
      return fulfillWithValue(response);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  },
);

const initialState: ISubcategoriesState = {
  data: [],
};

const subcategoriesSlice = createSlice({
  name: '@@subcategories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSubcategoriesApi.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const subcategoriesReduser = subcategoriesSlice.reducer;

export const subcategoriesSelect = (state: {
  subcategories: ISubcategoriesState;
}) => {
  const subcategoriesData =
    state.subcategories.data[0]?.categories[0]?.subcategories;
  return subcategoriesData ? subcategoriesData : [];
};
