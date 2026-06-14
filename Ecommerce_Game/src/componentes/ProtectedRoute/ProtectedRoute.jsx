import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ isAuthenticated, isLoading }) {
  // Mientras el backend nos confirma si la cookie es válida o no, mostramos un cargando
  if (isLoading) {
    return (
      <div style={{ color: "white", backgroundColor: "#1a1a1a", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <h2>Cargando seguridad...</h2>
      </div>
    );
  }

  // Si terminó de cargar y no está autenticado, lo manda al login de una
  // El "replace" es el truco mágico para que el botón "Atrás" del navegador no vuelva a la página privada
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Si está todo en orden, renderiza la página a la que quería entrar (/games)
  return <Outlet />;
}

export default ProtectedRoute;