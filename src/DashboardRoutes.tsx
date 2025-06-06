import { Routes, Route } from "react-router-dom";
import { useUser } from "./context/UserContext";

// Componentes existentes
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

export default function DashboardRoutes() {
  const { usuario } = useUser();
  if (!usuario) return null;

  return (
    <Routes>
      <Route index element={<Home />} />

      {/* Ruta común para todos los tipos de usuario */}
      <Route path="profile" element={<UserProfiles />} />


      {/* Estudiante */}
      {usuario.tipo === "ESTUDIANTE" && (
        <>
          <Route path="calificaciones" element={<BasicTables />} />
          <Route path="asistencias" element={<Alerts />} />
          <Route path="modulos" element={<Videos />} />
          <Route path="horarios" element={<Calendar />} />
          <Route path="anuncios" element={<Avatars />} />
        </>
      )}

      {/* Docente */}
      {usuario.tipo === "DOCENTE" && (
        <>
          <Route path="clases" element={<Calendar />} />
          <Route path="actividades" element={<FormElements />} />
          <Route path="calificaciones" element={<BasicTables />} />
          <Route path="anuncios" element={<Avatars />} />
          <Route path="reportes" element={<LineChart />} />
        </>
      )}

      {/* Administrativo */}
      {usuario.tipo === "ADMINISTRATIVO" && (
        <>
          <Route path="usuarios" element={<UserProfiles />} />
          <Route path="grupos" element={<BasicTables />} />
          <Route path="horario" element={<Calendar />} />
          <Route path="clase" element={<FormElements />} />
          <Route path="anuncios" element={<Avatars />} />
          <Route path="reportes" element={<BarChart />} />
        </>
      )}

      {/* Directivo */}
      {usuario.tipo === "DIRECTIVO" && (
        <>
          <Route path="escuelas" element={<FormElements />} />
          <Route path="programas" element={<BasicTables />} />
          <Route path="modulos" element={<Images />} />
          <Route path="estadisticas" element={<LineChart />} />
          <Route path="anuncios" element={<Avatars />} />
          <Route path="reportes" element={<BarChart />} />
        </>
      )}
    </Routes>
  );
}
