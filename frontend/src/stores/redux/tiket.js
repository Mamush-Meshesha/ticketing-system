import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tikets: [],
  comment: [],
  isLoading: false,
  error: null,
};

export const tiketSlice = createSlice({
  name: "tiket",
  initialState,
  reducers: {
    tiketRequest: (state) => {
      state.isLoading = true;
    },
    tiketSuccess: (state, action) => {
      state.isLoading = false;
      state.tikets = action.payload;
    },
    tiketFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    tiketUpdateRequest: (state) => {
      state.isLoading = true;
    },
    tiketUpdateSuccess: (state, action) => {
      state.isLoading = false;
      state.tikets = action.payload;
    },
    tiketUpdateFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    tiketDeleteRequest: (state) => {
      state.isLoading = true;
    },
    tiketDeleteSuccess: (state, action) => {
      state.isLoading = false;
      state.tikets = state.tikets.filter(ticket => ticket._id !== action.payload);
    },
    tiketDeleteFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    getTicketRequest: (state) => {
      state.isLoading = true;
    },
    getTicketSuccess: (state, action) => {
      state.isLoading = false;
      state.tikets = action.payload;
    },
    getTicketFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    getTicketsDetailRequest: (state, action) => {
      state.isLoading = true;
    },
    getTicketsDetailSuccess: (state, action) => {
      state.isLoading = false;
      state.tikets = action.payload;
    },
    getTicketsDetailFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    createCommentRequest: (state) => {
        state.isLoading = true
    },
    createCommentSuccess: (state,action) => {
        state.isLoading = false
        if (!state.tikets.comments) {
            state.tikets.comments = []; 
          }
          state.tikets.comments.push(action.payload);
    },
    createCommnetFailure: (state,action) => {
        state.isLoading = false
        state.error = action.payload
    }

  },
});
export const {
  tiketRequest,
  tiketSuccess,
  tiketFailure,
  getTicketFailure,
  getTicketRequest,
  getTicketSuccess,
  tiketDeleteFailure,
  tiketDeleteRequest,
  tiketDeleteSuccess,
  tiketUpdateFailure,
  tiketUpdateRequest,
  tiketUpdateSuccess,
  getTicketsDetailFailure,
  getTicketsDetailRequest,
  getTicketsDetailSuccess,
  createCommentRequest,
  createCommentSuccess,
  createCommnetFailure
} = tiketSlice.actions;
export default tiketSlice.reducer;
