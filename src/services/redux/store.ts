import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './slices/categories/categories';

export const store = configureStore({
  reducer: {
    data: categoriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

