import { configureStore } from '@reduxjs/toolkit'
import canvasReducer from './reducers/canvasReducer'
import toolReducer from './reducers/toolReducer'
import sessionReducer from './reducers/sessionReducer'

export default configureStore({
    reducer: {
        tool: toolReducer,
        canvas: canvasReducer,
        session: sessionReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})