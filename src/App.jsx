import { useState } from 'react'
import Login from './vistas/Login'
import Home from './vistas/Home'
import {ProveedorTareas} from './contexto/tareaContext'
//import './App.css'

function App() {
  const [usuarioActivo, setUsuarioActivo] = useState(null)

  const IniciarSesion = (nombreUsuario) => {
    setUsuarioActivo(nombreUsuario)
  }

  return (
    <ProveedorTareas>
      {usuarioActivo
        ? <Home usuario={usuarioActivo} />
        : <Login IniciarSesion={IniciarSesion} />
      }
    </ProveedorTareas>
  )
}

export default App
