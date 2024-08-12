import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  FavoritesApiResponse,
  fromFavoritesApiToFavorites,
  User,
} from '../../types/user';
import axios from 'axios';

export interface UserState {
  value: User | null;
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
}

const initialState: UserState = {
  value: null,
  status: 'idle',
};

export const fetchUserFavoriteCocktails = createAsyncThunk(
  'user/fetchUserFavoriteCocktails',
  async (userId: string) => {
    const response = await axios.get<FavoritesApiResponse>(
      `https://caipirinha-back.onrender.com/favorites/${userId}`
    );

    const data = fromFavoritesApiToFavorites(response.data);

    return data;
  }
);

export const addFavoriteCocktail = createAsyncThunk(
  'user/addFavoriteCocktail',
  async (data: { userId: string; productId: string }, thunkApi) => {
    thunkApi.dispatch(addFavoriteOptimistic(data.productId));
    await axios.post('https://caipirinha-back.onrender.com/favorites', data);
    return data.productId;
  }
);

export const removeFavoriteCocktail = createAsyncThunk(
  'user/removeFavoriteCocktail',
  async (data: { userId: string; productId: string }, thunkApi) => {
    thunkApi.dispatch(removeFavoriteOptimistic(data.productId));
    await axios.delete(
      `https://caipirinha-back.onrender.com/favorites/${data.userId}/${data.productId}`
    );
    return data.productId;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
    clearUser: (state) => {
      state.value = null;
    },
    addFavoriteOptimistic: (state, action) => {
      if (!state.value) return;
      state.value = {
        ...state.value,
        favoriteCocktails: [...state.value.favoriteCocktails, action.payload],
      };
    },
    removeFavoriteOptimistic: (state, action) => {
      if (!state.value) return;
      state.value = {
        ...state.value,
        favoriteCocktails: state.value.favoriteCocktails.filter(
          (cocktail) => cocktail !== action.payload
        ),
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserFavoriteCocktails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserFavoriteCocktails.fulfilled, (state, action) => {
        if (!state.value) return;
        state.status = 'succeeded';
        state.value = { ...state.value, favoriteCocktails: action.payload };
      })
      .addCase(fetchUserFavoriteCocktails.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const {
  setUser,
  clearUser,
  addFavoriteOptimistic,
  removeFavoriteOptimistic,
} = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state: { user: UserState }) => state.user.value;
export const selectUserStatus = (state: { user: UserState }) =>
  state.user.status;
