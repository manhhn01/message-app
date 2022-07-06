import { Outlet, useRoutes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import DefaultLayout from './pages/layouts/DefaultLayout';

function App() {
  return useRoutes([
    {
      // element: <DefaultLayout />,
      // children: [{ path: '/', element: <HomePage /> }],
      path: '/',
      element: <HomePage />,
    },
  ]);
}

export default App;
