// src/App.jsx
import { useEffect, useState } from 'react'
import Login from './components/Login'
import Home from './components/Home'

const STORAGE_KEY = 'pwaTestUser'

function App() {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // 👇 estado para la instalación PWA
  const [canInstall, setCanInstall] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)

  // Cargar usuario guardado
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      setUser(parsed)
      setIsLoggedIn(!!parsed.loggedIn)
    }
  }, [])

  // Guardar usuario
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    }
  }, [user])

  // Escuchar el evento beforeinstallprompt (PWA instalable)
  useEffect(() => {
    const handler = (e) => {
      // Evita que Chrome muestre el banner automático
      e.preventDefault()
      // Guardamos el evento para usarlo después
      setDeferredPrompt(e)
      setCanInstall(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleLogin = (username, password) => {
    if (!user) {
      const newUser = { username, password, loggedIn: true }
      setUser(newUser)
      setIsLoggedIn(true)
      return true
    }

    if (username === user.username && password === user.password) {
      const updated = { ...user, loggedIn: true }
      setUser(updated)
      setIsLoggedIn(true)
      return true
    }

    return false
  }

  const handleLogout = () => {
    if (!user) return
    const updated = { ...user, loggedIn: false }
    setUser(updated)
    setIsLoggedIn(false)
  }

  // 👇 función para el botón "Instalar app"
  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    // Opcional: podrías registrar si aceptó o canceló
    // console.log('User choice:', outcome)

    // Después de usarlo, lo limpiamos
    setDeferredPrompt(null)
    setCanInstall(false)
  }

  return (
    <div className="app-root">
      {!isLoggedIn ? (
        <Login
          onLogin={handleLogin}
          hasUser={!!user}
          // 👇 pasamos estas props al Login
          canInstall={canInstall}
          onInstallClick={handleInstallClick}
        />
      ) : (
        <Home username={user?.username} onLogout={handleLogout} />
      )}
    </div>
  )
}

export default App
