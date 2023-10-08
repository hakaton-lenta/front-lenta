import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchShop } from './shopAPI';

export interface IShop {
  id: number;
  store: string;
  city: string;
  division: string;
  type_format: number;
  loc: number;
  size: number;
  is_active: boolean;
}

interface IShopState {
  data: IShop[];
}

export const getShopApi = createAsyncThunk(
  '@@shop/shop',
  async (
    arg: {
      token: string;
    },
    { fulfillWithValue, rejectWithValue },
  ) => {
    try {
      const { token } = arg;
      const response = await fetchShop(token);
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
