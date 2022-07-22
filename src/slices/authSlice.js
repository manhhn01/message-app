import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserService } from '../services/UserService';

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (_, thunkAPI) => {
    try {
      const { data } = await new UserService().getUser();
      return data;
    } catch (err) {
      throw thunkAPI.rejectWithValue(err?.response?.data);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (payload, thunkAPI) => {
    try {
      const { data } = await new UserService().login(payload);
      return data;
    } catch (err) {
      throw thunkAPI.rejectWithValue(err?.response?.data);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (payload, thunkAPI) => {
    try {
      const { data } = await new UserService().register(payload);
      return data;
    } catch (err) {
      throw thunkAPI.rejectWithValue(err?.response?.data);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    status: 'idle',
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = 'fulfilled';
      state.isAuthenticated = true;
    });

    builder.addCase(fetchUser.rejected, (state, action) => {
      state.user = null;
      state.status = 'rejected';
      state.isAuthenticated = false;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.status = 'fulfilled';
    });

    builder.addCase(register.rejected, (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.status = 'fulfilled';
      state.isAuthenticated = true;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
    });
  },
});

export default authSlice.reducer;
