import { Navigate, useRoutes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import RegisterPage from './pages/RegisterPage';
import './App.css';
import { useSelector } from 'react-redux';

function App() {
  const auth = useSelector((state) => state.auth.isAuthenticated);
  return useRoutes([
    {
      path: '/',
      element: auth ? <MainPage /> : <Navigate to="/login" />,
    },
    {
      path: '/login',
      element: !auth ? <LoginPage /> : <Navigate to="/" />,
    },
    {
      path: '/register',
      element: !auth ? <RegisterPage /> : <Navigate to="/" />,
    },
  ]);
}

export default App;
