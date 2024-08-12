import { Button } from 'react-daisyui';
import clsx from 'clsx';
import { ButtonProps } from 'react-daisyui';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  selectIsFilteredByFavorites,
  setIsFilteredByFavorites,
} from '../../features/cocktails/cocktails-slice';

type FavoritesFilterProps = ButtonProps;

export default function FavoritesFilter({
  className,
  ...props
}: FavoritesFilterProps) {
  const dispatch = useAppDispatch();
  const isFiltered = useAppSelector(selectIsFilteredByFavorites);

  const handleFilter = () => {
    if (isFiltered) {
      dispatch(setIsFilteredByFavorites(false));
    } else {
      dispatch(setIsFilteredByFavorites(true));
    }
  };

  return (
    <Button
      color='ghost'
      onClick={handleFilter}
      {...props}
      className={clsx('p-2 h-auto min-h-0', className)}
      title='Filter by favorites'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className={clsx('size-6 text-base-content', {
          'fill-primary text-primary': isFiltered,
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
