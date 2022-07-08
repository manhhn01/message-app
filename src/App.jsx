import { useRoutes } from 'react-router-dom';
import './App.css';
import Chat from './components/Chat';
import MainPage from './pages/MainPage';

function App() {
  return useRoutes([
    {
      path: '/',
      element: <MainPage />,
      // element: <HomePage />,
    },
  ]);
}

export default App;
