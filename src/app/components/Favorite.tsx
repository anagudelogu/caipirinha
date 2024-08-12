import clsx from 'clsx';
import { Button, ButtonProps } from 'react-daisyui';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  addFavoriteCocktail,
  removeFavoriteCocktail,
  selectUser,
} from '../../features/Auth/user-slice';

type FavoriteProps = ButtonProps & { id: string; isFavorite: boolean };

export default function Favorite({
  id,
  className,
  isFavorite,
  ...props
}: FavoriteProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  function handleFavorite() {
    if (!user) return;
    if (isFavorite) {
      dispatch(
        removeFavoriteCocktail({
          userId: user.id,
          productId: id,
        })
      );
    } else {
      dispatch(addFavoriteCocktail({ userId: user.id, productId: id }));
    }
  }

  return (
    <Button
      color='ghost'
      onClick={handleFavorite}
      {...props}
      className={clsx('p-1 h-auto min-h-0', className)}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className={clsx('size-6 text-base-content', {
          'fill-primary text-primary': isFavorite,
        })}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z'
        />
      </svg>
    </Button>
  );
}
