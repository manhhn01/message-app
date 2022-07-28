import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ConversationService } from '../services/ConversationService';

export const fetchConversations = createAsyncThunk(
  'conversation/fetchConversations',
  async (_, thunkAPI) => {
    try {
      const { data } = await new ConversationService().getConversations();
      return data;
    } catch (err) {
      throw thunkAPI.rejectWithValue(err?.response?.data);
    }
  }
);

export const conversationsSlice = createSlice({
  name: 'conversations',
  initialState: {
    status: 'idle',
    conversations: [],
  },
  reducers: {
    conversationMessage(state, action) {
      state.conversations.find(
        (conversation) => conversation.id === action.payload.conversationId
      ).Messages[0] = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchConversations.fulfilled, (state, action) => {
      state.conversations = action.payload;
      state.status = 'fulfilled';
    });

    builder.addCase(fetchConversations.pending, (state, action) => {
      state.status = 'pending';
    });

    builder.addCase(fetchConversations.rejected, (state, action) => {
      state.status = 'rejected';
    });
  },
});

export default conversationsSlice.reducer;
export const { conversationMessage } = conversationsSlice.actions;
