import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  admin: {},
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

    getUserForComment: (state) => {
      state.isLoading = true;
    },
    getUsersForCommentSuccess: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    },
    getUserForCommentFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateUserRequest: (state) => {
      state.isLoading = true;
    },
    updateUserSuccess: (state, action) => {
      state.isLoading = false;
      state.users = state.users.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );
    },
    updateUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateAdminRequest: (state) => {
      state.isLoading = true;
    },
    updateAdminSuccess: (state, action) => {
      if (state.admin._id === action.payload._id) {
        state.admin = action.payload;
      }
    },
    updateAdminFailure: (state, action) => {
      state.error = action.payload;
    },
    deleteUserRequest: (state) => {
      state.isLoading = true;
    },
    deleteUserSuccess: (state, action) => {
      state.users = action.payload;
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  userRequest,
  userSuccess,
  userFailure,
  getUserForComment,
  getUserForCommentFailure,
  getUsersForCommentSuccess,
  updateUserFailure,
  updateUserRequest,
  updateUserSuccess,
  updateAdminFailure,
  updateAdminRequest,
  updateAdminSuccess,
  deleteUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
} = userSlice.actions;
export default userSlice.reducer;
