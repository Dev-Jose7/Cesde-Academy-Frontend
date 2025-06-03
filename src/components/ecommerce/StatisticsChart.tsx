import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import ChartTab from "../common/ChartTab";
import { fetchAuth } from "../../utils/fetchAuth";

export type Usuario = {
  id: number;
  cedula: string;
  nombre: string;
  tipo: "ESTUDIANTE" | "DOCENTE" | "DIRECTIVO" | "ADMINISTRATIVO";
  estado: string;
  creado: string;
  actualizado: string
};

export default function StatisticsChart() {
  const [userData, setUserData] = useState<Usuario[]>([]);
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const usuarioLocal = localStorage.getItem("usuario");
    if (usuarioLocal) {
      try {
        const user = JSON.parse(usuarioLocal);
        setUsuario(user);
      } catch (err) {
        console.error("Error al parsear usuario desde localStorage:", err);
      }
    }
  }, []);

  useEffect(() => {
    const cargarListaUsuarios = async () => {
      try {
        const response = await fetchAuth("/api/usuario/lista", { method: "GET" });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error("Error al obtener actividades");
        }
      } catch (err) {
        console.error("Error inesperado:", err);
        (true);
      }
    };

    if (usuario?.tipo == "ADMINISTRATIVO") {
      cargarListaUsuarios();
    }

  }, []);

  // Función para agrupar por varios estados
  const countUsersByMonth = (estados: string[]) => {
    const monthlyCounts = Array(12).fill(0);

    userData.forEach((user) => {
      const estadoNormalizado = user.estado?.toUpperCase();
      if (user.creado && estados.includes(estadoNormalizado)) {
        const month = new Date(user.creado).getMonth();
        monthlyCounts[month]++;
      }
    });

    return monthlyCounts;
  };

  const activeUsers = countUsersByMonth(["ACTIVO", "GRADUADO"]);
  const inactiveUsers = countUsersByMonth(["INACTIVO", "SUSPENDIDO", "ELIMINADO"]);

  const series = [
    { name: "Usuarios Activos", data: activeUsers },
    { name: "Usuarios Inactivos", data: inactiveUsers },
  ];

  const options: ApexOptions = {
    legend: { show: false },
    colors: ["#ed2e91", "#ff7c5e"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "area",
      toolbar: { show: false },
    },
    stroke: { curve: "straight", width: [2, 2] },
    fill: {
      type: "gradient",
      gradient: { opacityFrom: 0.55, opacityTo: 0 },
    },
    markers: {
      size: 0,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: { size: 6 },
    },
    grid: {
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    dataLabels: { enabled: false },
    tooltip: {
      enabled: true,
      x: { format: "dd MMM yyyy" },
    },
    xaxis: {
      type: "category",
      categories: [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ],
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#ed2e91"],
        },
      },
      title: {
        text: "",
        style: { fontSize: "0px" },
      },
    },
  };

  if (!userData.length) {
    return (
      <div className="text-gray-500 text-sm p-4">
        Cargando datos o no hay usuarios disponibles.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Estadísticas de Usuarios
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Usuarios activos e inactivos por mes
          </p>
        </div>
        <div className="flex items-start w-full gap-3 sm:justify-end">
          <ChartTab />
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[1000px] xl:min-w-full">
          <Chart options={options} series={series} type="area" height={310} />
        </div>
      </div>
    </div>
  );
}
