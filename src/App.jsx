import { createContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import './App.css';
import Loading from './components/Loading';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import RegisterPage from './pages/RegisterPage';
import { SocketService } from './services/SocketService';
import { fetchUser } from './slices/authSlice';
import { messages } from './slices/conversationSlice';
import {
  conversationMessage,
  fetchConversations,
} from './slices/conversationsSlice';
import { setDropdown } from './slices/dropdownSlice';

const SocketContext = createContext(null);

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const conversations = useSelector((state) => state.conversations);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const handleClick = (event) => {
      dispatch(setDropdown(false));
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [dispatch]);

  useEffect(() => {
    if (auth.status === 'idle') {
      dispatch(fetchUser());
    }
  }, [auth.status, dispatch]);

  useEffect(() => {
    if (
      auth.status === 'fulfilled' &&
      auth.isAuthenticated &&
      conversations.status === 'idle'
    ) {
      dispatch(fetchConversations());
    }
  }, [auth.isAuthenticated, auth.status, conversations.status, dispatch]);

  useEffect(() => {
    if (auth.status === 'fulfilled' && auth.isAuthenticated && !socket) {
      const io = new SocketService();
      io.setOnMessageListener((message) => {
        console.log(message);
        dispatch(
          messages({
            message,
            conversationId: message.conversationId,
          })
        );
        dispatch(
          conversationMessage({
            message,
            conversationId: message.conversationId,
          })
        );
      });
      setSocket(io);

      return () => {
        socket?.disconnect();
      };
    }
  }, [auth.isAuthenticated, auth.status, dispatch, socket]);

  const Routes = useRoutes([
    {
      element: auth.status === 'idle' ? <Loading /> : <Outlet />,
      children: [
        {
          path: '/',
          element: auth.isAuthenticated ? (
            <MainPage />
          ) : (
            <Navigate to="/login" />
          ),
        },
        {
          path: '/login',
          element: !auth.isAuthenticated ? <LoginPage /> : <Navigate to="/" />,
        },
        {
          path: '/register',
          element: !auth.isAuthenticated ? (
            <RegisterPage />
          ) : (
            <Navigate to="/" />
          ),
        },
      ],
    },
  ]);

  return (
    <SocketContext.Provider value={socket}>{Routes}</SocketContext.Provider>
  );
}

export { SocketContext };
export default App;
