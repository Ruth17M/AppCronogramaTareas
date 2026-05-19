import { useState, useRef, useEffect } from 'react'
import styles from '../estilos/Styles.module.css'

function Login({IniciarSesion}) {
   
    const [usuario, setUsuario]   = useState('')
    const [password, setPassword] = useState('')
    const [error, setError]       = useState('')
    const [cargando, setCargando] = useState(false)
 
    const usuarioRef = useRef(null)
 
    useEffect(() => {
        usuarioRef.current?.focus()
    }, [])
 
   const handleLogin = async () => {
        setError('')
        setCargando(true)
 
        try {
            const respuesta = await fetch('http://localhost:8000/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ usuario, password })
            })
 
            const datos = await respuesta.json()
 
            if (respuesta.ok) {
                IniciarSesion(datos.usuario)
            } else {
                setError(datos.error || 'Error al iniciar sesión')
            }
 
        } catch (e) {
            setError('No se pudo conectar con el servidor.')
        } finally {
            setCargando(false)
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
 
                <button
                    className={styles.loginButton}
                    onClick={handleLogin}
                    disabled={cargando}
                >
                    {cargando ? 'Verificando...' : 'Iniciar Sesión'}
                </button>
            </div>
        </div>
    )
}
export default Login