import { createAsyncThunk , createSlice } from '@reduxjs/toolkit'
import bookings from '../Data/bookingsData.json'
import { Booking } from '../interfaces';
import { RootState } from '../app/store';

const bookingsList = bookings as Booking[];

interface BookingState {
    bookingListData: Booking[];
    status: string;
    singleBookingData: Booking;
    singleBookingStatus: string;
}

const initialState: BookingState = {
    bookingListData: [],
    status: "idle",
    singleBookingData: {
        guest_name: "",
        booking_id: "",
        booking_date: "",
        check_in: "",
        check_out: "",
        special_requests: "",
        room_type: "",
        status: "",
    },
    singleBookingStatus: "idle",
}

//Async Thunks :

export const fetchBookings = createAsyncThunk<Booking[], void>("bookings/fetchBookings", async () => {
    return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(bookingsList);
        }, 200);
    })
});

export const addBooking = createAsyncThunk<Booking, Booking>("bookings/addBooking", async (bookingObject :Booking) => {
    return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(bookingObject);
        }, 200);
    })
});

export const getBooking = createAsyncThunk<Booking["booking_id"], Booking["booking_id"]>("bookings/getBooking", async (bookingId : Booking["booking_id"]) =>{
    return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(bookingId);
        }, 200);
    })
})

export const deleteBooking = createAsyncThunk<Booking["booking_id"], Booking["booking_id"]>('bookings/deleteBooking', async (bookingId: Booking["booking_id"]) => {
    return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(bookingId);
        }, 200);
    })
});

export const editBooking = createAsyncThunk<Booking, Booking>("bookings/editBooking", async (updatedBookingObject: Booking)=>{
    return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(updatedBookingObject);
        }, 200);
    })
})


export const getBookingsStatus = (state: RootState) => state.bookings.status;
export const getBookingsData = (state: RootState) => state.bookings.bookingListData;
export const getSingleBooking = (state: RootState) => state.bookings.singleBookingData;
export const getSingleBookingStatus = (state: RootState) => state.bookings.singleBookingStatus;



const bookingSlice = createSlice({
    name: "bookingList",
    initialState,
    reducers: {},
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
            const lastId = parseInt(state.bookingListData[state.bookingListData.length - 1].booking_id.slice(2));
            action.payload.booking_id = "B-" + (lastId + 1).toString().padStart(4, "0");
            state.bookingListData.push(action.payload);
            state.status = "fulfilled";
        })
        

        .addCase(deleteBooking.fulfilled, (state, action) => {
            state.bookingListData = state.bookingListData.filter(
                (item) => item.booking_id !== action.payload
            );
            state.status = "fulfilled";
        })
        .addCase(deleteBooking.pending, (state, action) => {
            state.status = "pending";
        })

        /*.addCase(getBooking.fulfilled, (state, action) => {
            state.singleBookingData = state.bookingListData.find((booking: Booking) => booking.booking_id === action.payload);
            state.singleBookingStatus = "fulfilled";
        })*/

        .addCase(getBooking.pending, (state) => {
            state.singleBookingStatus = "pending";
        })

        .addCase(editBooking.fulfilled, (state, action) => {
            state.status = "fulfilled";
            for (let i = 0; i < state.bookingListData.length; i++) {
                if (state.bookingListData[i].booking_id === action.payload.booking_id) {
                    state.bookingListData[i] = action.payload;
                    state.singleBookingData = action.payload;
                    return;
                }
            }
        })

        .addCase(editBooking.pending, (state) => {
            state.status = "pending";
        });
    },
});


export default bookingSlice.reducer;

