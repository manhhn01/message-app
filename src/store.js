import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import conversationReducer from './slices/conversationSlice';
import conversationsReducer from './slices/conversationsSlice';
import dropdownReducer from './slices/dropdownSlice';
import sidebarReducer from './slices/sidebarSlice';
import modalReducer from './slices/modalSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    sidebar: sidebarReducer,
    dropdown: dropdownReducer,
    conversation: conversationReducer,
    conversations: conversationsReducer,
  },
});
