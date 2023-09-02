import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../interfaces";
import { RootState } from "../app/store";
import { CrossFetch } from "./API";
import { actionInterface } from "./roomSlice";

export const fetchUsers = createAsyncThunk<User[], void>(
  "users/fetchUsers ",
  async () => {
    const res = await CrossFetch("users", "GET", null);
    return res.data;
  }
);

export const addUser = createAsyncThunk<User, User>(
  "users/addUser ",
  async (userObject) => {
    const res = await CrossFetch("users", "POST", JSON.stringify(userObject));

    console.log(userObject);
    console.log(res);
    return await res.data;
  }
);

export const getUser = createAsyncThunk<User["id"], User["id"]>(
  "users/getUser ",
  async (userId: User["id"]) => {
    const res = await CrossFetch(`users/${userId}`, "GET", undefined);
    return await res.data;
  }
);

export const deleteUser = createAsyncThunk<User["id"], User["id"]>(
  "users/deleteUser",
  async (userId: User["id"]) => {
    const res = await CrossFetch(`users/${userId}`, "DELETE", undefined);
    return await res.data;
  }
);

export const editUser = createAsyncThunk<User, User>(
  "users/editUser",
  async (updatedUserObject: User) => {
    const res = await CrossFetch(`users/${updatedUserObject.id}`, "PUT", JSON.stringify(updatedUserObject));
    console.log(updatedUserObject.id);
    console.log(res);
    return await res.data;
  }
);

export const getLoggedUser = createAsyncThunk<User["id"], User["id"]>(
  "users/getLoggedUser ",
  async (userId: User["id"]) => {
    const res = await CrossFetch(`users/${userId}`, "GET", undefined);
    return await res.data;
  }
);

export interface UsersState {
  usersListData: User[];
  status: string;
  singleUserData: User;
  singleUserStatus: string;
}

const initialState: UsersState = {
  usersListData: [],
  status: "idle",
  singleUserData: {
    photo: "",
    name: "",
    id: "",
    email: "",
    phone: "",
    startDate: "",
    jobDescription: undefined,
    state: "",
    password: "",
    position: "",
  },
  singleUserStatus: "idle",
};

export const usersSlice = createSlice({
  name: "users",
  initialState,

  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchUsers.rejected, (state: UsersState) => {
        state.status = "rejected";
      })
      .addCase(fetchUsers.pending, (state: UsersState) => {
        state.status = "pending";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.usersListData = action.payload;
      })

      .addCase(addUser.rejected, (state: UsersState) => {
        state.status = "rejected";
      })
      .addCase(addUser.pending, (state: UsersState) => {
        state.status = "pending";
      })
      .addCase(addUser.fulfilled, (state, action) => {
        const lastId = parseInt(
          state.usersListData[state.usersListData.length - 1].id.slice(2)
        );
        action.payload.id = "U-" + (lastId + 1).toString().padStart(4, "0");
        state.usersListData.push(action.payload);
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.usersListData = state.usersListData.filter(
          (item) => item.id !== action.payload
        );
        state.status = "fullfilled";
      })

      .addCase(deleteUser.pending, (state) => {
        state.status = "pending";
      })

      .addCase(getUser.fulfilled, (state, action: actionInterface) => {
        state.singleUserStatus = "fullfilled";
        state.singleUserData = action.payload;
      })

      .addCase(getUser.pending, (state) => {
        state.singleUserStatus = "pending";
      })

      .addCase(editUser.fulfilled, (state, action) => {
        state.status = "fulfilled";
        for (let i = 0; i < state.usersListData.length; i++) {
          if (state.usersListData[i].id === action.payload.id) {
            state.usersListData[i] = action.payload;
            state.singleUserData = action.payload;
            return;
          }
        }
      })

      .addCase(editUser.pending, (state: UsersState) => {
        state.status = "pending";
      });
  },
});

export const getUsersStatus = (state: RootState) => state.users.status;
export const getUsersData = (state: RootState) => state.users.usersListData;
export const getUsersSingle = (state: RootState) => state.users.singleUserData;
export const getSingleUserStatus = (state: RootState) => state.users.singleUserStatus;

export default usersSlice.reducer;
