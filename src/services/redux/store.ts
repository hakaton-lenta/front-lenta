import { configureStore } from '@reduxjs/toolkit';
import { categoriesReduser } from './slices/categories/categories';
import { shopsReduser } from './slices/shop/shop';
import { authReducer } from './slices/auth/auth';

export const store = configureStore({
  reducer: {
    category: categoriesReduser,
    shops: shopsReduser,
    user: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
