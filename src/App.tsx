import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider, useUser, Usuario } from "./context/UserContext";

import { ScrollToTop } from "./components/common/ScrollToTop";
import AppLayout from "./layout/AppLayout";
import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";

import DashboardRoutes from "./DashboardRoutes";

function RequireAuth({ children }: { children: React.ReactElement }) {
  const { usuario, loading } = useUser();
  if (loading) return <div>Cargando sesión...</div>;
  if (!usuario) return <Navigate to="/signin" replace />;
  return children;
}

function RedirectBasedOnAuth() {
  const { usuario, loading } = useUser();
  if (loading) return <div>Cargando sesión...</div>;
  return usuario ? <Navigate to="/dashboard" replace /> : <Navigate to="/signin" replace />;
}

function SignInWrapper() {
  const { setUsuario } = useUser();

  // Aquí tipamos usuario con Usuario
  const handleLogin = (usuario: Usuario) => {
    setUsuario(usuario);
  };

  return <SignIn onLogin={handleLogin} />;
}

export default function App() {
  return (
    <UserProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<RedirectBasedOnAuth />} />
          <Route path="/signin" element={<SignInWrapper />} />

          <Route
            path="/dashboard/*"
            element={
              <RequireAuth>
                <AppLayout />
              </RequireAuth>
            }
          >
            <Route path="*" element={<DashboardRoutes />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}
