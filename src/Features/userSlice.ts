import { createAsyncThunk , createSlice } from '@reduxjs/toolkit'
import users from '../Data/usersData.json'
import { User } from '../interfaces';
import { RootState } from '../app/store';


const usersList = users as User[];

export const fetchUsers = createAsyncThunk<User[], void>(
  "users/fetchUsers ",
  async () => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(usersList);
      }, 200);
    });
  }
);

export const addUser = createAsyncThunk<User, User>(
  "users/addUser ",
  async (userObject: User) => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(userObject);
      }, 200);
    });
  }
);

export const getUser = createAsyncThunk<User["id"], User["id"]>(
  "users/getUser ",
  async (userId: User["id"]) => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(userId);
      }, 200);
    });
  }
);

export const deleteUser = createAsyncThunk<User["id"], User["id"]>(
  "users/deleteUser",
  async (userId: User["id"]) => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(userId);
      }, 200);
    });
  }
);

export const editUser = createAsyncThunk<User, User>(
  "users/editUser",
  async (updatedUserObject: User) => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(updatedUserObject);
      }, 200);
    });
  }
);

export interface UsersState {
    usersListData: User[];
    status: string;
    singleUser: User | undefined;
    singleUserStatus: string;
  }
  
  const initialState: UsersState = {
    usersListData: [],
    status: "idle",
    singleUser: {
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
  
        .addCase(getUser.fulfilled, (state, action) => {
          state.singleUser = state.usersListData.find(
            (user) => user.id === action.payload
          );
          state.singleUserStatus = "fullfilled";
        })
  
        .addCase(getUser.pending, (state) => {
          state.singleUserStatus = "pending";
        })
  
        .addCase(editUser.fulfilled, (state, action) => {
          state.status = "fulfilled";
          for (let i = 0; i < state.usersListData.length; i++) {
            if (state.usersListData[i].id === action.payload.id) {
              state.usersListData[i] = action.payload;
              state.singleUser = action.payload;
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
  export const getUsersSingle = (state: RootState) => state.users.singleUser;
  export const getSingleUserStatus = (state: RootState) =>
    state.users.singleUserStatus;
  
  export default usersSlice.reducer;