import { configureStore } from '@reduxjs/toolkit';
import auth from './middleware/authMiddleware';
import authReducer from './slices/authSlice';
import conversationReducer from './slices/conversationSlice';
import conversationsReducer from './slices/conversationsSlice';
import dropdownReducer from './slices/dropdownSlice';
import modalReducer from './slices/modalSlice';
import sidebarReducer from './slices/sidebarSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    sidebar: sidebarReducer,
    dropdown: dropdownReducer,
    conversation: conversationReducer,
    conversations: conversationsReducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), auth],
});
