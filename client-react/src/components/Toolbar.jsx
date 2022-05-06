import React from 'react'
import '../styles/toolbar.scss';
import {
    BsFillBrushFill,
    BsCircle,
    BsEraserFill,
} from 'react-icons/bs'
import {
    BiRectangle,
    BiUndo,
    BiRedo,
    BiSave,
} from 'react-icons/bi'

import { useSelector, useDispatch } from 'react-redux';
import { setTool, setStrokeColor, setFillColor } from '../store/reducers/toolReducer';
import {undo,redo} from '../store/reducers/canvasReducer'
import Brush from '../tools/Brush';
import Rect from '../tools/Rect';
import Circle from '../tools/Circle';
import Line from '../tools/Line';
import Eraser from '../tools/Eraser';

const Toolbar = () => {
    const canvas = useSelector(state => state.canvas.canvas);
    const sessionState = useSelector(state => state.session);
    const dispatch = useDispatch();

    const changeColor = e =>{
        dispatch(setFillColor(e.target.value));
        dispatch(setStrokeColor(e.target.value));
    }
    const download = () => {
        const dataUrl = canvasState.canvas.toDataURL()
        console.log(dataUrl)
        const a = document.createElement('a')
        a.href = dataUrl
        a.download = canvasState.sessionid + ".jpg"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }
  return (
    <div className='toolbar'>
        <BsFillBrushFill className='toolbar__btn'
            onClick={()=>{ dispatch(setTool(new Brush(canvas,sessionState.socket,sessionState.id)))}}
        />
        <BiRectangle className='toolbar__btn'
            onClick={()=>{dispatch(setTool(new Rect(canvas,sessionState.socket,sessionState.id)))}}
        />
        <BsCircle className='toolbar__btn'
            onClick={()=>{dispatch(setTool(new Circle(canvas,sessionState.socket,sessionState.id)))}}
        />
        <BsEraserFill className='toolbar__btn'
            onClick={()=>{dispatch(setTool(new Eraser(canvas,sessionState.socket,sessionState.id)))}}
        />
        <div className='toolbar__btn line'
            onClick={()=>{dispatch(setTool(new Line(canvas,sessionState.socket,sessionState.id)))}}
        ></div>
        <input type="color"
            onChange={(e)=> changeColor(e)}
        style={{marginLeft: 10}} />

        <BiUndo
            onClick={e => dispatch(undo())}
        className='toolbar__btn' style={{marginLeft:'auto'}}/>
        <BiRedo
            onClick={e => dispatch(redo())}
        className='toolbar__btn'/>
        <BiSave className='toolbar__btn' onClick={()=>download()}/>
    </div>
  )
}

export default Toolbar