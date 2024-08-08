import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-daisyui';

export default function LogoutButton() {
  const { logout } = useAuth0();

  return (
    <Button
      color='primary'
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log Out
    </Button>
  );
}
