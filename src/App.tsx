import { Outlet } from 'react-router-dom';
import Navbar from './app/components/MainNavbar';
import { ScrollRestoration } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { useAppDispatch } from './app/hooks';
import {
  fetchUserFavoriteCocktails,
  setUser,
} from './features/Auth/user-slice';

function App() {
  const { user } = useAuth0();
  const dispatch = useAppDispatch();

  // On first render, set the user in the Redux store
  useEffect(() => {
    if (user && user.sub) {
      const userId = user.sub.split('|')[1];
      dispatch(fetchUserFavoriteCocktails(userId));

      dispatch(
        setUser({
          id: userId,
          email: user.email,
          given_name: user.given_name,
          family_name: user.family_name,
          picture: user.picture,
        })
      );
    }
  }, [user, dispatch]);

  return (
    <>
      <Navbar />
      <main className='max-w-5xl mx-auto'>
        <Outlet />
      </main>
      <ScrollRestoration />
    </>
  );
}

export default App;
