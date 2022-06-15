// create a user slice with initial values as username and profile and a logout reducer which sets the username and profile to null
// require creatSlice
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        username: null,
        profile: null
    },
    reducers: {
        changeUser: (state, action) => {
            state.username = action.payload.username;
            state.profile = action.payload.profile;
        }
    }
}
);
// export the reducer
export const { changeUser } = userSlice.actions;
export default userSlice.reducer;