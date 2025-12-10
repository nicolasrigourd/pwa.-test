// src/components/Home.jsx
function Home({ username, onLogout }) {
  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">Hola {username || 'Nico'} 👋</h1>
        <p className="home-text">
          Esta es la pantalla Home de prueba de tu futura PWA.
        </p>

        <button className="logout-button" onClick={onLogout}>
          Cerrar sesión
        </button>

        <p className="home-hint">
          Probá recargar la página: si ya iniciaste sesión, se mantiene gracias al localStorage.
        </p>
      </div>
    </div>
  )
}

export default Home
