import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  CocktailApiResponse,
  Drink,
  mapDrinkApiToDrink,
} from '../../types/cocktail';

export interface CocktailState {
  value: Drink[];
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
}

const initialState: CocktailState = {
  value: [],
  status: 'idle',
};

export const fetchCocktails = createAsyncThunk(
  'cocktails/fetchCocktails',
  async () => {
    const response = await axios.get<CocktailApiResponse>(
      'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail'
    );

    const data = response.data.drinks.map((drink) => mapDrinkApiToDrink(drink));
    return data;
  }
);

export const cocktailsSlice = createSlice({
  name: 'cocktails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCocktails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCocktails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.value = action.payload;
      })
      .addCase(fetchCocktails.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default cocktailsSlice.reducer;

export const selectCocktails = (state: { cocktails: CocktailState }) =>
  state.cocktails.value;
export const selectCocktailsStatus = (state: { cocktails: CocktailState }) =>
  state.cocktails.status;
