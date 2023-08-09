import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import contacts from "../Data/contactData.json";
import { Contact } from "../interfaces";
import { RootState } from "../app/store";
import { CrossFetch } from "./API";

const contactsList = contacts as Contact[];
export const fetchContacts = createAsyncThunk<Contact[], void>(
  "contacts/fetchContacts",
  async () => {
    const res = await CrossFetch("contacts", "GET", null);
    return res.data;
  }
);

export const archiveContacts = createAsyncThunk<Contact, Contact>(
  "contacts/archiveContact",
  async (contactObject: Contact) => {
    const copyObject = { ...contactObject };
    if (copyObject.archived === true) {
      copyObject.archived = false;
    } else {
      copyObject.archived = true;
    }
    const res = await CrossFetch(
      `contacts/${contactObject.id}`,
      "PATCH",
      JSON.stringify({ archived: copyObject.archived })
    );
    return res.data;
  }
);

export interface ContactsState {
  data: Contact[];
  status: string;
}

const initialState: ContactsState = {
  data: [],
  status: "idle",
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,

  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchContacts.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(fetchContacts.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.data = action.payload;
      })

      .addCase(archiveContacts.pending, (state) => {
        state.status = "pending";
      })
      .addCase(archiveContacts.fulfilled, (state, action) => {
        state.status = "fullfilled";
        for (let i = 0; i < state.data.length; i++) {
          if (state.data[i].id === action.payload.id) {
            if (state.data[i].archived === true) {
              state.data[i].archived = false;
            } else {
              state.data[i].archived = true;
            }
            return;
          }
        }
      });
  },
});

export const getContactsStatus = (state: RootState) => state.contacts.status;
export const getContactsData = (state: RootState) => state.contacts.data;

export default contactsSlice.reducer;
