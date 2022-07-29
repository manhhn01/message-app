import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    name: '',
    extraData: {},
  },
  reducers: {
    setModal: (state, action) => {
      if (action.payload.data) {
        state.name = action.payload.name;
        state.data = action.payload.data;
      } else state.name = action.payload;
    },
  },
});

export default modalSlice.reducer;
export const { setModal, toggleModal } = modalSlice.actions;
