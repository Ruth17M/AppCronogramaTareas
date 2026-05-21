import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import TareaReducer from './slices/TareaSlice'
import { tareasApi } from './slices/tareasApi'

const store = configureStore({
    reducer: {
        tareas: TareaReducer,

        [tareasApi.reducerPath]: tareasApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(tareasApi.middleware),
})

setupListeners(store.dispatch)

export default store