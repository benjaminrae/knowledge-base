import { RouteObject } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
export const routes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  {
    path: '/login',
    lazy: async () => {
      const { LoginPage } = await import('../pages/LoginPage');
      return { Component: LoginPage };
    },
  },
];
