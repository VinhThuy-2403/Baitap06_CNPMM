import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getSaleProductsAPI,
  getNewProductsAPI,
  getBestSellerProductsAPI,
} from "../services/authService";

export const fetchSaleProducts = createAsyncThunk(
  "product/fetchSale",
  async ({ page, limit }, thunkAPI) => {
    try {
      return await getSaleProductsAPI(page, limit);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const fetchNewProducts = createAsyncThunk(
  "product/fetchNew",
  async ({ page, limit }, thunkAPI) => {
    try {
      return await getNewProductsAPI(page, limit);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const fetchBestSellerProducts = createAsyncThunk(
  "product/fetchBestSeller",
  async ({ page, limit }, thunkAPI) => {
    try {
      return await getBestSellerProductsAPI(page, limit);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    sale: { data: [], pagination: null, isLoading: false },
    newProducts: { data: [], pagination: null, isLoading: false },
    bestSeller: { data: [], pagination: null, isLoading: false },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSaleProducts.pending, (state) => {
        state.sale.isLoading = true;
      })
      .addCase(fetchSaleProducts.fulfilled, (state, action) => {
        state.sale.isLoading = false;
        state.sale.data = action.payload.data;
        state.sale.pagination = action.payload.pagination;
      })
      .addCase(fetchSaleProducts.rejected, (state) => {
        state.sale.isLoading = false;
      })
      .addCase(fetchNewProducts.pending, (state) => {
        state.newProducts.isLoading = true;
      })
      .addCase(fetchNewProducts.fulfilled, (state, action) => {
        state.newProducts.isLoading = false;
        state.newProducts.data = action.payload.data;
        state.newProducts.pagination = action.payload.pagination;
      })
      .addCase(fetchNewProducts.rejected, (state) => {
        state.newProducts.isLoading = false;
      })
      .addCase(fetchBestSellerProducts.pending, (state) => {
        state.bestSeller.isLoading = true;
      })
      .addCase(fetchBestSellerProducts.fulfilled, (state, action) => {
        state.bestSeller.isLoading = false;
        state.bestSeller.data = action.payload.data;
        state.bestSeller.pagination = action.payload.pagination;
      })
      .addCase(fetchBestSellerProducts.rejected, (state) => {
        state.bestSeller.isLoading = false;
      });
  },
});

export default productSlice.reducer;