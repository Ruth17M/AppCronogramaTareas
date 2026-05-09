import { useState } from 'react'
import ListaTareas from '../componentes/ListaTareas'
import DetalleTarea from '../componentes/DetalleTarea'
import FiltroBusqueda from '../componentes/FiltroBusqueda'
import FiltroEstadoTareas from '../componentes/FiltroEstadoTareas'
import FiltroFecha from '../componentes/FiltroFecha'
import styles from '../estilos/Styles.module.css'


function Home ({usuario}) {

    const [mostrarFormulario, setMostrarFormulario] = useState(false)
    const [editarTarea, setEditarTarea] = useState(null)
    const [busqueda, setBusqueda] = useState('')
    const [filtroEstado, setFiltroEstado] = useState('todas')
    const [filtroFecha, setFiltroFecha] = useState('')
   
   const aleditarTarea = (tarea) => {
        setEditarTarea(tarea)
        setMostrarFormulario(true)
    }

    const cerrarFormulario = () => {
        setEditarTarea(null)
        setMostrarFormulario(false)
    }

    return(
        <div className={styles.homeContainer}>
        <h1 className={styles.titulo}>Hola, {usuario}!</h1>

    <button className={styles.botonNueva}
    onClick={() => setMostrarFormulario(true)}>
     Nueva Tarea
    </button>

    {mostrarFormulario && (
        <DetalleTarea
         key={editarTarea?.id ?? 'nueva'}
        tareaAEditar={editarTarea}
        cerrarFormulario={cerrarFormulario}/>
    )}

    <div className={styles.filtrosContainer}>
        <FiltroBusqueda busqueda={busqueda} alCambiar={setBusqueda}/>
        <FiltroEstadoTareas filtroActivo={filtroEstado} alCambiar={setFiltroEstado}/>
        <FiltroFecha fecha={filtroFecha} alCambiar={setFiltroFecha}/>
    </div>
    <ListaTareas
        busqueda={busqueda}
        filtroEstado={filtroEstado}
        filtroFecha={filtroFecha}
        aleditarTarea={aleditarTarea}
    />

    </div>
    )
}

export default Home