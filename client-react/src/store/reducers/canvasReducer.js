import { createSlice } from "@reduxjs/toolkit";

export const  canvasSlice = createSlice({
    name:'canvas',
    initialState:{
        canvas: null,
    },
    reducers:{
        setCanvas: (state,action)=>{
            state.canvas = action.payload;
        }
    }
})

export const {setCanvas} = canvasSlice.actions;
export default canvasSlice.reducer;