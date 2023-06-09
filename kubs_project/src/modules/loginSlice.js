import { createSlice } from '@reduxjs/toolkit';
import login from '../thunk/login';
import logout from '../thunk/logout';
import findPW from '../thunk/findPW';
import changePW from '../thunk/changePW';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLoginned: false,
    isLoginning: false,
    LoginUser: null,
    LoginRejectReason: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoginned = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoginned = true;
        state.isLoginning = true;
        state.LoginUser = action.payload.config.data;
        state.LoginRejectReason = '';
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoginning = false;
        state.LoginRejectReason = action.error;
      });
  },
});

const logoutSlice = createSlice({
  name: 'logout',
  initialState: {
    isLogoutted: false,
    isLogoutting: false,
    LogoutRejectReason: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout.pending, (state) => {
        state.isLogoutted = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLogoutted = true;
        state.isLogoutting = true;
        state.LogoutRejectReason = '';
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLogoutting = false;
        state.LogoutRejectReason = action.error;
      });
  },
});

const findPWSlice = createSlice({
  name: 'findPW',
  initialState: {
    isPWFinded: false,
    isPWFinding: false,
    FindPWInfo: null,
    FindPWRejectReason: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(findPW.pending, (state) => {
        state.isPWFinded = true;
      })
      .addCase(findPW.fulfilled, (state, action) => {
        state.isPWFinded = true;
        state.isPWFinding = true;
        state.FindPWInfo = action.payload.config.data;
        state.FindPWRejectReason = '';
      })
      .addCase(findPW.rejected, (state, action) => {
        state.isPWFinding = false;
        state.FindPWRejectReason = action.error;
      });
  },
});

const changePWSlice = createSlice({
  name: 'changePW',
  initialState: {
    isPWChanged: false,
    isPWChanging: false,
    ChangePWInfo: null,
    ChangePWRejectReason: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changePW.pending, (state) => {
        state.isPWChanged = true;
      })
      .addCase(changePW.fulfilled, (state, action) => {
        state.isPWChanged = true;
        state.isPWChanging = true;
        state.ChangePWInfo = action.payload.config.data;
        state.ChangePWRejectReason = '';
      })
      .addCase(changePW.rejected, (state, action) => {
        state.isPWChanging = false;
        state.ChangePWRejectReason = action.error;
      });
  },
});

export { loginSlice, logoutSlice, findPWSlice, changePWSlice };
