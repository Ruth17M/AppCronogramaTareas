import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const API = 'http://localhost:8000/tareas.php'


export const eliminarTareaAsync = createAsyncThunk(
    'tareas/eliminar',
    async (id) => {
        const res = await fetch(API, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        })
        if (!res.ok) throw new Error('Error al eliminar tarea')
        return id
    }
)

const TareaSlice = createSlice({
    name: 'tareas',
    initialState: {
        tareas: [],
        cargando: false,
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(eliminarTareaAsync.fulfilled, (state, action) => {
            state.tareas = state.tareas.filter(t => t.id !== action.payload)
        })
    },
})

export default TareaSlice.reducer