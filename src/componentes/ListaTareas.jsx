import { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { listarTareas, eliminarTareaAsync, cambiarEstadoAsync } from '../slices/TareaSlice'
import TareaItem from '../componentes/TareaItem'
import styles from '../estilos/Styles.module.css'


function ListaTareas({busqueda, filtroEstado, filtroFecha, aleditarTarea}) {

    const dispatch = useDispatch()
    const tareas = useSelector(state => state.tareas.tareas)
    const cargando = useSelector(state => state.tareas.cargando)
    const error = useSelector(state => state.tareas.error)


    useEffect(() => {
        dispatch(listarTareas())
    }, [dispatch])

    const tareasFiltradas = useMemo(() => {

        let resultado = tareas

        if(filtroEstado === 'completas'){
            resultado = resultado.filter((tarea) => tarea.completada)
        } else if (filtroEstado === 'pendientes') {
            resultado = resultado.filter((tarea) => !tarea.completada)
        }

    if(busqueda.trim() !== ''){
        resultado = resultado.filter((tarea) => tarea.titulo.toLowerCase().includes(busqueda.toLowerCase()))
    }    

    if(filtroFecha !== ''){
        resultado = resultado.filter((tarea) => tarea.fecha === filtroFecha)
    }

    return resultado 
    
    }, [tareas, filtroEstado, busqueda, filtroFecha])

    if(error) return <p className={styles.sinTareas}>Error: {error}</p>

    return(
        <div className={styles.listaContainer}>

            <div className={styles.contador}>
                <span>
                    {tareasFiltradas.length === tareas.length
                     ? `${tareas.length} tarea${tareas.length !== 1 ? 's' : ''}`
                        : `${tareasFiltradas.length} de ${tareas.length} tareas`}
                </span>
            </div>

            {tareasFiltradas.length === 0 && (
                <p className={styles.sinTareas}>No hay tareas para mostrar</p>
            )}

            {tareasFiltradas.map((tarea) => (
                <TareaItem
                key={tarea.id}
                tarea={tarea}
                Completar={(tarea) => dispatch(cambiarEstadoAsync(tarea))}
                Editar={aleditarTarea}
                Eliminar={(id) => dispatch(eliminarTareaAsync(id))}
                />
            ))}

        </div>
    )
}

export default ListaTareas