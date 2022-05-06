import { createSlice } from "@reduxjs/toolkit";

export const  canvasSlice = createSlice({
    name:'canvas',
    initialState:{
        canvas: null,
        undoList: [],
        redoList:[],
    },
    reducers:{
        setCanvas: (state,action)=>{
            state.canvas = action.payload;
        },
        setToUndoList: (state,action)=>{
            state.undoList.push(action.payload);
        },
        setToRedoList: (state,action)=>{
            state.redoList.push(action.payload);
        },
        undo:(state)=>{
            let ctx = state.canvas.getContext('2d');
            if(state.undoList.length){
                let dataUrl = state.undoList.pop();
                state.redoList.push(state.canvas.toDataURL());
                let img = new Image();
                img.src = dataUrl;
                img.onload = () => {
                    ctx.clearRect(0,0, state.canvas.width, state.canvas.height)
                    ctx.drawImage(img, 0, 0, state.canvas.width, state.canvas.height)
                }
            }else{
                ctx.clearRect(0,0,state.canvas.width,state.canvas.height);
            } 
        },
        redo: (state)=>{
            let ctx = state.canvas.getContext('2d');
            if(state.redoList.length){
                let dataUrl = state.redoList.pop();
                state.undoList.push(state.canvas.toDataURL());
                let img = new Image();
                img.src = dataUrl;
                img.onload = ()=>{
                    ctx.clearRect(0,0,state.canvas.width,state.canvas.height);
                    ctx.drawImage(img,0,0, state.canvas.width,state.canvas.height)
                }
            }else{
                ctx.clearRect(0,0,state.canvas.width,state.canvas.height);
            } 
        }
    }
})

export const {
    setCanvas,
    setToRedoList,
    setToUndoList,
    undo,
    redo,
} = canvasSlice.actions;
export default canvasSlice.reducer;