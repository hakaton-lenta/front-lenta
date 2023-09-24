import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCategory } from './categoriesAPI';

interface IProduct {
    sku: string,
    group: string,
    category: string,
    subcategory: string,
    uom: number
}

interface CategoriesState {
    data: IProduct[]
}

export const getCategoryApi = createAsyncThunk(
	'@@category/category',
	async (_, { fulfillWithValue, rejectWithValue }) => {
		try {
			const response = await fetchCategory();
			return fulfillWithValue(response);
		} catch (error: unknown) {
			return rejectWithValue(error);
		}
	}
);

const initialState: CategoriesState = {
    data: [],
};

const categoriesSlice = createSlice({
    name: '@@category',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getCategoryApi.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    },
});

export default categoriesSlice.reducer;