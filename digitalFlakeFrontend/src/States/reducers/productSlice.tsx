/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductState } from "../../interface/interface";

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchProductData = createAsyncThunk(
  "product/fetchProductData",

  async (search: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:3000/products/get-product?search=${search}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        return data.data;
      } else {
        throw new Error("Failed to fetch subcategories");
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export default productSlice.reducer;
