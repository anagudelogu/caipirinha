import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { Avatar, Button, Menu } from 'react-daisyui';
import { clsx } from 'clsx';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from './user-slice';

export default function UserProfile() {
  const { isAuthenticated, isLoading, logout } = useAuth0();
  const [menuVisible, setMenuVisible] = useState(false);
  const user = useAppSelector(selectUser);

  function toggleMenu() {
    setMenuVisible(!menuVisible);
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated &&
    user && (
      <div className='relative'>
        <Button color='ghost' onClick={toggleMenu} className='p-0'>
          <div className='text-right hidden md:block'>
            <span className='text-base-content font-semibold'>
              {`${user.given_name} ${user.family_name}`}
            </span>
            <span className='text-xs text-base-content-secondary block font-normal'>
              {user.email}
            </span>
          </div>
          <Avatar src={user.picture} shape='circle' size={'xs'} />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className={clsx('size-3 transition-all md:size-5', {
              'transform rotate-180': menuVisible,
            })}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m19.5 8.25-7.5 7.5-7.5-7.5'
            />
          </svg>
        </Button>
        <Menu
          className={clsx('absolute top-12 right-0 bg-base-300 rounded-lg', {
            hidden: !menuVisible,
          })}
        >
          <Menu.Item>
            <Button
              color='ghost'
              className='w-full'
              size='sm'
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              Logout
            </Button>
          </Menu.Item>
        </Menu>
      </div>
    )
  );
}
