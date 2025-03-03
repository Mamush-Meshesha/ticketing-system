import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userRequest: (state) => {
        state.isLoading = true;
        },
        userSuccess: (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
        },
        userFailure: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        },
    },
    });

export const {
    userRequest,
    userSuccess,
    userFailure,
} = userSlice.actions;
export default userSlice.reducer;