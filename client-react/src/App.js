import React from "react";
import Canvas from "./components/Canvas";
import SettingBar from "./components/SettingBar";
import Toolbar from "./components/Toolbar";
import './styles/app.scss';
import { Routes, Route, Navigate } from 'react-router-dom'


function App() {
    return (
        <div className="App">
            <Routes>
                <Route path='/:id'
                    element={<>
                        <Toolbar />
                        <SettingBar />
                        <Canvas />
                    </>}
                />
                <Route path="*" 
                element={<Navigate to={`f${(+new Date).toString(16)}`}></Navigate>} />
            </Routes>
        </div>
    );
}

export default App;
