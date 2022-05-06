import React, { useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { setCanvas, setToUndoList } from '../store/reducers/canvasReducer';
import { setSessionId, setSocket } from '../store/reducers/sessionReducer';
import { setTool } from '../store/reducers/toolReducer';
import axios from 'axios';
import Brush from '../tools/Brush';
import Rect from '../tools/Rect';
import Circle from '../tools/Circle';
import Line from '../tools/Line'

import '../styles/canvas.scss'
import LoginModal from './modals/LoginModal';

const Canvas = () => {
    const canvasRef = useRef();
    const sessionState = useSelector(state => state.session)
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(setCanvas(canvasRef.current));
        dispatch(setTool(new Brush(canvasRef.current)));
        axios.get('http://localhost:5000/image?id=' + params.id)
            .then(response => {
                const img = new Image()
                img.src = response.data
                img.onload = () => {
                    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
                    ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
                }
            })
    }, [])

    useEffect(() => {
        if (!sessionState.userName.length) return;

        const socket = new WebSocket(`ws://localhost:5000/`);
        dispatch(setSessionId(params.id));
        dispatch(setSocket(socket));
        dispatch(setTool(new Brush(canvasRef.current, socket, params.id)))
        socket.onopen = () => {
            console.log('connected');
            socket.send(JSON.stringify({
                id: params.id,
                username: sessionState.userName,
                method: 'connection'
            }))
        }
        socket.onmessage = (event) => {
            let msg = JSON.parse(event.data)
            switch (msg.method) {
                case "connection":
                    console.log(`User ${msg.username} connected`)
                    break
                case "draw":
                    drawHandler(msg)
                    break
            }
        }

    }, [sessionState.userName])

    const drawHandler = (msg) => {
        const figure = msg.figure
        const ctx = canvasRef.current.getContext('2d')
        switch (figure.type) {
            case "brush":
                Brush.draw(ctx, figure.x, figure.y)
                break
            case "rect":
                Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color)
                break
            case "circle":
                Circle.staticDraw(ctx, figure.x, figure.y, figure.radius, figure.color)
                break
            case 'line':
                Line.staticDraw(ctx, figure.x, figure.y, figure.cx, figure.cy, figure.color)
                break
            case "finish":
                ctx.beginPath()
                break
        }
    }


    const mouseDownHandler = () => {
        dispatch(setToUndoList(canvasRef.current.toDataURL()))
        axios.post(`http://localhost:5000/image?id=${params.id}`, { img: canvasRef.current.toDataURL() })
            .then(response => console.log(response.data))
    }


    return (
        <>
            <LoginModal />
            <div className='canvas'>
                <canvas onMouseDown={() => mouseDownHandler()} ref={canvasRef} width={700} height={450} />
            </div>
        </>

    )
}

export default Canvas