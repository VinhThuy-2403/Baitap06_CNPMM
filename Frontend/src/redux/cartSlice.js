import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCartAPI,
  addToCartAPI,
  updateCartItemAPI,
  removeFromCartAPI,
  clearCartAPI,
} from "../services/authService";

export const fetchCart = createAsyncThunk(
  "cart/fetch",
  async (_, thunkAPI) => {
    try {
      return await getCartAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/add",
  async ({ productId, quantity }, thunkAPI) => {
    try {
      await addToCartAPI(productId, quantity);
      return await getCartAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Thêm vào giỏ thất bại"
      );
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/update",
  async ({ cartItemId, quantity }, thunkAPI) => {
    try {
      await updateCartItemAPI(cartItemId, quantity);
      return await getCartAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async (cartItemId, thunkAPI) => {
    try {
      await removeFromCartAPI(cartItemId);
      return await getCartAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clear",
  async (_, thunkAPI) => {
    try {
      await clearCartAPI();
      return { items: [], total: 0, count: 0 };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    total: 0,
    count: 0,
    isLoading: false,
    error: null,
    isOpen: false,
  },
  reducers: {
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.isLoading = true;
      state.error = null;
    };
    const handleFulfilled = (state, action) => {
      state.isLoading = false;
      state.items = action.payload.items || [];
      state.total = action.payload.total || 0;
      state.count = action.payload.count || 0;
    };
    const handleRejected = (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    };

    builder
      .addCase(fetchCart.pending, handlePending)
      .addCase(fetchCart.fulfilled, handleFulfilled)
      .addCase(fetchCart.rejected, handleRejected)
      .addCase(addToCart.pending, handlePending)
      .addCase(addToCart.fulfilled, handleFulfilled)
      .addCase(addToCart.rejected, handleRejected)
      .addCase(updateCartItem.pending, handlePending)
      .addCase(updateCartItem.fulfilled, handleFulfilled)
      .addCase(updateCartItem.rejected, handleRejected)
      .addCase(removeFromCart.pending, handlePending)
      .addCase(removeFromCart.fulfilled, handleFulfilled)
      .addCase(removeFromCart.rejected, handleRejected)
      .addCase(clearCart.pending, handlePending)
      .addCase(clearCart.fulfilled, handleFulfilled)
      .addCase(clearCart.rejected, handleRejected);
  },
});

export const { toggleCart, openCart, closeCart, clearError } = cartSlice.actions;
export default cartSlice.reducer;