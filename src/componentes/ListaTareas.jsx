import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useGetTareasQuery } from '../slices/tareasApi'
import { tareasApi } from '../slices/tareasApi'
import { cambiarEstadoAsync, eliminarTareaAsync } from '../slices/TareaSlice'
import TareaItem from '../componentes/TareaItem'
import styles from '../estilos/Styles.module.css'

function ListaTareas({ busqueda, filtroEstado, filtroFecha, aleditarTarea }) {

    const dispatch = useDispatch()

    const {
        data: tareas = [],
        isLoading,
        isFetching,
        isError,
        error,
    } = useGetTareasQuery()

    const refrescarLista = () => {
        dispatch(tareasApi.util.invalidateTags(['Tarea']))
    }

    const handleCompletar = async (tarea) => {
        await dispatch(cambiarEstadoAsync(tarea))
        refrescarLista()
    }

    const handleEliminar = async (id) => {
        await dispatch(eliminarTareaAsync(id))
        refrescarLista()
    }

    const tareasFiltradas = useMemo(() => {
        let resultado = tareas

        if (filtroEstado === 'completas') {
            resultado = resultado.filter((tarea) => tarea.completada)
        } else if (filtroEstado === 'pendientes') {
            resultado = resultado.filter((tarea) => !tarea.completada)
        }

        if (busqueda.trim() !== '') {
            resultado = resultado.filter((tarea) =>
                tarea.titulo.toLowerCase().includes(busqueda.toLowerCase())
            )
        }

        if (filtroFecha !== '') {
            resultado = resultado.filter((tarea) => tarea.fecha === filtroFecha)
        }

        return resultado
    }, [tareas, filtroEstado, busqueda, filtroFecha])

    if (isLoading) return <p className={styles.sinTareas}>Cargando tareas...</p>

    if (isError) return (
        <p className={styles.sinTareas}>
            Error: {error?.error ?? 'El servidor PHP no esta corriendo en localhost:8000'}
        </p>
    )

    return (
        <div className={styles.listaContainer}>

            {isFetching && <p className={styles.sinTareas}>Actualizando...</p>}

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
                    Completar={handleCompletar}
                    Editar={aleditarTarea}
                    Eliminar={handleEliminar}
                />
            ))}

        </div>
    )
}

export default ListaTareas