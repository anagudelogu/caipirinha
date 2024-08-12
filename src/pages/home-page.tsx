import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchCocktails,
  selectCocktails,
  selectCocktailsStatus,
  selectIsFilteredByFavorites,
} from '../features/cocktails/cocktails-slice';
import Search from '../features/search/Search';
import { selectQuery } from '../features/search/search-slice';
import { useAuth0 } from '@auth0/auth0-react';
import { selectUser } from '../features/Auth/user-slice';
import FavoritesFilter from '../app/components/FavoritesFilter';
import CocktailCard from '../features/cocktails/CocktailCard';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectCocktails);
  const status = useAppSelector(selectCocktailsStatus);
  const query = useAppSelector(selectQuery);
  const { isAuthenticated } = useAuth0();
  const user = useAppSelector(selectUser);
  const isFilteredByFavorites = useAppSelector(selectIsFilteredByFavorites);

  const filteredCocktails = cocktails
    .filter((cocktail) =>
      cocktail.name.toLowerCase().includes(query.toLowerCase())
    )
    .filter((cocktail) => {
      if (!isFilteredByFavorites) return true;
      return cocktailIsFavorite(cocktail.id);
    });

  useEffect(() => {
    if (status === 'idle') dispatch(fetchCocktails());
  }, [dispatch, status]);

  function cocktailIsFavorite(cocktailId: string) {
    if (!user || !user.favoriteCocktails) return false;
    return user.favoriteCocktails.includes(cocktailId);
  }

  return (
    <>
      <div className='bg-base-100 text-base-content text-center py-8'>
        <h2 className='text-3xl font-bold md:text-4xl lg:text-5xl'>
          Welcome to Caipirinha
        </h2>
        {!isAuthenticated && (
          <p className='text-lg'>
            Please sign in to save your favorite drinks!
          </p>
        )}
        {isAuthenticated && user && (
          <p className='text-lg'>
            Enjoy your favorite drinks,{' '}
            <span className='text-primary'>{user.given_name}!</span>
          </p>
        )}
      </div>

      <div>
        <div className='flex items-center px-4 gap-2 mb-4 lg:mb-8'>
          <div className='flex-1 w-full flex items-center gap-1 lg:gap-3'>
            <h3 className='text-2xl font-bold text-base-content flex items-center gap-1 md:text-3xl'>
              Cocktails
            </h3>
            {isAuthenticated && <FavoritesFilter />}
          </div>
          <div className='flex-1 w-full'>
            <Search />
          </div>
        </div>
        {status === 'loading' || (status === 'idle' && <p>Loading...</p>)}

        {status === 'failed' && <p>Failed to load cocktails</p>}

        {status === 'succeeded' && (
          <ul className='grid grid-cols-2 items-center md:grid-cols-4 lg:grid-cols-5'>
            {filteredCocktails.map((cocktail) => (
              <CocktailCard
                key={cocktail.id}
                id={cocktail.id}
                image={cocktail.image}
                name={cocktail.name}
                isFavorite={cocktailIsFavorite(cocktail.id)}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
