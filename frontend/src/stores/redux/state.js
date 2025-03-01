import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSidebarCollapsed: false,
}

export const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isSidebarCollapsed = !state.isSidebarCollapsed;
        },
        setSidebarState: (state, action) => {
            state.isSidebarCollapsed = action.payload;
          },
    }
});

export const { toggleSidebar, setSidebarState } = sidebarSlice.actions;
export default sidebarSlice.reducer;