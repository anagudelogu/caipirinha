import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  clearCocktailDetails,
  fetchCocktailById,
  selectCocktailDetails,
  selectCocktailDetailsStatus,
} from '../features/cocktails/cocktails-slice';
import { Badge, Breadcrumbs } from 'react-daisyui';

export default function CocktailDetails() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const id = params.id;
  const cocktail = useAppSelector(selectCocktailDetails);
  const status = useAppSelector(selectCocktailDetailsStatus);

  useEffect(() => {
    if (id) dispatch(fetchCocktailById(id));

    return () => {
      dispatch(clearCocktailDetails());
    };
  }, [dispatch, id]);

  return (
    <>
      {cocktail && (
        <div className='p-4'>
          <Breadcrumbs>
            <Breadcrumbs.Item>
              <Link to={'/'}>Cocktails</Link>
            </Breadcrumbs.Item>
            <Breadcrumbs.Item>{cocktail.name}</Breadcrumbs.Item>
          </Breadcrumbs>

          <div className='md:grid md:grid-cols-2 md:gap-4'>
            <div className='relative w-full flex-1'>
              <img
                src={cocktail.image}
                alt={cocktail.name}
                className='w-full h-auto object-cover'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent'></div>
              <div className='absolute bottom-0 left-0 right-0 p-4 text-white z-10'>
                <h2 className='text-3xl font-bold'>{cocktail.name}</h2>
              </div>
            </div>

            <div className='flex flex-col gap-2 mt-6 flex-1 md:mt-0'>
              <Badge color='primary'>
                {cocktail.alcoholic ? 'Alcoholic' : 'Non Alcoholic'}
              </Badge>
              <h3 className='text-xl text-base-content font-semibold lg:text-2xl'>
                Ingredients
              </h3>
              <ul className='list-disc list-inside text-lg'>
                {cocktail.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div className='flex flex-col gap-2 mt-6 flex-1 md:col-span-2 md:mt-0'>
              <h3 className='text-xl text-base-content font-semibold lg:text-2xl'>
                Instructions
              </h3>
              <p className='text-lg'>{cocktail.instructions}</p>
            </div>
          </div>
        </div>
      )}

      {status === 'loading' && <div>Loading...</div>}

      {status === 'failed' && (
        <div className='flex flex-col justify-center items-center h-[calc(100vh-64px)]'>
          <p>Failed to load cocktail</p>
          <Link to={'/'} className='link link-primary'>
            Back to cocktails
          </Link>
        </div>
      )}
    </>
  );
}
