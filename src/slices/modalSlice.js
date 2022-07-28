import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    name: '',
  },
  reducers: {
    setModal: (state, action) => {
      state.name = action.payload;
    },
    toggleModal: (state, action) => {
      state.name = state.name === action.payload ? '' : action.payload;
    },
  },
});

export default modalSlice.reducer;
export const { setModal, toggleModal } = modalSlice.actions;
