import { configureStore } from '@reduxjs/toolkit'
import canvasReducer from './reducers/canvasReducer'
import toolReducer from './reducers/toolReducer'

export default configureStore({
    reducer: {
        tool: toolReducer,
        canvas: canvasReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})