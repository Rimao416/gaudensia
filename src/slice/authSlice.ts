import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { API } from "../config";
import { user } from "../interface/user";

interface AuthState {
  user: user | null;
  loading: boolean;
  errors: {
    [key: string]: string | null;
  } | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  errors: {
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
  },
};

export const sign = createAsyncThunk<user, Partial<user>>(
  "auth/sign",
  async (user, thunkAPI) => {
    API.defaults.withCredentials = true;
    try {
      const response = await API.post("/auth/sign", user);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const login = createAsyncThunk<user, Partial<user>>(
  "auth/login",
  async (user, thunkAPI) => {
    API.defaults.withCredentials = true;
    try {
      const response = await API.post("/auth/login", user);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserData = createAsyncThunk<user, Partial<user>>(
  "auth/getUserData",
  async (_, thunkAPI) => {
    const token = Cookies.get("token");
    API.defaults.withCredentials = true;
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const response = await API.get("/user");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<Partial<user>>) => {
      state.user = { ...state.user, ...action.payload } as user;
    },
    setErrors: (
      state,
      action: PayloadAction<{ [key: string]: string | null }>
    ) => {
      state.errors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sign.pending, (state) => {
        state.loading = true;
        // state.error = null;
      })
      .addCase(sign.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(sign.rejected, (state) => {
        state.loading = false;
        // state.error = action.error.message || "Something went wrong";
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setCredentials, setErrors } = authSlice.actions;

export default authSlice.reducer;
