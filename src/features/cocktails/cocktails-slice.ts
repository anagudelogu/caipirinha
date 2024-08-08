import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  CocktailApiResponse,
  DetailedCocktailApiResponse,
  DetailedDrink,
  Drink,
  mapDetailedDrinkApiToDetailedDrink,
  mapDrinkApiToDrink,
} from '../../types/cocktail';

export interface CocktailState {
  value: Drink[];
  status: 'idle' | 'loading' | 'failed' | 'succeeded';
  cocktailDetails: DetailedDrink | null;
  detailsStatus: 'idle' | 'loading' | 'failed';
}

const initialState: CocktailState = {
  value: [],
  status: 'idle',
  cocktailDetails: null,
  detailsStatus: 'idle',
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

export const fetchCocktailById = createAsyncThunk(
  'cocktails/fetchCocktailById',
  async (id: string) => {
    const response = await axios.get<DetailedCocktailApiResponse>(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    );

    const data = mapDetailedDrinkApiToDetailedDrink(response.data.drinks[0]);

    return data;
  }
);

export const cocktailsSlice = createSlice({
  name: 'cocktails',
  initialState,
  reducers: {
    clearCocktailDetails: (state) => {
      state.cocktailDetails = null;
    },
  },
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
      })
      .addCase(fetchCocktailById.pending, (state) => {
        state.detailsStatus = 'loading';
      })
      .addCase(fetchCocktailById.fulfilled, (state, action) => {
        state.detailsStatus = 'idle';
        state.cocktailDetails = action.payload;
      })
      .addCase(fetchCocktailById.rejected, (state) => {
        state.detailsStatus = 'failed';
      });
  },
});

export default cocktailsSlice.reducer;

export const { clearCocktailDetails } = cocktailsSlice.actions;

export const selectCocktails = (state: { cocktails: CocktailState }) =>
  state.cocktails.value;
export const selectCocktailsStatus = (state: { cocktails: CocktailState }) =>
  state.cocktails.status;
export const selectCocktailDetails = (state: { cocktails: CocktailState }) =>
  state.cocktails.cocktailDetails;
export const selectCocktailDetailsStatus = (state: {
  cocktails: CocktailState;
}) => state.cocktails.detailsStatus;
