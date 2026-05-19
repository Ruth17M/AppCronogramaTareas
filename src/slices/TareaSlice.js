import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const API = "http://localhost:8000/tareas.php"

export const listarTareas = createAsyncThunk(
    'tareas/listar',
    async () => {
        const res = await fetch(API)
        if (!res.ok) throw new Error('Error al cargar tareas')
        return await res.json()
    }
)

export const crearTarea = createAsyncThunk(
    'tareas/crear',
    async (datosTarea) => {
        const res = await fetch(API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosTarea)
        })
        if (!res.ok) throw new Error('Error al crear tarea')
        return await res.json()
    }
)
 

export const editarTareaAsync = createAsyncThunk(
    'tareas/editar',
    async ({ id, datos }) => {
        const res = await fetch(API, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, ...datos })
        })
        if (!res.ok) throw new Error('Error al editar tarea')
        return await res.json()
    }
)
 
export const cambiarEstadoAsync = createAsyncThunk(
    'tareas/cambiarEstado',
    async (tarea) => {
        const res = await fetch(API, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: tarea.id, completada: !tarea.completada })
        })
        if (!res.ok) throw new Error('Error al cambiar estado')
        return await res.json()
    }
)
 
export const eliminarTareaAsync = createAsyncThunk(
    'tareas/eliminar',
    async (id) => {
        const res = await fetch(API, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
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
        error: null  
    },
    reducers: {}, 

    extraReducers: (builder) => {
 
        builder.addCase(listarTareas.pending, (state) => {
            state.cargando = true
            state.error = null
        })
        builder.addCase(listarTareas.fulfilled, (state, action) => {
            state.cargando = false
            state.tareas = action.payload
        })
        builder.addCase(listarTareas.rejected, (state, action) => {
            state.cargando = false
            state.error = action.error.message
        })
 
        builder.addCase(crearTarea.fulfilled, (state, action) => {
            state.tareas.push(action.payload)
        })
 
        builder.addCase(editarTareaAsync.fulfilled, (state, action) => {
            const tareaActualizada = action.payload
            const index = state.tareas.findIndex(t => t.id === tareaActualizada.id)
            if (index !== -1) {
                state.tareas[index] = tareaActualizada
            }
        })

        builder.addCase(cambiarEstadoAsync.fulfilled, (state, action) => {
            const tareaActualizada = action.payload
            const index = state.tareas.findIndex(t => t.id === tareaActualizada.id)
            if (index !== -1) {
                state.tareas[index] = tareaActualizada
            }
        })
 
        builder.addCase(eliminarTareaAsync.fulfilled, (state, action) => {
            state.tareas = state.tareas.filter(t => t.id !== action.payload)
        })
    }
})
 
export default TareaSlice.reducer