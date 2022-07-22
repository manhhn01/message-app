import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ConversationService } from '../services/ConversationService';
import { fetchConversations } from './conversationsSlice';

export const fetchConversation = createAsyncThunk(
  'conversation/fetchConversation',
  async (id, thunkAPI) => {
    try {
      if (id) {
        const { data } = await new ConversationService().getConversation(id);
        return data;
      } else {
        const { data } = await new ConversationService().getConversation(
          thunkAPI.getState().conversation.id
        );
        return data;
      }
    } catch (err) {
      console.log(err);
      throw thunkAPI.rejectWithValue(err?.response?.data);
    }
  }
);

export const createConversation = createAsyncThunk(
  'conversation/createConversation',
  async (data, thunkAPI) => {
    try {
      const { data: responseData } =
        await new ConversationService().createConversation(data);
      await thunkAPI.dispatch(fetchConversations()).unwrap();
      return responseData;
    } catch (err) {
      throw thunkAPI.rejectWithValue(err?.response?.data);
    }
  }
);

export const addMember = createAsyncThunk(
  'conversation/addMember',
  async ({ conversationId, userId }, thunkAPI) => {
    try {
      const { data: responseData } = await new ConversationService().addMember(
        conversationId,
        userId
      );
      thunkAPI.dispatch(fetchConversation());
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
    slug: '',
    status: 'idle',
    name: '',
    avatar: '',
    Messages: [],
    Users: [],
    newConversation: false,
    newMember: false,
  },
  reducers: {
    newConversation: (state, action) => {
      state.newConversation = action.payload;
      state.newMember = false;
    },
    newMember: (state, action) => {
      state.newMember = action.payload;
      state.newConversation = false;
    },
    messages: (state, action) => {
      if (action.payload.conversationId === state.id)
        state.Messages.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchConversation.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.slug = action.payload.slug;
      state.avatar = action.payload.avatar;
      state.Messages = action.payload.Messages;
      state.Users = action.payload.Users;
      state.status = 'fulfilled';
      state.newConversation = false;
    });

    builder.addCase(createConversation.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.slug = action.payload.slug;
      state.avatar = action.payload.avatar;
      state.Messages = action.payload.Messages;
      state.Users = action.payload.Users;
      state.status = 'fulfilled';
      state.newConversation = false;
    });

    builder.addCase(addMember.fulfilled, (state, action) => {
      state.newMember = false;
    });
  },
});

export default conversationSlice.reducer;
export const { newConversation, newMember, messages } =
  conversationSlice.actions;
