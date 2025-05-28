import React, { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  usuario: string | null;
  setUsuario: (nombre: string | null) => void;
  loading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuario, setUsuarioState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuarioState(usuarioGuardado);
    }
    setLoading(false); 
  }, []);

  const setUsuario = (nombre: string | null) => {
    if (nombre) {
      localStorage.setItem("usuario", nombre);
    } else {
      localStorage.removeItem("usuario");
    }
    setUsuarioState(nombre);
  };

  return (
    <UserContext.Provider value={{ usuario, setUsuario, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe usarse dentro de un UserProvider");
  }
  return context;
}
