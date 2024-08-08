export type CocktailApiResponse = {
  drinks: DrinkApi[];
};

export type DrinkApi = {
  strDrink: string;
  strDrinkThumb: string;
  idDrink: string;
};

export type Drink = {
  id: string;
  name: string;
  image: string;
};

export function mapDrinkApiToDrink(drinkApi: DrinkApi): Drink {
  return {
    id: drinkApi.idDrink,
    name: drinkApi.strDrink,
    image: drinkApi.strDrinkThumb,
  };
}
