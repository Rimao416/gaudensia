import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { category } from "../interface/category";
import { API } from "../config";
interface CategoryState {
  categories: category[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

export const getCategories = createAsyncThunk<category[]>(
  "category/getCategories",
  async (_, thunkAPI) => {
    try {
      const response = await API.get("/categories")
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default categorySlice.reducer;

