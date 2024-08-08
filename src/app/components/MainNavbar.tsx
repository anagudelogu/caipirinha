import { Button, Navbar } from 'react-daisyui';
import { Link } from 'react-router-dom';
import LoginButton from '../../features/Auth/LoginButton';
import LogoutButton from '../../features/Auth/LogoutButton';
import UserProfile from '../../features/Auth/UserProfile';
import { useAuth0 } from '@auth0/auth0-react';

export default function MainNavbar() {
  const { isAuthenticated } = useAuth0();

  return (
    <header className='sticky top-0 bg-base-100 z-50 shadow-md'>
      <Navbar className='max-w-5xl mx-auto'>
        <Navbar.Start>
          <Link to='/' className='text-lg font-bold'>
            <Button color='ghost' className='text-2xl font-bold'>
              Caipirinha
            </Button>
          </Link>
        </Navbar.Start>

        <Navbar.End>
          {!isAuthenticated && <LoginButton />}

          {isAuthenticated && (
            <>
              <LogoutButton />
              <UserProfile />
            </>
          )}
        </Navbar.End>
      </Navbar>
    </header>
  );
}
