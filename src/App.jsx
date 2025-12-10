// src/App.jsx
import { useEffect, useState } from 'react'
import Login from './components/Login'
import Home from './components/Home'

const STORAGE_KEY = 'pwaTestUser'

function App() {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Cargar usuario guardado al iniciar
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      setUser(parsed)
      setIsLoggedIn(!!parsed.loggedIn)
    }
  }, [])

  // Guardar en localStorage cada vez que cambie el usuario
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    }
  }, [user])

  const handleLogin = (username, password) => {
    // Si no hay usuario guardado, este es el "registro" inicial
    if (!user) {
      const newUser = { username, password, loggedIn: true }
      setUser(newUser)
      setIsLoggedIn(true)
      return true
    }

    // Si ya hay usuario, validamos
    if (username === user.username && password === user.password) {
      const updated = { ...user, loggedIn: true }
      setUser(updated)
      setIsLoggedIn(true)
      return true
    }

    // Credenciales incorrectas
    return false
  }

  const handleLogout = () => {
    if (!user) return
    const updated = { ...user, loggedIn: false }
    setUser(updated)
    setIsLoggedIn(false)
  }

  return (
    <div className="app-root">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} hasUser={!!user} />
      ) : (
        <Home username={user.username} onLogout={handleLogout} />
      )}
    </div>
  )
}

export default App
