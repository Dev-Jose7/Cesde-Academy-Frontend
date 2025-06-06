import React from "react";
import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";

export default function VistaDocente() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 xl:col-span-7 space-y-6">
        <EcommerceMetrics />
        <MonthlySalesChart />
      </div>
      <div className="col-span-12 xl:col-span-5">
        <p className="text-lg">Panel exclusivo para docentes</p>
        {/* Agrega aquí más widgets o componentes */}
      </div>
    </div>
  );
}