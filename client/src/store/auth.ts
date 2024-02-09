import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../types/auth";
import { jwtDecode } from "jwt-decode";


const initialState: AuthState = {
    accessToken: localStorage.getItem('accessToken') || null,
    username: null,
    roles: [],
    registrationerror: null,
    loginerror: null,
  };


const { reducer, actions } = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginrequest(state, action){
    },

    loginsuccess(state, action){
      localStorage.setItem('accessToken', action.payload.accessToken)
      const decoded: {UserInfo: {username: string; roles: [string]}} = jwtDecode(action.payload.accessToken)
      const { username, roles } = decoded.UserInfo
      state.username = username
      state.roles = roles
      window.location.href = '/'
    },

    loginFailure(state, action){
      state.loginerror = action.payload.message
    },

    logoutrequest(state){
    },

    logoutSuccess(state){
      localStorage.removeItem('accessToken');
      state.username = null
      state.roles = []
      window.location.href = '/login'
    },

    registerrequest(state, action){
    },

    registersuccess(state){
      window.location.href = '/login'
    },

    registerfailure(state, action){
      state.registrationerror = action.payload.message
    },

    refreshrequest(state){
      
    },
    
    refreshsuccess(state, action){
      localStorage.setItem('accessToken', action.payload.accessToken)
      const decoded: {UserInfo: {username: string; roles: [string]}} = jwtDecode(action.payload.accessToken)
      const { username, roles } = decoded.UserInfo
      state.username = username
      state.roles = roles
    },

    setuser(state, action){
      const decoded: {UserInfo: {username: string; roles: [string]}} = jwtDecode(action.payload.accessToken)
      const { username, roles } = decoded.UserInfo
      state.username = username
      state.roles = roles
    }

    
    
  },
});

export { actions as authActions };
export { reducer as authReducer };
