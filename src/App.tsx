import { Outlet } from 'react-router-dom';
import { Button } from 'react-daisyui';

function App() {
  return (
    <div>
      <h1 className='text-3xl font-bold underline'>Hello Caipirinha</h1>
      <Button color='primary'>Click me!</Button>
      <Outlet />
    </div>
  );
}

export default App;
