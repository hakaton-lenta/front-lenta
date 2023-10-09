import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPredict } from './predictAPI';

interface ISaleData {
  date: string;
  target: number;
}

interface IPredictProduct {
  id: number;
  pr_sku_id: string;
  pr_uom_id: string;
  predict: ISaleData[];
}

interface ISaleStore {
  id: number;
  st_id: string;
  product: IPredictProduct;
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
