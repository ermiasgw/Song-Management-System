import { createSlice } from "@reduxjs/toolkit";
import { songwithuser } from "../types/song";

type State = {
    items: [songwithuser] | [];
  };

const initialState: State = {
    items: []
  };

const { reducer, actions } = createSlice({
  name: "song",
  initialState: initialState,
  reducers: {
    getSongRequest(state){
    },
    getSongRequestSuccess(state, action){
        state.items = action.payload
    },
    createSongRequest(state, action){
    },
    
    deleteSongRequest(state, action){
    },
    
  },
});

export { actions as songActions };
export { reducer as songReducer };
