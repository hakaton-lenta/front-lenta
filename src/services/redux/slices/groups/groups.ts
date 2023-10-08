import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGroups } from './groupsAPI';

interface IGroups {
  id: number;
  group_id: string;
}

export interface IGroup {
  id: number;
  st_id: string;
  groups: IGroups[];
}

interface IGroupsState {
  data: IGroup[];
}

export const getGroupsApi = createAsyncThunk(
  '@@groups/groups',
  async (
    arg: { storeId: number; token: string },
    { fulfillWithValue, rejectWithValue },
  ) => {
    try {
      const { storeId, token } = arg;
      const response = await fetchGroups(storeId, token);
      return fulfillWithValue(response);
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  },
);

const initialState: IGroupsState = {
  data: [],
};

const groupsSlice = createSlice({
  name: '@@groups',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGroupsApi.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const groupsReduser = groupsSlice.reducer;

export const groupsSelect = (state: { groups: IGroupsState }) => {
  const groupsData = state.groups.data[0];
  return groupsData ? groupsData.groups : [];
};
