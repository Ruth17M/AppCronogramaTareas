import { createContext, useState, useCallback, useMemo, useContext } from "react"

export const tareasContext = createContext()

export function ProveedorTareas({ children }) {

    const [tareas, setTareas] = useState([
        {
            id: 1,
            titulo: "Tarea de ejemplo",
            descripcion: "Descripción de la tarea de ejemplo",
            fecha: '2024-05-08',
            completada: true
        }
    ])

    const agregarTarea = useCallback((nuevaTarea) => {
        const tareaConId = {
            ...nuevaTarea,
            id: Date.now(),
            completada: false
        }
        setTareas(prev => [...prev, tareaConId])
    }, [])

    const editarTarea = useCallback((id, tareaActualizada) => {
         setTareas(prev => prev.map((tarea) =>
            tarea.id === id ? { ...tarea, ...tareaActualizada } : tarea
        ))
    }, [])

    const eliminarTarea = useCallback((id) => {
        setTareas(prev => prev.filter((tarea) => tarea.id !== id))
    }, [])

    const estadoTarea = useCallback((tareaOId) => {
        const id = typeof tareaOId === 'object' ? tareaOId.id : tareaOId
        setTareas(prev => prev.map((tarea) =>
            tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
        ))
    }, [])

    const contadorTareas = useMemo(() => {
        return {
            todas: tareas.length,
            completas: tareas.filter((tarea) => tarea.completada).length,
            pendientes: tareas.filter((tarea) => !tarea.completada).length
        }
    }, [tareas])

    return (
        <tareasContext.Provider value={{
            tareas,
            agregarTarea,
            editarTarea,
            eliminarTarea,
            estadoTarea,
            cambiarEstado: estadoTarea, 
            contadorTareas
        }}>
            {children}
        </tareasContext.Provider>
    )
}

export function useTareas() {
    return useContext(tareasContext)
}