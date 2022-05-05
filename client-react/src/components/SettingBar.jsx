import React from 'react'
import '../styles/toolbar.scss';
import {useDispatch} from 'react-redux';
import {setLineWidth, setStrokeColor} from '../store/reducers/toolReducer';

const SettingBar = () => {
    const dispatch = useDispatch();
  return (
    <div className='setting-bar'>
        <label htmlFor='line-width' style={{margin: '0 10px'}} >Line width</label>
        <input 
        style={{margin: '0 10px'}} 
        type="number" 
        id="line-width" 
        defaultValue={1} min={1} max={50}
        onChange={(e)=> dispatch(setLineWidth(e.target.value))}
        />
        <label htmlFor='stroke-color' style={{margin: '0 10px'}} >Border color</label>
        <input type="color" id="stroke-color" style={{margin: '0 10px'}} 
            onChange={e => dispatch(setStrokeColor(e.target.value))}
        />
    </div>
  )
}

export default SettingBar