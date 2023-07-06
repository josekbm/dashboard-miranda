import { configureStore } from '@reduxjs/toolkit';
import roomSlice from '../Features/roomSlice';
import bookingSlice from '../Features/bookingSlice';
import userSlice from '../Features/userSlice';
import contactSlice from '../Features/contactSlice';


export const store = configureStore({
  reducer: {
    rooms: roomSlice,
    bookings: bookingSlice,
    users: userSlice,
    contacts: contactSlice,
  },
});