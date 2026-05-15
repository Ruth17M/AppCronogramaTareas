import {configureStore} from '@reduxjs/toolkit';
import TareaReducer from './slices/TareaSlice';

const store = configureStore({
    reducer: {
        tareas: TareaReducer
    }
})

export default store