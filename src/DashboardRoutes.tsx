import { Routes, Route } from "react-router-dom";
import { useUser } from "./context/UserContext";

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

      {usuario.tipo === "DOCENTE" ? (
        <>
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
        </>
      ) : (
        <>
          <Route path="line-chart" element={<LineChart />} />
          <Route path="bar-chart" element={<BarChart />} />
        </>
      )}
    </Routes>
  );
}
