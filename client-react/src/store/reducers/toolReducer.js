import { createSlice } from "@reduxjs/toolkit";

export const  toolSlice = createSlice({
    name:'tool',
    initialState:{
        tool: null,
    },
    reducers:{
        setTool: (state,action)=>{
            state.tool = action.payload;
        }
    }
})

export const {setTool} = toolSlice.actions;
export default toolSlice.reducer;