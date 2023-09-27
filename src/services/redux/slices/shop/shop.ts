import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchShop } from './shopAPI';

export interface IShop {
    store: string,
    city: string,
    division: string,
    type_format: number,
    loc: number,
    size: number,
    is_active: boolean
}

interface IShopState {
  data: IShop[];
}

export const getShopApi = createAsyncThunk(
  '@@shop/shop',
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await fetchShop();
      return fulfillWithValue(response);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  },
);

const initialState: IShopState = {
  data: [],
};

const shopSlice = createSlice({
  name: '@@shop',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getShopApi.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const shopsReduser = shopSlice.reducer;

export const shopSelect = (state: { shops: IShopState }) => state.shops.data;