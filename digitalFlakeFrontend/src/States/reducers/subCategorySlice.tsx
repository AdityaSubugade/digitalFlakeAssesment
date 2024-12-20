/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SubcategoryState } from "../../interface/interface";

const initialState: SubcategoryState = {
  subcategories: [],
  loading: false,
  error: null,
};

export const fetchSubcategories = createAsyncThunk(
  "subcategory/fetchSubcategories",
  async (search: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:3000/subcategory/get-subcategories?search=${search}`,
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

const subcategorySlice = createSlice({
  name: "subcategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubcategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubcategories.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategories = action.payload;
        state.error = null;
      })
      .addCase(fetchSubcategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default subcategorySlice.reducer;
