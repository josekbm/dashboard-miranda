import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Room } from "../interfaces";
import { RootState } from "../app/store";
import { CrossFetch } from "./API";

export const fetchRooms = createAsyncThunk<Room[], void>(
  "rooms/fetchRooms",
  async () => {
    const res = await CrossFetch("rooms", "GET", undefined);
    return await res.data;
  }
);

export const addRoom = createAsyncThunk<Room, Room>(
  "rooms/addRoom",
  async (roomObject: Room) => {
    const res = await CrossFetch("rooms", "POST", JSON.stringify(roomObject));
    return await res.data;
  }
);

export const getRoom = createAsyncThunk<Room["id"], Room["id"]>(
  "rooms/getRoom",
  async (roomId: Room["id"]) => {
    const res = await CrossFetch(`rooms/${roomId}`, "GET", undefined);
    return await res.data;
  }
);

export const deleteRoom = createAsyncThunk<Room["id"], Room["id"]>(
  "rooms/deleteRooms",
  async (roomId: Room["id"]) => {
    const res = await CrossFetch(`rooms/${roomId}`, "DELETE", undefined);
    return await res.data;
  }
);

export const editRoom = createAsyncThunk<Room, Room>(
  "rooms/editRoom",
  async (updatedRoomObject: Room) => {
    const res = await CrossFetch(
      `rooms/${updatedRoomObject.id}`,
      "PUT",
      JSON.stringify(updatedRoomObject)
    );
    return await res.data;
  }
);

export interface actionInterface {
  payload: any;
  type: string;
}

export interface RoomsState {
  roomsListData: Room[];
  status: string;
  singleRoomData: Room;
  singleRoomStatus: string;
}

const initialState: RoomsState = {
  roomsListData: [],
  status: "idle",
  singleRoomData: {
    roomType: "",
    roomNumber: "",
    id: "",
    description: "",
    price: 0,
    discount: 0,
    cancellation: "",
    amenities: [""],
    thumbnail: "",
    images: [""],
    status: "",
  },
  singleRoomStatus: "idle",
};

export const roomSlice = createSlice({
  name: "rooms",
  initialState,

  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchRooms.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(fetchRooms.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.roomsListData = action.payload;
      })

      .addCase(addRoom.fulfilled, (state, action) => {
        state.status = "fulfilled";
        const lastId = parseInt(
          state.roomsListData[state.roomsListData.length - 1].id.slice(2)
        );
        action.payload.id = "R-" + (lastId + 1).toString().padStart(4, "0");
        state.roomsListData.push(action.payload);
      })
      .addCase(addRoom.pending, (state) => {
        state.status = "pending";
      })

      .addCase(deleteRoom.fulfilled, (state: RoomsState, action) => {
        state.roomsListData = state.roomsListData.filter(
          (item) => item.id !== action.payload
        );
        state.status = "fulfilled";
      })
      .addCase(deleteRoom.pending, (state) => {
        state.status = "pending";
      })

      .addCase(getRoom.fulfilled, (state, action: actionInterface) => {
        state.singleRoomStatus = "fulfilled";

        state.singleRoomData = action.payload;
      })
      .addCase(getRoom.pending, (state) => {
        state.singleRoomStatus = "pending";
      })

      .addCase(editRoom.fulfilled, (state, action) => {
        state.status = "fulfilled";
        for (let i = 0; i < state.roomsListData.length; i++) {
          if (state.roomsListData[i].id === action.payload.id) {
            state.roomsListData[i] = action.payload;
            state.singleRoomData = action.payload;
            return;
          }
        }
      })

      .addCase(editRoom.pending, (state) => {
        state.status = "pending";
      });
  },
});

export const getRoomsStatus = (state: RootState) => state.rooms.status;
export const getRoomsData = (state: RootState) => state.rooms.roomsListData;
export const getSingleRoom = (state: RootState) => state.rooms.singleRoomData;
export const getSingleRoomStatus = (state: RootState) =>
  state.rooms.singleRoomStatus;

export default roomSlice.reducer;
