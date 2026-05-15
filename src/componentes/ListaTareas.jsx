import { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { eliminarTarea, cambiarEstado } from '../slices/TareaSlice'
import TareaItem from './tareaItem'
import styles from '../estilos/Styles.module.css'


function ListaTareas({busqueda, filtroEstado, filtroFecha, aleditarTarea}) {

    const dispatch = useDispatch()
    const tareas = useSelector(state => state.tareas.tareas)

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
                Completar={(tarea) => dispatch(cambiarEstado(tarea))}
                Editar={aleditarTarea}
                Eliminar={(id) => dispatch(eliminarTarea(id))}
                />
            ))}

        </div>
    )
}

export default ListaTareas