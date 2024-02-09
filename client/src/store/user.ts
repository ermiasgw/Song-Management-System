import { createSlice } from "@reduxjs/toolkit";
import { user, userwithrole } from "../types/user";

type State = {
    items: [userwithrole] | [];
  };

const initialState: State = {
    items: []
  };

const { reducer, actions } = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    getusersrequest(state){
    },
    getusersrequestSuccess(state, action){
        state.items = action.payload
    }
    
  },
});

export { actions as userActions };
export { reducer as userReducer };
