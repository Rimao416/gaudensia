import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../config";
import { testimonial } from "../interface/testimonial";
interface TestimonialState {
  testimonials: testimonial[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: TestimonialState = {
  testimonials: [],
  loading: false,
  error: null,
};

export const getTestimonials = createAsyncThunk<testimonial[]>(
  "category/getTestimonials",
  async (_, thunkAPI) => {
    try {
      const response = await API.get("/testimonials")
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const testimonialSlice = createSlice({
  name: "testimonial",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials = action.payload;
      })
      .addCase(getTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default testimonialSlice.reducer;
