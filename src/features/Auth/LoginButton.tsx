import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-daisyui';

export default function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      color='primary'
      size='sm'
      className='text-white'
      onClick={() => loginWithRedirect()}
    >
      Log In
    </Button>
  );
}
