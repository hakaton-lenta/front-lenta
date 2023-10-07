import { configureStore } from '@reduxjs/toolkit';
import { categoriesReduser } from './slices/categories/categories';
import { shopsReduser } from './slices/shop/shop';
import { authReducer } from './slices/auth/auth';
import { filterReducer } from './slices/filter/filter';
import { saleReduser } from './slices/sale/sale';
import { groupsReduser } from './slices/groups/groups';
import { subcategoriesReduser } from './slices/subcategories/subcategories';
import { skuReduser } from './slices/sku/sku';

export const store = configureStore({
  reducer: {
    shops: shopsReduser,
    user: authReducer,
    filter: filterReducer,
    sale: saleReduser,
    groups: groupsReduser,
    categories: categoriesReduser,
    subcategories: subcategoriesReduser,
    sku: skuReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
