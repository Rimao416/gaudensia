import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../config";
import { dishes } from "../interface/dishes";
interface DishState {
  dishes: dishes[];
  loading: boolean;
  error: string | null;
}
const initialState: DishState = {
  dishes: [],
  loading: false,
  error: null,
};

export const getDishes = createAsyncThunk<dishes[]>(
  "dish/getDishes",
  async (_, thunkAPI) => {
    try {
      const response = await API.get("/dishes");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const dishSlice = createSlice({
  name: "dish",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDishes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDishes.fulfilled, (state, action) => {
        state.loading = false;
        state.dishes = action.payload;
      })
      .addCase(getDishes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong!";
      });
  },
});
export default dishSlice.reducer;
