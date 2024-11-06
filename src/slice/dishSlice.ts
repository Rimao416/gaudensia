import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../config";
import { dishes } from "../interface/dishes";

interface CategoryWithDishes {
  category: {
    _id: string;
    name: string;
  };
  dishes: dishes[];
}
interface DishState {
  dishes: dishes[];
  categoriesWithDishes: CategoryWithDishes[];
  loading: boolean;
  error: string | null;
}
const initialState: DishState = {
  dishes: [],
  categoriesWithDishes: [],
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

export const fetchMenuByCategories = createAsyncThunk(
  "dishes/fetchMenuByCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/dishes/getMenuCategories");
      return response.data; // Assure-toi que la réponse soit dans le format attendu
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Erreur inconnue");
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
      })
      .addCase(fetchMenuByCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuByCategories.fulfilled, (state, action) => {

        state.loading = false;
        state.categoriesWithDishes = action.payload; // Mise à jour des catégories avec les plats
      })
      .addCase(fetchMenuByCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export default dishSlice.reducer;
