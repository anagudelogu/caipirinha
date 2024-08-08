import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  fetchCocktails,
  selectCocktails,
} from '../features/cocktails/cocktails-slice';
import { Link } from 'react-router-dom';
import { Input } from 'react-daisyui';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectCocktails);

  useEffect(() => {
    dispatch(fetchCocktails());
  }, [dispatch]);

  return (
    <>
      <header className='bg-base-100 text-white text-center py-8'>
        <h2 className='text-3xl font-bold'>Welcome to Caipirinha</h2>
        <p className='text-lg'>Please sign in to save your favorite drinks!</p>
      </header>

      {/* Only show if user is logged in */}
      <div>
        <h3 className='text-2xl font-bold text-center my-8 hidden'>
          Your Favorites
        </h3>
      </div>

      <div>
        <div className='flex items-center px-4 gap-2 mb-4'>
          <h3 className='text-2xl font-bold text-white flex items-center gap-1 flex-1 w-full'>
            Cocktails
          </h3>
          <div className='flex-1 w-full'>
            <Input
              type='search'
              placeholder='Search...'
              className='w-full min-w-none'
            />
          </div>
        </div>
        <ul className='grid grid-cols-2 items-center'>
          {cocktails.map((cocktail) => (
            <li key={cocktail.id}>
              <Link to={`/cocktails/${cocktail.id}`}>
                <div className='relative'>
                  <img
                    src={cocktail.image}
                    alt={cocktail.name}
                    className='w-full h-auto'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90'></div>
                  <div className='absolute bottom-0 left-0 right-0 p-4 text-white z-10'>
                    <p>{cocktail.name}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
