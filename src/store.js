import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import conversationReducer from './slices/conversationSlice'

export default configureStore({
  reducer: { auth: authReducer, conversation: conversationReducer },
});