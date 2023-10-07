import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSku } from './skuAPI';

interface ISku {
  id: number;
  pr_sku_id: string;
}

interface ISkuState {
  data: ISku[];
}

export const getSkuApi = createAsyncThunk(
  '@@sku/sku',
  async (
    arg: {
      categoriesId: number;
      groupId: number;
      storeId: number;
      subcategoriesId: number;
    },
    { fulfillWithValue, rejectWithValue },
  ) => {
    try {
      const { categoriesId, groupId, storeId, subcategoriesId } = arg;
      const response = await fetchSku(
        categoriesId,
        groupId,
        storeId,
        subcategoriesId,
      );
      return fulfillWithValue(response);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  },
);

const initialState: ISkuState = {
  data: [],
};

const skuSlice = createSlice({
  name: '@@sku',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSkuApi.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const skuReduser = skuSlice.reducer;

export const skuSelect = (state: { sku: ISkuState }) => state.sku.data;
