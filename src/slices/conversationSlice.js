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
      throw thunkAPI.rejectWithValue({
        status: err?.response?.status,
        message: err?.response?.data?.message,
      });
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

export const removeConversation = createAsyncThunk(
  'conversation/removeConversation',
  async (id, thunkAPI) => {
    try {
      const { data } = await new ConversationService().removeConversation(id);
      await thunkAPI.dispatch(fetchConversations()).unwrap();
      return data;
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

export const removeMember = createAsyncThunk(
  'conversation/removeMember',
  async ({ conversationId, userId }, thunkAPI) => {
    try {
      console.log('removeMember', conversationId, userId);
      const { data } = await new ConversationService().removeMember(
        conversationId,
        userId
      );
      thunkAPI.dispatch(fetchConversation());
      return data;
    } catch (err) {
      throw thunkAPI.rejectWithValue(err?.response?.data);
    }
  }
);

export const updateConversation = createAsyncThunk(
  'conversation/updateConversation',
  async ({ conversationId, data }, thunkAPI) => {
    try {
      const { data: responseData } =
        await new ConversationService().updateConversation(
          conversationId,
          data
        );
      thunkAPI.dispatch(fetchConversation());
      thunkAPI.dispatch(fetchConversations());
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
    Creator: null,
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
      state.Creator = action.payload.Creator;
      state.newConversation = false;
    });

    builder.addCase(createConversation.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.slug = action.payload.slug;
      state.avatar = action.payload.avatar;
      state.Messages = action.payload.Messages;
      state.Users = action.payload.Users;
      state.Creator = action.payload.Creator;
      state.status = 'fulfilled';
      state.newConversation = false;
    });

    builder.addCase(addMember.fulfilled, (state, action) => {
      state.newMember = false;
    });

    builder.addCase(removeConversation.fulfilled, (state, action) => {
      state.id = '';
      state.name = '';
      state.slug = '';
      state.avatar = '';
      state.Messages = [];
      state.Users = [];
      state.Creator = null;
      state.status = 'fulfilled';
      state.newConversation = false;
      state.newMember = false;
    });
  },
});

export default conversationSlice.reducer;
export const { newConversation, newMember, messages } =
  conversationSlice.actions;
