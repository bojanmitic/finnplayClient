import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { post, remove } from '../api';
import { Status } from '../utils/sliceStatus';
import type { RootState } from '../app/store';

interface IUser {
  userName: string;
}

interface ILogin {
  userName: string;
  password: string;
}

interface AuthState {
  user: IUser | null;
  status: Status;
  error: {
    isError: boolean;
    message: string | undefined;
  };
}

const initialState: AuthState = {
  user: null,
  status: Status.idle,
  error: {
    isError: false,
    message: ''
  }
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loginAction.pending, (state) => {
        state.status = Status.loading;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.status = Status.succeeded;
        state.user = action.payload as any;
        state.error.isError = false;
        state.error.message = '';
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.status = Status.failed;
        state.user = null;
        state.error.isError = true;
        state.error.message = action.payload as string;
      })
      .addCase(logoutAction.pending, (state) => {
        state.status = Status.loading;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.status = Status.succeeded;
        state.user = null;
        state.error.isError = false;
        state.error.message = '';
      })
      .addCase(logoutAction.rejected, (state, action) => {
        state.status = Status.failed;
        state.error.isError = true;
        state.error.message = action.payload as string;
      });
  }
});

export const loginAction = createAsyncThunk('authenticate/login', async (credentials: ILogin, { rejectWithValue }) => {
  try {
    const user = await post('login', credentials);
    return user;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const logoutAction = createAsyncThunk('authenticate/logout', async (_, { rejectWithValue }) => {
  try {
    const loggedOut = await remove('logout');
    return loggedOut;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const { setUser } = authSlice.actions;
export const userSelect = (state: RootState) => state.auth.user;

export default authSlice.reducer;
