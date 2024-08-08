import { Button, Navbar } from 'react-daisyui';
import { Link } from 'react-router-dom';

export default function MainNavbar() {
  return (
    <Navbar className='sticky top-0 bg-base-100 z-50 shadow-md'>
      <Navbar.Start>
        <Link to='/' className='text-lg font-bold'>
          <Button color='ghost' className='text-2xl font-bold'>
            Caipirinha
          </Button>
        </Link>
      </Navbar.Start>

      <Navbar.End>
        <Button color='primary'>Sign in</Button>
      </Navbar.End>
    </Navbar>
  );
}
