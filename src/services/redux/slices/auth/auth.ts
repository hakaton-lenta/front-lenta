import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, logout, getuser, register } from './authAPI';

export interface IUser {
  email: string;
  refreshToken: string;
  accessToken: string;
}

interface IAuthState {
  user: IUser | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  error: string | null;
}

export const loginUser = createAsyncThunk(
  '@@auth/login',
  async (
    payload: { email: string; password: string },
    { fulfillWithValue, rejectWithValue },
  ) => {
    try {
      const response = await login(payload.email, payload.password);
      return fulfillWithValue(response);
    } catch (error: unknown) {
      return rejectWithValue({ error: 'Failed to login' }); // Возвращаем объект с ошибкой
    }
  },
);

export const logoutUser = createAsyncThunk(
  '@@auth/logout',
  async (
    payload: { access: string; refresh: string },
    { fulfillWithValue, rejectWithValue },
  ) => {
    try {
      const response = await logout(payload.access, payload.refresh);
      return fulfillWithValue(response);
    } catch (error: unknown) {
      return rejectWithValue({ error: 'Failed to logout' }); // Возвращаем объект с ошибкой
    }
  },
);

export const getProfileUser = createAsyncThunk(
  '@@auth/getUser',
  async (
    payload: { access: string },
    { fulfillWithValue, rejectWithValue },
  ) => {
    try {
      const response = await getuser(payload.access);
      return fulfillWithValue(response);
    } catch (error: unknown) {
      return rejectWithValue({ error: 'Failed to get user' }); // Возвращаем объект с ошибкой
    }
  },
);

export const registerUser = createAsyncThunk(
  '@@auth/register',
  async (
    payload: { email: string; password: string },
    { fulfillWithValue, rejectWithValue },
  ) => {
    try {
      const response = await register(payload.email, payload.password);
      return fulfillWithValue(response);
    } catch (err: unknown) {
      console.log(err);
      return rejectWithValue({ error: 'Failed to register user' }); // Возвращаем объект с ошибкой
    }
  },
);

const initialState: IAuthState = {
  user: null,
  isLoading: true,
  isLoggedIn: false,
  error: null,
};

const authSlice = createSlice({
  name: '@@auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        // state.isLoading = true;
        state.isLoggedIn = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        localStorage.setItem('accessToken', action.payload.access);
        localStorage.setItem('refreshToken', action.payload.refresh);
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.error = action.error.message as string;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.isLoggedIn = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        state.isLoading = false;
        state.isLoggedIn = false;
        console.log(action);
        // state.user = action.payload;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        state.isLoading = false;
        state.isLoggedIn = false;
        state.error = action.error.message as string;
      })
      .addCase(registerUser.pending, (state) => {
        // state.isLoading = true;
        console.log(state);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        // state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        // state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getProfileUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfileUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(getProfileUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const authReducer = authSlice.reducer;

export const selectUser = (state: { auth: IAuthState }) => state.auth.user;
export const selectLoggedIn = (state: { auth: IAuthState }) =>
  state.auth.isLoggedIn;
export const selectLoading = (state: { auth: IAuthState }) =>
  state.auth.isLoading;
export const selectError = (state: { auth: IAuthState }) => state.auth.error;

export const getToken = (state: { auth: IAuthState }) =>
  state.auth.user?.accessToken;
