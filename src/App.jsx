import { createContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import './App.css';
import Loading from './components/Loading';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import RegisterPage from './pages/RegisterPage';
import { NotificationService } from './services/NotificationService';
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
  const conversation = useSelector((state) => state.conversation);

  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');

  const notificationService = useRef(new NotificationService());

  /* hide dropdown*/
  useEffect(() => {
    const handleClick = () => {
      dispatch(setDropdown(false));
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [dispatch]);

  /* get auth status */
  useEffect(() => {
    if (auth.status === 'idle') {
      dispatch(fetchUser());
    }
  }, [auth.status, dispatch]);

  /* fetch conversations */
  useEffect(() => {
    if (
      auth.status === 'fulfilled' &&
      auth.isAuthenticated &&
      conversations.status === 'idle'
    ) {
      dispatch(fetchConversations());
    }
  }, [auth.isAuthenticated, auth.status, conversations.status, dispatch]);

  /* init socket */
  useEffect(() => {
    if (auth.status === 'fulfilled' && auth.isAuthenticated) {
      const io = new SocketService();

      io.setOnMessageListener((message) => {
        console.log(message);
        dispatch(messages(message));
        dispatch(conversationMessage(message));
        setMessage(message);
      });

      io.setOnJoinConversationListener(() => {
        dispatch(fetchConversations());
      });

      setSocket(io);

      return () => {
        console.log('socket disconnected', io);
        io.disconnect();
      };
    }
  }, [auth.isAuthenticated, auth.status, dispatch]);

  /* push notification */
  useEffect(() => {
    if (!notificationService.current.permission) {
      notificationService.current.requestPermission();
    }
    if (
      auth.status === 'fulfilled' &&
      auth.isAuthenticated &&
      notificationService.current.permission &&
      message.conversationId !== conversation.id &&
      message.senderId !== auth.user?.id &&
      message.message?.length > 0 &&
      !conversation.isSilent
    ) {
      notificationService.current.addNotification(
        message.Conversation.name,
        message.message
      );
    }
    return () => {
      setMessage('');
    };
  }, [auth, conversation.id, conversation.isSilent, message]);

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
