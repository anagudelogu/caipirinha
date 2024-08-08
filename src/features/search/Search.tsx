import { Input } from 'react-daisyui';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectQuery, setQuery } from './search-slice';

export default function Search() {
  const dispatch = useAppDispatch();
  const query = useAppSelector(selectQuery);

  // Client-side search
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setQuery(event.target.value));
  }

  return (
    <label htmlFor='search' className='relative'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='size-5 absolute top-1/2 left-3 transform -translate-y-1/2 text-base-content'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
        />
      </svg>

      <Input
        id='search'
        type='search'
        placeholder='Search...'
        className='w-full pl-10'
        value={query}
        onChange={handleInputChange}
      />
    </label>
  );
}
