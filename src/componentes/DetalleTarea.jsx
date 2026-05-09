import {useState, useEffect, useRef } from 'react'
import {useTareas} from '../contexto/tareaContext'
import styles from '../estilos/Styles.module.css'


function fechaHoy(){
    return new Date().toISOString().split('T')[0]
}

function DetalleTarea({tareaAEditar, cerrarFormulario}) {

    const { agregarTarea, editarTarea } = useTareas()

    const ModoEdicion = tareaAEditar != null && tareaAEditar != undefined

    const [titulo, setTitulo] = useState(ModoEdicion ? tareaAEditar.titulo : '')
    const [descripcion, setDescripcion] = useState(ModoEdicion ? tareaAEditar.descripcion : '')
    const [fecha, setFecha] = useState(ModoEdicion ? tareaAEditar.fecha : fechaHoy())

    const refTitulo = useRef(null)


    useEffect(() => {
        refTitulo.current.focus()
    }, [])

    const alGuardar = () => {
        if(titulo.trim() === ''){
            alert('El título no puede estar vacío')
            return
        }

        if(ModoEdicion){
            editarTarea(tareaAEditar.id, {titulo, descripcion, fecha})
        }else {
            agregarTarea({titulo, descripcion, fecha})
        }
        cerrarFormulario()
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
                <button className={styles.botonGuardar} onClick={alGuardar}>
                    {ModoEdicion ? 'Guardar Cambios' : 'Agregar Tarea'}
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