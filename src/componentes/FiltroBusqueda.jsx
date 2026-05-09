import styles from '../estilos/Styles.module.css'

function FiltroBusqueda({ busqueda, alCambiar }) {
   return (

        <div className={styles.filtroBusqueda}>
            <input
                className={styles.input}
                type="text"
                placeholder="Buscar tarea por nombre…"
                value={busqueda}
                onChange={(e) => alCambiar(e.target.value)}
            />
        </div>
    )
}

export default FiltroBusqueda