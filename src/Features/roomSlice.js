import { createAsyncThunk , createSlice } from '@reduxjs/toolkit'
import rooms from '../Data/roomsData.json'

function delay(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 200);
    });
  }

//Funtions for rooms

export const getRooms = async () => {
    try{
        // const response = await fetch(rooms);
        // const data = await response.json();
        const data = rooms
        return data;
    }catch(err){
        console.log(`Error while procesing data from api ${err}`);
    };
};

export const getAvailableRooms = async () => {
    try{
        // const response = await fetch(rooms);
        // const data = await response.json();
        const data = rooms
        const availableRooms = data.filter((room) => room.status === true)
        return availableRooms;
    }catch(err){
        console.log(`Error while procesing data from api ${err}`);
    };
}

export const getBookedRooms = async () => {
    try{
        // const response = await fetch(rooms);
        // const data = await response.json();
        const data = rooms
        const bookedRooms = data.filter((room) => room.status === false)
        return bookedRooms;
    }catch(err){
        console.log(`Error while procesing data from api ${err}`);
    };
}


//functions for room

export const getRoom = async (roomId) => {
    try{
        // const response = await fetch(rooms);
        // const data = await response.json();
        const data = rooms;
        let booking = data.find(({id}) => id===roomId);
        return booking;
    }catch(err){
        alert(`Error while procesing data from api ${err}`);
    };
};

export const updateRoom = async (roomId) => {
    try{
        // const response = await fetch(rooms);
        // const data = await response.json();
        const data = rooms;
        let booking = data.find(({id}) => id===roomId);
        return booking;
    }catch(err){
        alert(`Error while procesing data from api ${err}`);
    };
}



export const createRoom = async (dataRoom) => {
    try{
        console.log(dataRoom)
        return (dataRoom)
    }catch(err){
        alert(`Error while procesing data from api ${err}`);
    };
}

const initialState = {
    rooms: [],
    room: {},
    roomCreated: {},
    isLoading: false,
    hasError: false
}

//Thunks for rooms

export const roomsCall = createAsyncThunk(
    'rooms/getRooms',
    async () => {
        return await delay(getRooms())
    }
);

export const roomsAvailableCall = createAsyncThunk(
    'rooms/getAvailableRooms',
    async () => {
        return await delay(getAvailableRooms())
    }
);

export const roomsBookedCall = createAsyncThunk(
    'rooms/getBookedRooms',
    async () => {
        return await delay(getBookedRooms())
    }
);

//Thunks for room

export const roomCall = createAsyncThunk(
    'room/getRoom',
    async (id) => {
        return await delay(getRoom(id))
    }
);

export const roomDelete = createAsyncThunk(
    'room/deleteRoom',
    async (id) => {
        // const data = await deleteRoom(id);
        // return data;
        return id
    }
);

export const roomCreate = createAsyncThunk(
    'room/createRoom',
    async (data) => {
        // const data = await createRoom(data);
        // return data;
        return await delay(createRoom(data))
    }
);

export const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    extraReducers: (builder) => {
        builder.addMatcher(
            (action) => action.type.endsWith('/pending'),
            (state) => {
                state.isLoading = true;
                state.hasError = false;                
            }
        );
        builder.addMatcher(
            (action) => action.type.endsWith('/rejected'),
            (state) => {
                state.isLoading = false;
                state.hasError = true;                
            }
        );
        builder.addMatcher(
            (action) => action.type.endsWith('/fulfilled'),
            (state,action) => {
                state.isLoading = false;
                state.hasError = false;

                if(action.type === roomsCall.fulfilled.type){
                    state.rooms = action.payload;
                }else if(action.type === roomsAvailableCall.fulfilled.type){
                    state.rooms = action.payload;
                }else if(action.type === roomsBookedCall.fulfilled.type){
                    state.rooms = action.payload;
                }else if(action.type === roomCall.fulfilled.type){
                    state.room = action.payload;
                }else if(action.type === roomDelete.fulfilled.type){
                    state.rooms = state.rooms.filter(room => room.id!==action.payload)
                    console.log("ID Deleted Room: "+action.payload)
                }else if(action.type === roomCreate.fulfilled.type){
                    state.roomCreated = action.payload; 
                }              
            }
        )
    }
})

export default roomsSlice.reducer