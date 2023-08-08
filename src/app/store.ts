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

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch