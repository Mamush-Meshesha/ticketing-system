import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tikets: [],
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
            state.tikets = action.payload;
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

    },
});
export const { tiketRequest, tiketSuccess, tiketFailure,getTicketFailure,getTicketRequest,getTicketSuccess,tiketDeleteFailure,tiketDeleteRequest,tiketDeleteSuccess,tiketUpdateFailure,tiketUpdateRequest,tiketUpdateSuccess } = tiketSlice.actions;
export default tiketSlice.reducer;