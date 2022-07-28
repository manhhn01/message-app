import { createSlice } from '@reduxjs/toolkit';

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    right: false,
  },
  reducers: {
    toggleRightSidebar: (state) => {
      state.right = !state.right;
    },
  },
});

export default sidebarSlice.reducer;
export const { toggleRightSidebar } = sidebarSlice.actions;
