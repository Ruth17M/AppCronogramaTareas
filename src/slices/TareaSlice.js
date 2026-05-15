import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    tareas: [
        {
            id: 1, 
            titulo: "Tarea de ejemplo",
            descripcion: "Descripción de la tarea de ejemplo",
            fecha: '2024-05-08'
        }
    ]
}

const TareaSlice = createSlice({
    name: 'tareas',
    initialState,
        reducers:{

             agregarTarea: (state, action) => {
            const nuevaTarea = {
                ...action.payload,
                id: Date.now(),
                completada: false
            }
            state.tareas.push(nuevaTarea)
        },
 
        editarTarea: (state, action) => {
            const { id, datos } = action.payload
            const tarea = state.tareas.find(t => t.id === id)
            if (tarea) {
                tarea.titulo       = datos.titulo
                tarea.descripcion  = datos.descripcion
                tarea.fecha        = datos.fecha
            }
        },

            
        eliminarTarea: (state, action) => {
            state.tareas = state.tareas.filter(t => t.id !== action.payload)
        },
 
        cambiarEstado: (state, action) => {
            const tarea = state.tareas.find(t => t.id === action.payload.id)
            if (tarea) {
                tarea.completada = !tarea.completada
            }
        }
        
    }

})

export const {agregarTarea, editarTarea, eliminarTarea, cambiarEstado} = TareaSlice.actions
export default TareaSlice.reducer