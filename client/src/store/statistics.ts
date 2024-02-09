import { createSlice } from "@reduxjs/toolkit";
import { statistics } from "../types/statistics";

type State = {
    items: statistics | null;
  };

const initialState: State = {
    items: null
  };

const { reducer, actions } = createSlice({
  name: "statistics",
  initialState: initialState,
  reducers: {
    getStatisticsRequest(state){
    },
    getStatisticsRequestSuccess(state, action){
        state.items = action.payload
    }
    
  },
});

export { actions as statisticsActions };
export { reducer as statisticsReducer };
