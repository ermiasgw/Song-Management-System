import { createSlice } from "@reduxjs/toolkit";

import { albumwithid } from "../types/album";

  type State = {
    items: [albumwithid] | [];
  };

const initialState: State = {
    items: []
  };


const { reducer, actions } = createSlice({
  name: "album",
  initialState: initialState,
  reducers: {
    createAlbumrequest(state, action){
    }, 
    createAlbumsuccess(state){
        window.location.href = '/'
    },
    getAlbumsRequest(state){
    },
    getAlbumrRequestSuccess(state, action){
        state.items = action.payload
    }
    
  },
});

export { actions as albumActions };
export { reducer as albumReducer };
