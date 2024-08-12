export type User = {
  id: string;
  email: string;
  given_name: string;
  family_name: string;
  picture: string;
  favoriteCocktails: string[];
};

export type FavoritesApiResponse = {
  favorites: {
    id: string;
    userId: string;
    productId: string;
  }[];
  message: string;
};

export function fromFavoritesApiToFavorites(
  favorites: FavoritesApiResponse
): string[] {
  return favorites.favorites.map((favorite) => favorite.productId);
}
