import toast from 'react-hot-toast';
import { logout } from '../slices/authSlice';

const authMiddleware = (store) => (next) => (action) => {
  if (action.error?.message === 'Rejected') {
    if (
      action.payload.status === 401 &&
      store.getState().auth.isAuthenticated
    ) {
      store.dispatch(logout());
      toast.error('Bạn đã bị đăng xuất. Vui lòng đăng nhập lại.');
      console.log('logout');
    }
  }

  next(action);
};

export default authMiddleware;
