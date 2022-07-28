import { createSlice } from '@reduxjs/toolkit';

export const dropdownSlice = createSlice({
  name: 'dropdown',
  initialState: {
    name: '',
  },
  reducers: {
    setDropdown: (state, action) => {
      state.name = action.payload;
    },
    toggleDropdown: (state, action) => {
      state.name = state.name === action.payload ? '' : action.payload;
    },
  },
});

export default dropdownSlice.reducer;
export const { setDropdown, toggleDropdown } = dropdownSlice.actions;
