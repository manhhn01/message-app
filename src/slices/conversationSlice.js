import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ConversationService } from '../services/ConversationService';

export const getConversation = createAsyncThunk(
  'conversation/get',
  async (id, thunkAPI) => {
    try {
      const { data } = await new ConversationService().get(
        `conversation/${id}`
      );
      return data;
    } catch (err) {
      throw thunkAPI.rejectWithValue(err?.response?.data);
    }
  }
);

export const createConversation = createAsyncThunk(
  'conversation/create',
  async (data, thunkAPI) => {
    try {
      const { data: responseData } = await new ConversationService().create(
        data
      );
      return responseData;
    } catch (err) {
      throw thunkAPI.rejectWithValue(err?.response?.data);
    }
  }
);

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState: {
    id: '',
    name: '',
    avatar: '',
    messages: [],
    newConversation: false,
  },
  reducers: {
    newConversation: (state, action) => {
      state.newConversation = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getConversation.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.avatar = action.payload.avatar;
      state.messages = action.payload.messages;
      state.createNew = false;
    });

    builder.addCase(createConversation.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.avatar = action.payload.avatar;
      state.messages = action.payload.messages;
      state.createNew = false;
    });
  },
});

export default conversationSlice.reducer;
export const { newConversation } = conversationSlice.actions;
