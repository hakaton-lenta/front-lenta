import { configureStore } from '@reduxjs/toolkit';
import { categoriesReduser } from './slices/categories/categories';
import { shopsReduser } from './slices/shop/shop';
import { authReducer } from './slices/auth/auth';
import { filterReducer } from './slices/filter/filter';
import { saleReduser } from './slices/sale/sale';

export const store = configureStore({
  reducer: {
    category: categoriesReduser,
    shops: shopsReduser,
    user: authReducer,
    filter: filterReducer,
    sale: saleReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
