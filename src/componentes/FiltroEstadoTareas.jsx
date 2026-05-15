import styles from '../estilos/Styles.module.css'


function FiltroEstadoTareas({ filtroActivo, alCambiar }) {

    

    const opciones = [
        { valor: 'todas', etiqueta: 'Todas' },
        { valor: 'completas', etiqueta: 'Completas' },
        { valor: 'pendientes', etiqueta: 'Pendientes' },
    ]
     return (

        <div className={styles.filtroEstado}>
            {opciones.map((opcion) => (
                <button
                    key={opcion.valor}
                    className={
                        filtroActivo === opcion.valor
                            ? `${styles.boton} ${styles.activo}`
                            : styles.boton
                    }
                    onClick={() => alCambiar(opcion.valor)}
                >
                    {opcion.etiqueta}
                </button>
            ))}
        </div>
    )

}

export default FiltroEstadoTareas