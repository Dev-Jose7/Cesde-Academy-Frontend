import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider, useUser } from "../src/context/UserContext";
import { ReactElement } from "react";


import { ScrollToTop } from "./components/common/ScrollToTop";
import AppLayout from "./layout/AppLayout";
import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";
import Home from "./pages/Dashboard/Home";
import UserProfiles from "./pages/UserProfiles";
import Calendar from "./pages/Calendar";
import Blank from "./pages/Blank";
import FormElements from "./pages/Forms/FormElements";
import BasicTables from "./pages/Tables/BasicTables";
import Alerts from "./pages/UiElements/Alerts";
import Avatars from "./pages/UiElements/Avatars";
import Badges from "./pages/UiElements/Badges";
import Buttons from "./pages/UiElements/Buttons";
import Images from "./pages/UiElements/Images";
import Videos from "./pages/UiElements/Videos";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";

function RequireAuth({ children }: { children: ReactElement }) {
  const { usuario, loading } = useUser();
  if (loading) return <div>Cargando sesión...</div>;
  if (!usuario) return <Navigate to="/signin" replace />;
  return children;
}

function RedirectBasedOnAuth() {
  const { usuario, loading } = useUser();
  if (loading) return <div>Cargando sesión...</div>;

  return usuario
    ? <Navigate to="/dashboard" replace />
    : <Navigate to="/signin" replace />;
}

export default function App() {
  return (
    <UserProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<RedirectBasedOnAuth />} />
          <Route path="/signin" element={<SignInWrapper />} />

          {/* Rutas protegidas */}
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <AppLayout />
              </RequireAuth>
            }
          >
            <Route index element={<Home />} />
            <Route path="profile" element={<UserProfiles />} />
            <Route path="Clases" element={<Calendar />} />
            <Route path="blank" element={<Blank />} />
            <Route path="Actividades" element={<FormElements />} />
            <Route path="basic-tables" element={<BasicTables />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="avatars" element={<Avatars />} />
            <Route path="badge" element={<Badges />} />
            <Route path="buttons" element={<Buttons />} />
            <Route path="images" element={<Images />} />
            <Route path="videos" element={<Videos />} />
            <Route path="line-chart" element={<LineChart />} />
            <Route path="bar-chart" element={<BarChart />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

  function SignInWrapper() {
    const { setUsuario } = useUser();

    const handleLogin = (nombre: string) => {
      setUsuario(nombre);
    };

    return <SignIn onLogin={handleLogin} />;
  }
