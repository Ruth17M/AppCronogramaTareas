import { useState, useRef, useEffect } from 'react'
import styles from '../estilos/Styles.module.css'

function Login({IniciarSesion}) {

   
    const [usuario, setUsuario]   = useState('')
    const [password, setPassword] = useState('')
    const [error, setError]       = useState('')
 
    const usuarioRef = useRef(null)
 
    useEffect(() => {
        usuarioRef.current?.focus()
    }, [])
 
    const handleLogin = () => {
        if (usuario === 'admin' && password === 'admin') {
            IniciarSesion(usuario)
        } else {
            setError('Usuario o contraseña incorrectos')
        }
    }
 
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleLogin()
    }
 
    return (

        <div className={styles.loginPage}>
            <h1>El paso a la organización<br />comienza aquí</h1>
 
            <div className={styles.loginContainer}>
                <input
                    ref={usuarioRef}
                    className={styles.loginInput}
                    type="text"
                    placeholder="Usuario"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
 
                <input
                    className={styles.loginInput}
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
 
                {error && <p className={styles.error}>{error}</p>}
 
                <button className={styles.loginButton} onClick={handleLogin}>
                    Iniciar Sesión
                </button>
            </div>
        </div>
    )
}

export default Login