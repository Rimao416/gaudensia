import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../config";
import { user } from "../interface/user";

interface AuthState {
  user: user | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const sign = createAsyncThunk<user, user>(
  "auth/sign",
  async (user, thunkAPI) => {
    try {
      const response = await API.post("/auth/signup", user);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sign.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(sign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default authSlice.reducer;
