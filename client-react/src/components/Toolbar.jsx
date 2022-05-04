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
import { setTool } from '../store/reducers/toolReducer';
import Brush from '../tools/Brush';
import Rect from '../tools/Rect';
import Circle from '../tools/Circle';
import Line from '../tools/Line';
import Eraser from '../tools/Eraser';

const Toolbar = () => {
    const canvas = useSelector(state => state.canvas.canvas);
    const dispatch = useDispatch();
  return (
    <div className='toolbar'>
        <BsFillBrushFill className='toolbar__btn'
            onClick={()=>{ dispatch(setTool(new Brush(canvas)))}}
        />
        <BiRectangle className='toolbar__btn'
            onClick={()=>{dispatch(setTool(new Rect(canvas)))}}
        />
        <BsCircle className='toolbar__btn'
            onClick={()=>{dispatch(setTool(new Circle(canvas)))}}
        />
        <BsEraserFill className='toolbar__btn'
            onClick={()=>{dispatch(setTool(new Eraser(canvas)))}}
        />
        <div className='toolbar__btn line'
            onClick={()=>{dispatch(setTool(new Line(canvas)))}}
        ></div>
        <input type="color" style={{marginLeft: 10}} />

        <BiUndo className='toolbar__btn' style={{marginLeft:'auto'}}/>
        <BiRedo className='toolbar__btn'/>
        <BiSave className='toolbar__btn'/>
    </div>
  )
}

export default Toolbar