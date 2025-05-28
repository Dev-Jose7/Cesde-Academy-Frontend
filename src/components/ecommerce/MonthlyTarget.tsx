import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function MonthlyTarget() {
  const series = [75]; 
  const options: ApexOptions = {
    colors: ["#ec008c"], 
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "radialBar",
      height: 330,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -85,
        endAngle: 85,
        hollow: {
          size: "80%",
        },
        track: {
          background: "#E4E7EC",
          strokeWidth: "100%",
          margin: 5,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "36px",
            fontWeight: "600",
            offsetY: -40,
            color: "#1D2939",
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
    },
    fill: {
      type: "solid",
      colors: ["#ec008c"],
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Progreso"],
  };


  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Avance mensual académico
            </h3>
            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
              Porcentaje de cumplimiento del plan académico este mes
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="max-h-[330px]" id="chartDarkStyle">
            <Chart
              options={options}
              series={series}
              type="radialBar"
              height={330}
            />
          </div>

          <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-[95%] rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-600/20 dark:text-green-400">
            +10% respecto al mes anterior
          </span>
        </div>

        <p className="mx-auto mt-10 w-full max-w-[380px] text-center text-sm text-gray-500 sm:text-base">
          Los estudiantes han completado el 75% del plan académico este mes. ¡Buen trabajo!
        </p>
      </div>
    </div>
  );
}


