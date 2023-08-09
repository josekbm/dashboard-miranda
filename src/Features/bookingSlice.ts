import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Booking } from "../interfaces";
import { CrossFetch } from "./API";
import { RootState } from "../app/store";

export interface BookingsState {
  bookingListData: Booking[];
  status: string;
  singleBookingData: Booking | undefined;
  singleBookingStatus: string;
}

const initialState: BookingsState = {
  bookingListData: [],
  status: "idle",
  singleBookingData: {
    name: "",
    id: "",
    orderDate: "",
    checkIn: "",
    checkOut: "",
    room: "",
    specialRequest: "",
  },
  singleBookingStatus: "idle",
};

//Async Thunks :

export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async () => {
    const res = await CrossFetch("bookings", "GET", null);
    return res.data;
  }
);

export const addBooking = createAsyncThunk(
  "bookings/addBooking",
  async (bookingObject: Booking) => {
    const res = await CrossFetch(
      "bookings/",
      "POST",
      JSON.stringify(bookingObject)
    );
    return await res.data;
  }
);

export const getBooking = createAsyncThunk(
  "bookings/getBooking",
  async (bookingId: Booking["id"]) => {
    const res = await CrossFetch(`bookings/${bookingId}`, "GET", undefined);
    return res.data;
  }
);

export const deleteBooking = createAsyncThunk(
  "bookings/deleteBooking",
  async (bookingId: Booking["id"]) => {
    const res = await CrossFetch(`bookings/${bookingId}`, "DELETE", undefined);
    return await res.data;
  }
);

export const editBooking = createAsyncThunk(
  "bookings/editBooking",
  async (updatedBookingObject: Booking) => {
    const res = await CrossFetch(
      `api/bookings/${updatedBookingObject.id}`,
      "PUT",
      JSON.stringify(updatedBookingObject)
    );
    return await res.data;
  }
);

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    resetBookingsState(state) {
      state.bookingListData = [];
      state.status = "idle";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(fetchBookings.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.bookingListData = action.payload;
        state.status = "fulfilled";
      })

      .addCase(addBooking.fulfilled, (state, action) => {
        const lastId = parseInt(
          state.bookingListData[state.bookingListData.length - 1].id.slice(2)
        );
        action.payload.id = "B-" + (lastId + 1).toString().padStart(4, "0");
        state.bookingListData.push(action.payload);
        state.status = "fulfilled";
      })

      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.bookingListData = state.bookingListData.filter(
          (item) => item.id !== action.payload
        );
        state.status = "fulfilled";
      })
      .addCase(deleteBooking.pending, (state, action) => {
        state.status = "pending";
      })

      .addCase(getBooking.fulfilled, (state, action) => {
        state.singleBookingData = state.bookingListData.find(
          (booking: Booking) => booking.id === action.payload
        );
        state.singleBookingStatus = "fulfilled";
      })

      .addCase(getBooking.pending, (state) => {
        state.singleBookingStatus = "pending";
      })

      .addCase(editBooking.fulfilled, (state, action) => {
        state.status = "fulfilled";
        for (let i = 0; i < state.bookingListData.length; i++) {
          if (state.bookingListData[i].id === action.payload.id) {
            state.bookingListData[i] = action.payload;
            state.singleBookingData = action.payload;
            return;
          }
        }
      })

      .addCase(editBooking.pending, (state) => {
        state.status = "pending";
      })
      .addCase(editBooking.rejected, (state) => {
        state.singleBookingStatus = "rejected";
      });
  },
});

export const getBookingsStatus = (state: RootState) => state.bookings.status;
export const getBookingsData = (state: RootState) =>
  state.bookings.bookingListData;
export const getSingleBooking = (state: RootState) =>
  state.bookings.singleBookingData;
export const getSingleBookingStatus = (state: RootState) =>
  state.bookings.singleBookingStatus;
export const { resetBookingsState } = bookingSlice.actions;

export default bookingSlice.reducer;
