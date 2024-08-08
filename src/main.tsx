import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './app/store.ts';
import { Provider } from 'react-redux';
import HomePage from './pages/home-page.tsx';
import CocktailDetails from './pages/cocktail-details.tsx';
import { Auth0Provider } from '@auth0/auth0-react';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/cocktails/:id',
        element: <CocktailDetails />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain='dev-13awrj7c50ui53zh.us.auth0.com'
      clientId='xzLuO4nTsGYbh4mwXRqjp3mAxVa7MltL'
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </Auth0Provider>
  </StrictMode>
);
