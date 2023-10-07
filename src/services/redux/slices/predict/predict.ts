import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPredict } from './predictAPI';

interface ISaleData {
  date: string;
  pr_sales_in_units: number;
}

interface ISaleProduct {
  id: number;
  pr_sku_id: string;
  sales: ISaleData[];
}

interface ISaleStore {
  id: number;
  st_id: string;
  goods: ISaleProduct[];
}

interface SaleState {
  data: ISaleStore[];
}

export const getPredictApi = createAsyncThunk(
  '@@predict/predict',
  async (
    arg: {
      skuId: number;
      storeId: number;
      token: string;
    },
    { fulfillWithValue, rejectWithValue },
  ) => {
    try {
      const { skuId, storeId, token } = arg;
      const response = await fetchPredict(skuId, storeId, token);
      return fulfillWithValue(response);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  },
);

const initialState: SaleState = {
  data: [],
};

export const predictSlice = createSlice({
  name: '@@predict',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPredictApi.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const predictReduser = predictSlice.reducer;

export const predictSelect = (state: { predict: SaleState }) =>
  state.predict.data;
