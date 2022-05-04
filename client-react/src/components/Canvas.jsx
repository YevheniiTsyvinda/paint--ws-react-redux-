import React,{useRef,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { setCanvas } from '../store/reducers/canvasReducer';
import { setTool } from '../store/reducers/toolReducer';
import Brush from '../tools/Brush';

import '../styles/canvas.scss'

const Canvas = () => {
    const canvasRef = useRef();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setCanvas(canvasRef.current));
        dispatch(setTool(new Brush(canvasRef.current)))
    },[])

  return (
    <div className='canvas'>
        <canvas ref={canvasRef} width={700} height={450} />
    </div>
  )
}

export default Canvas