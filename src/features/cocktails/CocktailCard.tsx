import { Link } from 'react-router-dom';
import Favorite from '../../app/components/Favorite';
import { useAuth0 } from '@auth0/auth0-react';

type CocktailCardProps = {
  id: string;
  image: string;
  name: string;
  isFavorite: boolean;
};

export default function CocktailCard({
  id,
  image,
  name,
  isFavorite,
}: CocktailCardProps) {
  const { isAuthenticated } = useAuth0();
  return (
    <li key={id} className='relative'>
      {isAuthenticated && (
        <Favorite
          id={id}
          className='absolute top-0 right-0 z-10'
          isFavorite={isFavorite}
        />
      )}
      <Link to={`/cocktails/${id}`}>
        <div>
          <img src={image} alt={name} className='w-full h-auto' />
          <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90'></div>
          <div className='absolute bottom-0 left-0 right-0 p-4 text-white z-10 lg:text-lg'>
            <p>{name}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}
