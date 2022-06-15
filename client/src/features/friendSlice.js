import { createSlice } from "@reduxjs/toolkit";

export const friendSlice = createSlice({
    name: "friend",
    initialState: {
        username: '',
        chatId: '',
        profile: null
    },
    reducers: {
        changeFriend: (state, action) => {
            state.username = action.payload.username;
            state.chatId = action.payload.chatId;
            state.profile = action.payload.profile;
        }
    }
});

export const { changeFriend } = friendSlice.actions;
export default friendSlice.reducer;