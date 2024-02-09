

import { createSlice } from "@reduxjs/toolkit";


  type State = {
    songError: string | null;
  };

const initialState: State = {
    songError: null
  };


const { reducer, actions } = createSlice({
  name: "error",
  initialState: initialState,
  reducers: {
    songErrorRequest(state, action){
        state.songError = action.payload.songError
    },
    clearError(state){
        state.songError = null
    } 
    
    
  },
});

export { actions as errorActions };
export { reducer as errorReducer };
