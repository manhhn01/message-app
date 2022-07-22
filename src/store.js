import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import conversationReducer from './slices/conversationSlice';
import conversationsReducer from './slices/conversationsSlice';
import dropdownReducer from './slices/dropdownSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    dropdown: dropdownReducer,
    conversation: conversationReducer,
    conversations: conversationsReducer,
  },
});
