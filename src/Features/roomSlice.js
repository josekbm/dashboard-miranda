import { createAsyncThunk , createSlice } from '@reduxjs/toolkit'
import rooms from '../Data/roomsData.json'

function delay(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 200);
    });
}


export const fetchRooms = createAsyncThunk("rooms/fetchRooms", async() => {
    const roomsDelay = await delay(rooms);
    return roomsDelay;
});

export const fetchRoom = createAsyncThunk("rooms/fetchRoom", async() => {
    const roomDelay = await delay(
        rooms.find((room) => room["Room Id"] === room.id)
    );
    return roomDelay;
});

export const createRoom = createAsyncThunk("rooms/createRoom", async(newRoom) => {
    const roomDelay = await delay(newRoom(data));
    return roomDelay;
})

export const updateRoom = createAsyncThunk("rooms/updateRoom", async(id) => {
    const roomToUpdate = await delay(rooms.find((room) => room["Room Id"] === room.id));
    return roomToUpdate;
})

export const deleteRoom = createAsyncThunk("rooms/deleteRoom", async(id) => {
    const roomDelay = await delay(rooms.id);
    return roomDelay;
})
export const selectRooms = (state) => state.rooms.rooms;
export const selectRoom = (state) => state.rooms.room;

const roomSlice = createSlice({
    name: "roomList",
    initialState: {
        rooms: [],
        room: {},
        isLoading: false,
        hasError: false,
    },
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(fetchRooms.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(fetchRooms.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.rooms = action.payload;
        })
        .addCase(fetchRooms.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
        })
        .addCase(fetchRoom.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
            state.room = null;
        })
        .addCase(fetchRoom.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.room = action.payload;
            console.log(action.payload)
        })
        .addCase(fetchRoom.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
            state.room = null;
        })
        .addCase(createRoom.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(createRoom.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.rooms.push(action.payload); // state.rooms = [...state.rooms, action.payload]
        })
        .addCase(createRoom.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
        })
        .addCase(updateRoom.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(updateRoom.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.room = action.payload;
        
        })
        .addCase(updateRoom.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
        })
        .addCase(deleteRoom.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(deleteRoom.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.rooms = state.rooms.filter(
                (room) => room["Room Id"] !== action.payload
            );
        })
        .addCase(deleteRoom.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
        });

    }
})

export default roomSlice.reducer;

