import { memo } from 'react';
import styles from '../estilos/Styles.module.css'



const TareaItem = memo(
    function TareaItem({tarea,Completar, Editar, Eliminar}){

        return(
            <div className={styles.tareaCard}>
                <h2 className={styles.titulo}>{tarea.titulo}</h2>
                <p className={styles.descripcion}>{tarea.descripcion}</p>
                <p className={styles.fecha}>🗓️{tarea.fecha}</p>

            <p className={styles.estado}>
                {tarea.completada ? 'Completada' : 'Pendiente'}
            </p>

            <div className={styles.botones}>

                <button className={styles.boton}
                onClick={() => Completar(tarea)}>
                    {tarea.completada ? 'Pendiente' : 'Completar'}
                </button>

                <button className={styles.boton}
                onClick={() => Editar(tarea)}>
                    Editar
                </button>

                <button className={styles.botonEliminar}
                onClick={() => Eliminar(tarea.id)}>
                    Eliminar
                </button>


            </div>



            </div>
        )
    }
)


export default TareaItem;