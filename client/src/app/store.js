import {configureStore} from '@reduxjs/toolkit';
import friendReducer from '../features/friendSlice';
import userReducer from '../features/userSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        friend: friendReducer
    }
});

export default store;