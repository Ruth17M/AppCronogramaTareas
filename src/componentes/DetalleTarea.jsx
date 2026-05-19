import {useState, useEffect, useRef } from 'react'
import {useDispatch} from 'react-redux'
import { crearTarea, editarTareaAsync } from '../slices/TareaSlice'
import styles from '../estilos/Styles.module.css'


function fechaHoy(){
    return new Date().toISOString().split('T')[0]
}

function DetalleTarea({tareaAEditar, cerrarFormulario}) {

    const dispatch = useDispatch()

    const ModoEdicion = tareaAEditar != null && tareaAEditar != undefined

    const [titulo, setTitulo] = useState(ModoEdicion ? tareaAEditar.titulo : '')
    const [descripcion, setDescripcion] = useState(ModoEdicion ? tareaAEditar.descripcion : '')
    const [fecha, setFecha] = useState(ModoEdicion ? tareaAEditar.fecha : fechaHoy())
    const [guardando, setGuardando] = useState(false)

    const refTitulo = useRef(null)


    useEffect(() => {
        refTitulo.current.focus()
    }, [])

    const alGuardar = async () => {
        if(titulo.trim() === ''){
            alert('El título no puede estar vacío')
            return
        }
        setGuardando(true)

       
        try {
            if (ModoEdicion) {
                await dispatch(editarTareaAsync({
                    id: tareaAEditar.id,
                    datos: { titulo, descripcion, fecha }
                }))
            } else {
                await dispatch(crearTarea({ titulo, descripcion, fecha }))
            }
            cerrarFormulario()
        } catch (e) {
            alert('Hubo un error al guardar la tarea')
        } finally {
            setGuardando(false)
        }
    }


    return(
        <div className={styles.popupFondo} onClick={cerrarFormulario}>
           <div className={styles.popupContenido} onClick={(e) => e.stopPropagation()}>
           
            <h2>{ModoEdicion ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
           
            <input
            ref={refTitulo}
            className={styles.input}
            type='text'
            placeholder='Título'
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            />

            <textarea
            className={styles.input}
            placeholder='Descripción'
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            />

            <input
            className={styles.input}
            type='date'
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
             />
             
             <div className={styles.popupBotones}>
                <button className={styles.botonGuardar} onClick={alGuardar} disabled={guardando}>
                    {guardando ? 'Guardando...' : ModoEdicion ? 'Guardar Cambios' : 'Agregar Tarea'}
                </button>

                <button className={styles.botonCancelar} onClick={cerrarFormulario}>
                    Cancelar
                </button>
             </div>

            </div>
        
        </div>
    )

        
}

export default DetalleTarea