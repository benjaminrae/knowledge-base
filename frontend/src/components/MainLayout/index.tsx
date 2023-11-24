import { Outlet } from 'react-router-dom';
import { Menu } from '../Menu';

export const MainLayout = () => {
  return (
    <Menu>
      <Outlet />
    </Menu>
  );
};
