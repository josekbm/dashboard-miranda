import { configureStore } from '@reduxjs/toolkit';
import roomSlice from '../Features/roomSlice';


export const store = configureStore({
  reducer: {
    rooms: roomSlice,
    
  },
});