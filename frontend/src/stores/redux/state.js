import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSidebarCollapsed: true,
    isMobileMenuOpen: false
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
          
        setIsMobileMenuOpen: (state, action) => {
            state.isMobileMenuOpen = action.payload;
          },
    }
});

export const { toggleSidebar, setSidebarState,setIsMobileMenuOpen } = sidebarSlice.actions;
export default sidebarSlice.reducer;