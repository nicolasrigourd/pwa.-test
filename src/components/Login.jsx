// src/components/Login.jsx
import { useState } from 'react'

function Login({ onLogin, hasUser, canInstall, onInstallClick }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!username || !password) {
      setError('Completá usuario y contraseña.')
      return
    }

    const ok = onLogin(username.trim(), password.trim())

    if (!ok) {
      setError('Usuario o contraseña incorrectos.')
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">PWA Test</h1>
        <p className="auth-subtitle">
          {hasUser
            ? 'Ingresá tus datos para continuar'
            : 'Creemos tu usuario inicial'}
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ej: nico"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-button">
            {hasUser ? 'Ingresar' : 'Crear usuario y entrar'}
          </button>
        </form>

        {/* 👇 botón opcional para instalar la app */}
        {canInstall && (
          <button
            type="button"
            className="logout-button"
            style={{ marginTop: '1rem' }}
            onClick={onInstallClick}
          >
            Instalar app en este dispositivo
          </button>
        )}
      </div>
    </div>
  )
}

export default Login
