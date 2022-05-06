import { createSlice } from "@reduxjs/toolkit";

export const  sessionSlice = createSlice({
    name:'session',
    initialState:{
        userName:'',
        socket: null,
        sessionId:''
    },
    reducers:{
        setUserName: (state,action)=>{
            state.userName = action.payload;
        },
        setSocket:(state,action)=>{
            state.socket= action.payload;
        },
        setSessionId:(state,action)=>{
            state.sessionId= action.payload;
        },
    }
})

export const {
    setUserName,
    setSessionId,
    setSocket,
} = sessionSlice.actions;
export default sessionSlice.reducer;