import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../components/MainLayout';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { routes } from './routes';

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: routes.home,
        element: <HomePage />,
      },
      {
        path: routes.login,
        element: <LoginPage />,
      },
    ],
  },
]);
