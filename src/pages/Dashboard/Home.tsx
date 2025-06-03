import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";
import { useUser } from "../../context/UserContext";
import "../../index.css";
import "./Home.css";  // IMPORTANTE: importar después para que tenga prioridad

export default function Home() {
  const { usuario } = useUser();

  if (!usuario) {
    return <div>Cargando usuario...</div>;
  }

  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | CesdeAcademic - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for CesdeAcademic - React.js Tailwind CSS Admin Dashboard Template"
      />

      <h1 className="text-2xl font-bold mb-4">Bienvenido, {usuario.nombre}</h1>

      {usuario.tipo === "DOCENTE" ? (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 space-y-6 xl:col-span-7">
            <EcommerceMetrics />
            <MonthlySalesChart />
          </div>

          <div className="col-span-12 xl:col-span-5">
            <MonthlyTarget />
          </div>

          <div className="col-span-12">
            <StatisticsChart />
          </div>

          <div className="col-span-12 xl:col-span-5">
            <DemographicCard />
          </div>

          <div className="col-span-12 xl:col-span-7">
            <RecentOrders />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 space-y-8 xl:col-span-12 home-page">
            {/* Título principal */}
            <div className="welcome-header mb-4">
              <i className="bi bi-mortarboard-fill"></i>
              <h2>¡Bienvenido al CESDE!</h2>
            </div>

            {/* Video grande */}
            <div className="video-wrapper">
              <div className="ratio ratio-16x9">
                <iframe
                  src="https://www.youtube.com/embed/Yj1PcEq5Oxo"
                  title="Bienvenida CESDE"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Botones separados */}
            <div className="button-group">
              <button className="btn-action">
                <i className="bi bi-list-check"></i>
                Conocer tus actividades
              </button>

              <button className="btn-action faltas">
                <i className="bi bi-exclamation-triangle"></i>
                Conocer tus faltas
              </button>
            </div>

            {/* Métricas básicas */}
            <div className="metrics">
              <EcommerceMetrics />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
