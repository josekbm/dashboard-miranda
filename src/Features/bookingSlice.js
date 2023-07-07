import { createAsyncThunk , createSlice } from '@reduxjs/toolkit'
import bookings from '../Data/bookingsData.json'

function delay(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 200);
    });
}


export const fetchBookings = createAsyncThunk("bookings/fetchBookings", async() => {
    const bookingsDelay = await delay(bookings);
    return bookingsDelay;
});

export const fetchBooking = createAsyncThunk("bookings/fetchBooking", async() => {
    const bookingDelay = await delay(
        bookings.find((booking) => booking["Boking Id"] === booking.booking_id)
    );
    return bookingDelay;
});

export const createBooking = createAsyncThunk("bookings/createBooking", async(newBooking) => {
    const bookingDelay = await delay(newBooking);
    return bookingDelay;
})

export const updateBooking = createAsyncThunk("bookings/updatebookings", async(booking_id) => {
    const bookingToUpdate = await delay(bookings.find((booking) => booking["Booking Id"] === bookings.booking_id));
    return bookingToUpdate;
})

export const deleteBooking = createAsyncThunk("bookings/deletebookings", async(booking_id) => {
    const bookingDelay = await delay(bookings.booking_id);
    return bookingDelay;
})
export const selectBookings = (state) => state.bookings.bookings;
export const selectBooking = (state) => state.bookings.booking;

const bookingSlice = createSlice({
    name: "bookingList",
    initialState: {
        bookings: [],
        booking: null,
        isLoading: false,
        hasError: false,
    },
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(fetchBookings.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(fetchBookings.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.bookings = action.payload;
        })
        .addCase(fetchBookings.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
        })
        .addCase(fetchBooking.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
            state.booking = null;
        })
        .addCase(fetchBooking.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.booking = action.payload;
            console.log(action.payload)
        })
        .addCase(fetchBooking.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
            state.booking = null;
        })
        .addCase(createBooking.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(createBooking.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.bookings.push(action.payload); // state.bookings = [...state.bookings, action.payload]
        })
        .addCase(createBooking.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
        })
        .addCase(updateBooking.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(updateBooking.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.booking = action.payload;
        
        })
        .addCase(updateBooking.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
        })
        .addCase(deleteBooking.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(deleteBooking.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.bookings = state.bookings.filter(
                (booking) => booking["Booking Id"] !== action.payload
            );
        })
        .addCase(deleteBooking.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
        });

    }
})

export default bookingSlice.reducer;

