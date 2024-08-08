import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchCocktails,
  selectCocktails,
  selectCocktailsStatus,
} from '../features/cocktails/cocktails-slice';
import { Link } from 'react-router-dom';
import Search from '../features/search/Search';
import { selectQuery } from '../features/search/search-slice';
import { useAuth0 } from '@auth0/auth0-react';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectCocktails);
  const status = useAppSelector(selectCocktailsStatus);
  const query = useAppSelector(selectQuery);
  const { isAuthenticated, user } = useAuth0();

  const filteredCocktails = cocktails.filter((cocktail) =>
    cocktail.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (status === 'idle') dispatch(fetchCocktails());
  }, [dispatch, status]);

  return (
    <>
      <div className='bg-base-100 text-white text-center py-8'>
        <h2 className='text-3xl font-bold md:text-4xl lg:text-5xl'>
          Welcome to Caipirinha
        </h2>
        {!isAuthenticated && (
          <p className='text-lg'>
            Please sign in to save your favorite drinks!
          </p>
        )}
        {isAuthenticated && (
          <p className='text-lg'>
            Enojoy your favorite drinks,{' '}
            <span className='text-primary'>{user?.given_name}!</span>
          </p>
        )}
      </div>

      <div>
        <div className='flex items-center px-4 gap-2 mb-4 lg:mb-8'>
          <h3 className='text-2xl font-bold text-white flex items-center gap-1 flex-1 w-full md:text-3xl'>
            Cocktails
          </h3>
          <div className='flex-1 w-full'>
            <Search />
          </div>
        </div>
        {status === 'loading' || (status === 'idle' && <p>Loading...</p>)}

        {status === 'failed' && <p>Failed to load cocktails</p>}

        {status === 'succeeded' && (
          <ul className='grid grid-cols-2 items-center md:grid-cols-4 lg:grid-cols-5'>
            {filteredCocktails.map((cocktail) => (
              <li key={cocktail.id}>
                <Link to={`/cocktails/${cocktail.id}`}>
                  <div className='relative'>
                    <img
                      src={cocktail.image}
                      alt={cocktail.name}
                      className='w-full h-auto'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90'></div>
                    <div className='absolute bottom-0 left-0 right-0 p-4 text-white z-10 lg:text-lg'>
                      <p>{cocktail.name}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
