import { Outlet } from 'react-router-dom';
import Navbar from './app/components/MainNavbar';

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
