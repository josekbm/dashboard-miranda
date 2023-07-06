import { createAsyncThunk , createSlice } from '@reduxjs/toolkit'
import users from '../Data/usersData.json'

function delay(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 200);
    });
}


export const fetchUsers = createAsyncThunk("users/fetchUsers", async() => {
    const usersDelay = await delay(users);
    return usersDelay;
});

export const fetchUser = createAsyncThunk("users/fetchUser", async() => {
    const userDelay = await delay(
        users.find((user) => user["Employee Id"] === user.employee_id)
    );
    return userDelay;
});

export const createUser = createAsyncThunk("users/createUser", async(newUser) => {
    const userDelay = await delay(newUser);
    return userDelay;
})

export const updateUser = createAsyncThunk("users/updateusers", async(employee_id) => {
    const userToUpdate = await delay(users.find((user) => user["User Id"] === users.employee_id));
    return userToUpdate;
})

export const deleteUser = createAsyncThunk("users/deleteusers", async(employee_id) => {
    const userDelay = await delay(users.employee_id);
    return userDelay;
})
export const selectUsers = (state) => state.users.users;
export const selectUser = (state) => state.users.user;

const userSlice = createSlice({
    name: "userList",
    initialState: {
        users: [],
        user: null,
        isLoading: false,
        hasError: false,
    },
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(fetchUsers.pending, (state) => {
            state.isLaoding = true;
            state.hasError = false;
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.users = action.payload;
        })
        .addCase(fetchUsers.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
        })
        .addCase(fetchUser.pending, (state) => {
            state.isLaoding = true;
            state.hasError = false;
            state.user = null;
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.user = action.payload;
            console.log(action.payload)
        })
        .addCase(fetchUser.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
            state.user = null;
        })
        .addCase(createUser.pending, (state) => {
            state.isLaoding = true;
            state.hasError = false;
        })
        .addCase(createUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.users.push(action.payload); // state.users = [...state.users, action.payload]
        })
        .addCase(createUser.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
        })
        .addCase(updateUser.pending, (state) => {
            state.isLaoding = true;
            state.hasError = false;
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.user = action.payload;
        
        })
        .addCase(updateUser.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
        })
        .addCase(deleteUser.pending, (state) => {
            state.isLaoding = true;
            state.hasError = false;
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.users = state.users.filter(
                (user) => user["User Id"] !== action.payload
            );
        })
        .addCase(deleteUser.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
        });

    }
})

export default userSlice.reducer;

