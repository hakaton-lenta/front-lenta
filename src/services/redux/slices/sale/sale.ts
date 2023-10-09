import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSale } from './saleAPI';

interface ISaleData {
  date: string;
  pr_sales_in_units: number;
}

interface ISaleProduct {
  id: number;
  pr_sku_id: string;
  pr_uom_id: string;
  sales: ISaleData[];
}

interface ISaleStore {
  id: number;
  st_id: string;
  products: ISaleProduct[];
}

interface SaleState {
  data: ISaleStore[];
}

export const getSaleApi = createAsyncThunk(
  '@@sale/sale',
  async (
    arg: {
      skuId: number;
      date: string;
      storeId: number;
      time: string;
      token: string;
    },
    { fulfillWithValue, rejectWithValue },
  ) => {
    try {
      const { skuId, date, storeId, time, token } = arg;
      const response = await fetchSale(skuId, date, storeId, time, token);
      return fulfillWithValue(response);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  },
);

const initialState: SaleState = {
  data: [],
};

export const saleSlice = createSlice({
  name: '@@sale',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSaleApi.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const saleReduser = saleSlice.reducer;

export const saleSelect = (state: { sale: SaleState }) => state.sale.data;
