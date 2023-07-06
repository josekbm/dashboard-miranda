import { createAsyncThunk , createSlice } from '@reduxjs/toolkit'
import contacts from '../Data/contactData.json'

function delay(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 200);
    });
}


export const fetchContacts = createAsyncThunk("contacts/fetchContacts", async() => {
    const contactsDelay = await delay(contacts);
    return contactsDelay;
});

export const fetchContact = createAsyncThunk("contacts/fetchContact", async() => {
    const contactDelay = await delay(
        contacts.find((contact) => contact["Contact Id"] === contact.message_id)
    );
    return contactDelay;
});

export const archiveContact = createAsyncThunk("contacts/archiveContact", async(message_id) => {
    const contactDelay = await delay(contacts.message_id);
    return contactDelay;
})
export const selectContacts = (state) => state.contacts.contacts;
export const selectContact = (state) => state.contacts.contact;

const contactSlice = createSlice({
    name: "contactsList",
    initialState: {
        contacts: [],
        contact: null,
        isLoading: false,
        hasError: false,
    },
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(fetchContacts.pending, (state) => {
            state.isLaoding = true;
            state.hasError = false;
        })
        .addCase(fetchContacts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.contacts = action.payload;
        })
        .addCase(fetchContacts.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
        })
        .addCase(fetchContact.pending, (state) => {
            state.isLaoding = true;
            state.hasError = false;
            state.contact = null;
        })
        .addCase(fetchContact.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.contact = action.payload;
            console.log(action.payload)
        })
        .addCase(fetchContact.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
            state.contact = null;
        })        
        .addCase(archiveContact.pending, (state) => {
            state.isLaoding = true;
            state.hasError = false;
        })
        .addCase(archiveContact.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.contacts = state.contacts.filter(
                (contact) => contact["message_id"] !== action.payload
            );
        })
        .addCase(archiveContact.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
        });

    }
})

export default contactSlice.reducer;

