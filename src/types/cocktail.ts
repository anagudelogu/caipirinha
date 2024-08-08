/* eslint-disable @typescript-eslint/no-explicit-any */
export type CocktailApiResponse = {
  drinks: DrinkApi[];
};

export type DetailedCocktailApiResponse = {
  drinks: DetailedDrinkApi[];
};

export type DrinkApi = {
  strDrink: string;
  strDrinkThumb: string;
  idDrink: string;
};

export type DetailedDrinkApi = DrinkApi & {
  strDrinkAlternate: any;
  strTags: any;
  strVideo: any;
  strCategory: string;
  strIBA: any;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strInstructionsES: any;
  strInstructionsDE: string;
  strInstructionsFR: any;
  strInstructionsIT: string;
  'strInstructionsZH-HANS': any;
  'strInstructionsZH-HANT': any;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: any;
  strIngredient6: any;
  strIngredient7: any;
  strIngredient8: any;
  strIngredient9: any;
  strIngredient10: any;
  strIngredient11: any;
  strIngredient12: any;
  strIngredient13: any;
  strIngredient14: any;
  strIngredient15: any;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: any;
  strMeasure6: any;
  strMeasure7: any;
  strMeasure8: any;
  strMeasure9: any;
  strMeasure10: any;
  strMeasure11: any;
  strMeasure12: any;
  strMeasure13: any;
  strMeasure14: any;
  strMeasure15: any;
  strImageSource: any;
  strImageAttribution: any;
  strCreativeCommonsConfirmed: string;
  dateModified: string;
};

export type Drink = {
  id: string;
  name: string;
  image: string;
};

export type DetailedDrink = Drink & {
  instructions: string;
  ingredients: string[];
  alcoholic: boolean;
};

export function mapDrinkApiToDrink(drinkApi: DrinkApi): Drink {
  return {
    id: drinkApi.idDrink,
    name: drinkApi.strDrink,
    image: drinkApi.strDrinkThumb,
  };
}

export function mapDetailedDrinkApiToDetailedDrink(
  drinkApi: DetailedDrinkApi
): DetailedDrink {
  return {
    id: drinkApi.idDrink,
    name: drinkApi.strDrink,
    image: drinkApi.strDrinkThumb,
    instructions: drinkApi.strInstructions,
    ingredients: [
      drinkApi.strIngredient1,
      drinkApi.strIngredient2,
      drinkApi.strIngredient3,
      drinkApi.strIngredient4,
      drinkApi.strIngredient5,
      drinkApi.strIngredient6,
      drinkApi.strIngredient7,
      drinkApi.strIngredient8,
      drinkApi.strIngredient9,
      drinkApi.strIngredient10,
      drinkApi.strIngredient11,
      drinkApi.strIngredient12,
      drinkApi.strIngredient13,
      drinkApi.strIngredient14,
      drinkApi.strIngredient15,
    ].filter(Boolean),
    alcoholic: drinkApi.strAlcoholic === 'Alcoholic',
  };
}
