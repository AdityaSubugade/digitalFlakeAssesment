import { configureStore } from "@reduxjs/toolkit";
import logoutModalReducer from "./reducers/logoutModalSlice";
import categoriesReducer from "./reducers/categorySlice";
import subcategoryReducer from "./reducers/subCategorySlice";
import productReducer from "./reducers/productSlice";

export const store = configureStore({
  reducer: {
    logoutModal: logoutModalReducer,
    categories: categoriesReducer,
    subcategory: subcategoryReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
