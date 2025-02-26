import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './reducer';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});