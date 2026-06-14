import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Función para cuando el Login sea exitoso
  const loginSuccess = () => {
    setIsAuthenticated(true);
  };

  // Función para cuando el Logout sea exitoso
  const logoutSuccess = () => {
    setIsAuthenticated(false);
  };

  // TODO: Acá el día de mañana podés meter un useEffect que haga un fetch al back 
  // para verificar si la cookie sigue activa apenas el usuario refresca la página.
  useEffect(() => {
    setIsLoading(false); // Por ahora asumimos que termina de cargar rápido
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, loginSuccess, logoutSuccess }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usarlo más fácil en los componentes
export const useAuth = () => useContext(AuthContext);