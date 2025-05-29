import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Usuario = {
  cedula: string;
  contrasena: string;
  nombre: string;
  tipo: "ESTUDIANTE" | "DOCENTE";
};

type UserContextType = {
  usuario: Usuario | null;
  setUsuario: React.Dispatch<React.SetStateAction<Usuario | null>>;
  loading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Leer usuario desde localStorage y parsear con try/catch para evitar errores
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as Usuario;
        setUsuario(parsedUser);
      } catch (error) {
        console.error("Error al parsear el usuario de localStorage:", error);
        localStorage.removeItem("usuario"); // limpia localStorage si está corrupto
        setUsuario(null);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // Guardar usuario en localStorage o limpiar si es null
    if (usuario) {
      localStorage.setItem("usuario", JSON.stringify(usuario));
    } else {
      localStorage.removeItem("usuario");
    }
  }, [usuario]);

  return (
    <UserContext.Provider value={{ usuario, setUsuario, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe usarse dentro de un UserProvider");
  }
  return context;
}

