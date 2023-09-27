import { configureStore } from '@reduxjs/toolkit';
import { categoriesReduser } from './slices/categories/categories';
import { shopsReduser } from './slices/shop/shop';

export const store = configureStore({
  reducer: {
    category: categoriesReduser,
    shops: shopsReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
