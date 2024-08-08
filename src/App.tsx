import { Outlet } from 'react-router-dom';
import Navbar from './app/components/MainNavbar';
import { ScrollRestoration } from 'react-router-dom';

function App() {
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
