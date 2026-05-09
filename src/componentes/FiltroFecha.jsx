import styles from '../estilos/Styles.module.css'


function FiltroFecha({fecha, alCambiar}) {


    return(
        <div className={styles.filtroFecha}>
            <label className={styles.etiqueta}>
                Filtrar por fecha:
            </label>
 
            <input
                className={styles.input}
                type="date"
                value={fecha}
                onChange={(e) => alCambiar(e.target.value)}
            />
 
            {fecha !== '' && (
                <button
                    className={styles.botonLimpiar}
                    onClick={() => alCambiar('')}
                >
                    Limpiar fecha
                </button>
            )}
        </div>
    )
}


export default FiltroFecha