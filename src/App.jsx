import { useState } from 'react'
import { Provider } from 'react-redux'
import store from './Store'
import Login from './vistas/Login'
import Home from './vistas/Home'
//import './App.css'

function App() {
  const [usuarioActivo, setUsuarioActivo] = useState(null)

  const IniciarSesion = (nombreUsuario) => {
    setUsuarioActivo(nombreUsuario)
  }

  return (
    <Provider store={store}>
      {usuarioActivo
        ? <Home usuario={usuarioActivo} />
        : <Login IniciarSesion={IniciarSesion} />
      }
    </Provider>
  )
}

export default App

