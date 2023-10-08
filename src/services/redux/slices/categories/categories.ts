import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCategories } from './categoriesAPI';

interface IСategory {
  id: number;
  cat_id: string;
  group_id: number;
}

interface IСategories {
  id: number;
  categories: IСategory[];
}

interface IСategoriesData {
  groups: IСategories[];
}

interface IСategoriesState {
  data: IСategoriesData[];
}

export const getСategoriesApi = createAsyncThunk(
  '@@categories/categories',
  async (
    arg: { groupsId: number; storeId: number; token: string },
    { fulfillWithValue, rejectWithValue },
  ) => {
    try {
      const { groupsId, storeId, token } = arg;
      const response = await fetchCategories(groupsId, storeId, token);
      return fulfillWithValue(response);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  },
);

const initialState: IСategoriesState = {
  data: [],
};

const categoriesSlice = createSlice({
  name: '@@categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getСategoriesApi.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const categoriesReduser = categoriesSlice.reducer;

export const categoriesSelect = (state: { categories: IСategoriesState }) => {
  const categoriesData = state.categories.data[0]?.groups[0]?.categories;
  return categoriesData ? categoriesData : [];
};
