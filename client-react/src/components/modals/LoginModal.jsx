import React, { useRef, useState } from 'react'
import '../../styles/modal.scss'

import { useDispatch } from 'react-redux';
import { setUserName } from '../../store/reducers/sessionReducer';

const LoginModal = () => {

    const inputNameRef = useRef();
    const [modal, setModal] = useState(true);
    const dispatch = useDispatch();

    const connectionHandler = () => {
        dispatch(setUserName(inputNameRef.current.value))
        setModal(false);
    }

    return (
        <div id="myModal" className="modal" style={{ display: modal ? "block" : 'none' }}>
            <div className="modal-content">
                <div className='modal-header'>
                    <span onClick={()=>setModal(false)}>&times;</span>
                </div>
                <div className='modal-body'>
                    <input type="text" ref={inputNameRef} placeholder="Enter your name" />
                </div>
                <div className='modal-footer'>
                    <button onClick={()=>connectionHandler()}>LogIn</button>
                </div>
            </div>

        </div>
    )
}

export default LoginModal